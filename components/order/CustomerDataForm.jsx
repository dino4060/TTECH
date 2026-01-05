"use client"
import { momoApiRt } from "@/app/api/payment/momo/momo.api-route"
import { ghnApiRt } from "@/app/api/shipping/ghn/ghn.api-route"
import { UserAuth } from "@/context/AuthContext"
import { orderApi } from "@/lib/api/order.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { isValidPhoneNumber } from "@/lib/utils/number2"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import CircleLoader from "../uncategory/CircleLoader"
import AddressDataForm, {
	FormFieldList,
} from "./AddressDataForm"
import { getEnv } from "@/lib/utils/env"

const CustomerDataForm = ({
	cart,
	setCart,
	customerAddr,
	setCustomerAddr,
	warehouseAddr,
	setWarehouseAddr,
	totalPrice,
	totalDiscount,
	totalPayment,
	shippingFee,
}) => {
	const router = useRouter()
	const { user } = UserAuth()
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
	const [sharedFeedback, setSharedFeedback] = useState("")

	// change totalPayment => logic allowCOD
	useEffect(() => {
		if (totalPayment && totalPayment >= 50000) {
			setSharedFeedback(
				"Không thể thanh toán cho đơn hàng trị giá từ 50 triệu đồng"
			)
		} else {
			setSharedFeedback("")
		}
	}, [totalPayment])

	// change formData => logic customerAddr
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
				provinceId: parseInt(provinceId),
				wardId: parseInt(wardId),
				street,
			})
	}, [data])

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

		if (!customerAddr || !warehouseAddr) return

		if (sharedFeedback) return

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
		// create an order
		const body = {
			allPrice: totalPrice,
			allDiscount: totalDiscount,
			shippingFee: shippingFee,
			total: totalPayment,

			paymentType: data.paymentType,
			note: data.note,

			toUserName: customerAddr.userName,
			toPhone: customerAddr.phone,
			toProvinceId: customerAddr.provinceId,
			toWardId: customerAddr.wardId,
			toStreet: customerAddr.street,

			fromUserName: warehouseAddr.userName,
			fromPhone: warehouseAddr.phone,
			fromProvinceId: warehouseAddr.provinceId,
			fromWardId: warehouseAddr.wardId,
			fromStreet: warehouseAddr.street,
		}
		const orderRes = await clientFetch(
			orderApi.checkout(body)
		)

		if (orderRes.success !== true) {
			setLoading(false)
			alert("Lỗi tạo đơn hàng: " + orderRes.error)
			return
		}

		const newOrder = orderRes.data

		// Clean the cart
		setCart({ ...cart, lines: [] })

		// Create a GHN parcel
		const ghnRes = await ghnApiRt.createParcel({
			order: newOrder,
		})

		if (ghnRes.code !== 200) {
			setLoading(false)
			alert("Lỗi tạo bưu kiện: " + ghnRes.message)
			return
		}

		// Link the parcel to the order
		const editOrderRes = await clientFetch(
			orderApi.update({
				id: newOrder.id,
				parcelCode: ghnRes.data.parcelCode,
			})
		)

		if (editOrderRes.success !== true) {
			setLoading(false)
			alert("Lỗi liên kết bưu kiện: " + editOrderRes.error)
			return
		}

		// Pay via COD
		if (newOrder.paymentType === "COD") {
			setLoading(false)
			router.push("/checkout/success")
		}

		// Pay via MOMO banking
		if (newOrder.paymentType === "BANK") {
			const momoRes = await momoApiRt.createPayUrl({
				amount: newOrder.total * 1000,
				orderId: newOrder.id,
				returnUrl: "http://localhost:3000/checkout/success", // getEnv.SUCCESS_CHECKOUT_URL,
			})

			if (momoRes.resultCode !== 0) {
				setLoading(false)
				alert("Lỗi thanh toán: " + momoRes.message)
				return
			}

			setLoading(false)
			router.push(momoRes.payUrl)
		}
	}

	return (
		<div className='w-full'>
			<form
				onSubmit={(e) => e.preventDefault()}
				className='flex flex-col gap-5 mt-8'
			>
				<h1 className='text-center text-4xl font-[700]'>
					Thông tin khách hàng
				</h1>

				{Fields.map((field) => {
					const ReactComponent = Input[field.tag]
					return (
						<ReactComponent
							key={field.key}
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

				<div>
					<h2 className='text-red-500 text-left text-xl mb-1'>
						{sharedFeedback}
					</h2>

					<button
						onClick={onSubmitOrder}
						className='
            w-full  bg-blue-500 rounded-full text-white py-3 text-2xl  font-bold
            flex items-center justify-center'
					>
						{loading ? <CircleLoader /> : "Hoàn tất"}
					</button>
				</div>
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
						<div
							key={option.key}
							className='flex items-center gap-4'
						>
							<input
								type='radio'
								value={option.key}
								id={option.key}
								checked={option.key === data.paymentType}
								onChange={(e) => {
									onChangeValue(e, field)
								}}
							/>
							<label className='text-2xl' htmlFor={option.key}>
								{option.name}
							</label>
						</div>
					)
				})}
			</div>
		)
	},
}
