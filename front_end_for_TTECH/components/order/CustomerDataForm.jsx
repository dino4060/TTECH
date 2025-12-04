"use client"
import { paymentApiRt } from "@/app/api/payment/momo/payment.api-route"
import { UserAuth } from "@/context/AuthContext"
import { orderApi } from "@/lib/api/order.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { isValidPhoneNumber } from "@/utils/until"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import CircleLoader from "../uncategory/CircleLoader"
import AddressDataForm, {
	FormFieldList,
} from "./AddressDataForm"

const CustomerDataForm = ({
	cart,
	setCart,
	setCustomerAddr,
	totalPrice,
	totalDiscount,
	totalPayment,
	shippingFee,
}) => {
	const { user } = UserAuth()
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState({
		customerName: user?.name,
		customerPhone: user?.phone,
		paymentType: "COD",
		note: "",
		provinceId: user?.provinceId,
		wardId: user?.wardId,
		street: user?.street,
	})
	const [error, setError] = useState({
		customerName: "",
		customerPhone: "",
		paymentType: "",
		provinceId: "",
		wardId: "",
		street: "",
	})

	const onChangeValue = (e, f) => {
		const value = e.target.value
		if (f.key === "provinceId") {
			data.wardId = ""
			data.street = ""
		}
		if (f.key === "wardId") {
			data.street = ""
		}

		let feedback = ""
		if (f.required && !value.trim()) {
			feedback = f.placeholder
		} else if (f.validate && !f.validate.test(value)) {
			feedback = f.validate.feedback
		}

		setError((pre) => ({
			...pre,
			[f.key]: feedback,
		}))

		setData((pre) => ({
			...pre,
			[f.key]: value,
		}))
	}

	const onSubmitOrder = async () => {
		if (!cart.lines.length) return

		let isValid = true
		const FF = [...Fields, ...FormFieldList]
		FF.forEach((f) => {
			if (f.required && !data[f.key]) {
				isValid = false
				error[f.key] = f.placeholder
				setError({ ...error })
			}
		})
		if (!isValid) return

		setLoading(true)
		const res = await clientFetch(
			orderApi.checkout({
				...data,
				allPrice: totalPrice,
				allDiscount: totalDiscount,
				shippingFee: shippingFee,
				total: totalPayment,
			})
		)

		if (res.success) {
			setCart({ ...cart, lines: [] })

			const order = res.data
			if (order.paymentType === "COD") {
				setLoading(false)
				router.push("/checkout/success")
			}
			if (order.paymentType === "BANK") {
				const momoRes =
					await paymentApiRt.momoApiRt.createPayUrl({
						amount: order.total,
						orderId: order.id,
						returnUrl: "http://localhost:3000/checkout/success",
					})

				setLoading(false)
				if (momoRes.resultCode === 0) {
					router.push(momoRes.payUrl)
				} else {
					console.error("MoMo Client Error:", momoRes)
					alert("Có lỗi xảy ra: " + momoRes.message)
				}
			}
		} else {
			setLoading(false)
			alert("Thanh toán thất bại: " + res.error)
		}
	}

	// change formData => set customerAddr
	useEffect(() => {
		const {
			customerName: userName,
			customerPhone: phone,
			provinceId,
			wardId,
			street,
		} = data
		if (userName && phone && provinceId && wardId && street)
			setCustomerAddr({
				userName,
				phone,
				provinceId,
				wardId,
				street,
			})
	}, [data])

	return (
		<div className='w-full'>
			<h1 className='text-center text-4xl font-[700] mt-8'>
				Thông tin khách hàng
			</h1>

			<form
				onSubmit={(e) => e.preventDefault()}
				className='flex flex-col gap-5 mt-4'
			>
				{Fields.map((field) => {
					const ReactComponent = Input[field.tag]
					return (
						<ReactComponent
							field={field}
							data={data}
							error={error}
							onChangeValue={onChangeValue}
						/>
					)
				})}

				<AddressDataForm
					formData={data}
					formError={error}
					onChangeValue={onChangeValue}
				/>

				<button
					onClick={onSubmitOrder}
					className='
            w-full mt-4 bg-blue-500 rounded-full text-white py-3 text-2xl  font-bold
            flex items-center justify-center'
				>
					{loading ? <CircleLoader /> : "Hoàn tất"}
				</button>
			</form>
		</div>
	)
}

export default CustomerDataForm

const Fields = [
	{
		key: "customerName",
		name: "Tên khách hàng",
		required: true,
		tag: "text",
		placeholder: "Vui lòng nhập tên khách hàng",
	},
	{
		key: "customerPhone",
		name: "Số điện thoại",
		required: true,
		tag: "text",
		placeholder: "Vui lòng nhập số điện thoại",
		validate: {
			test: isValidPhoneNumber,
			feedback: "Sai định dạng số điện thoại",
		},
	},
	{
		key: "paymentType",
		name: "Hình thức thanh toán",
		required: true,
		tag: "ratio",
		options: [
			{
				key: "COD",
				name: "Thanh toán khi nhận hàng",
				default: true,
			},
			{
				key: "BANK",
				name: "Chuyển khoản ngân hàng",
			},
		],
	},
	{
		key: "note",
		name: "Ghi chú",
		tag: "text", // "textarea",
		placeholder: "Có thể nhập ghi chú",
	},
]

const Input = {
	text: ({ field, data, error, onChangeValue }) => {
		return (
			<div key={field.key} className='flex flex-col'>
				<label className='text-xl mb-1'>{field.name}</label>
				<motion.input
					id={field.key}
					className='border-none outline-none bg-transparent text-2xl origin-top-left'
					whileFocus={{
						margin: 4,
						scale: 1.2,
					}}
					type='text'
					placeholder={field.placeholder}
					value={data[field.key]}
					onChange={(e) => onChangeValue(e, field)}
				/>
				{field.required && (
					<h2 className='text-red-500 mt-1 text-left text-md'>
						{error[field.key]}
					</h2>
				)}
			</div>
		)
	},

	textarea: ({ field, data, error, onChangeValue }) => {
		return (
			<div key={field.key} className='flex flex-col'>
				<label className='text-xl'>
					{field.name}
					{!field.required && (
						<span className='text-black/40'> (optional)</span>
					)}
				</label>
				<motion.textarea
					placeholder={field.placeholder}
					value={data[field.key]}
					onChange={(e) => onChangeValue(e, field)}
					className='border-none outline-none text-2xl origin-top-left'
				></motion.textarea>
			</div>
		)
	},

	ratio: ({ field, data, error, onChangeValue }) => {
		return (
			<div key={field.key} className='flex flex-col'>
				<h1 className='text-xl'>{field.name}</h1>
				{field.options.map((option) => {
					return (
						<div className='flex items-center gap-4'>
							<input
								type='radio'
								name={field.key}
								value={option.key}
								id={option.key}
								checked={option.key === data.paymentType}
								onChange={(e) => {
									onChangeValue(e, field)
								}}
							/>
							<label htmlFor={option.key} className='text-2xl'>
								{option.name}
							</label>
						</div>
					)
				})}
			</div>
		)
	},
}
