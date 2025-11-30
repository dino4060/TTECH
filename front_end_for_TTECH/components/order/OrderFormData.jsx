"use client"
import { paymentApiRt } from "@/app/api/payment/momo/payment.api-route"
import { UserAuth } from "@/context/AuthContext"
import { checkV } from "@/lib/utils/check"
import { isValidPhoneNumber } from "@/utils/until"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import CircleLoader from "../uncategory/CircleLoader"

const OrderFormData = ({
	cart,
	setCart,
	totalPrice,
	discount,
}) => {
	const { user } = UserAuth()
	const router = useRouter()
	const [paymentType, setPaymentType] = useState("COD")
	const paymentTypeRef = useRef()
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState({
		customerName: user?.name,
		customerPhone: user?.phone,
		deliveryAddress: user?.address,
		note: "",
		paymentType: "COD",
	})
	const [error, setError] = useState({
		customerName: "",
		deliveryAddress: "",
		customerPhone: "",
		paymentType: "",
	})

	const Fields = [
		{
			key: "customerName",
			name: "Tên khách hàng",
			require: true,
			tag: "text",
			placeholder: "Vui lòng nhập tên khách hàng",
		},
		{
			key: "customerPhone",
			name: "Số điện thoại",
			require: true,
			tag: "text",
			placeholder: "Vui lòng nhập số điện thoại",
			validate: {
				test: isValidPhoneNumber,
				feedback: "Sai định dạng số điện thoại",
			},
		},
		{
			key: "deliveryAddress",
			name: "Địa chỉ",
			require: true,
			tag: "text",
			placeholder: "Vui lòng nhập địa chỉ",
		},
		{
			key: "note",
			name: "Ghi chú",
			tag: "textarea",
			placeholder: "Có thể nhập ghi chú",
		},
		{
			key: "paymentType",
			name: "Hình thức thanh toán",
			require: true,
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
	]

	const Input = {
		text: (x) => {
			return (
				<div key={x.key} className='flex flex-col mb-2 '>
					<label className='text-xl mb-1'>{x.name}</label>
					<motion.input
						whileFocus={{
							margin: 4,
							scale: 1.2,
						}}
						value={data[x.key]}
						className='border-none outline-none bg-transparent text-2xl origin-top-left'
						id={x.key}
						placeholder={x.placeholder}
						onChange={(e) => onChangeValue(e, x)}
						type='text'
					/>
					{x.require && (
						<h2 className='text-red-500 mt-1 text-left text-md'>
							{error[x.key]}
						</h2>
					)}
				</div>
			)
		},

		textarea: (x) => {
			return (
				<div key={x.key} className='flex flex-col'>
					<label className='text-xl mb-1'>
						{x.name}
						{!x.require && (
							<span className='text-black/40'> (optional)</span>
						)}
					</label>
					<motion.textarea
						placeholder={x.placeholder}
						value={data[x.key]}
						onChange={(e) => onChangeValue(e, x)}
						className='border-none outline-none text-2xl origin-top-left'
					></motion.textarea>
				</div>
			)
		},

		ratio: (x) => {
			return (
				<div key={x.key} className='mt-10 text-black w-full'>
					<h1 className='text-xl'>{x.name}</h1>
					{x.options.map((option) => {
						return (
							<div className='flex items-center gap-4'>
								<input
									type='radio'
									name={x.key}
									value={option.key}
									id={option.key}
									checked={option.key === data.paymentType}
									onChange={(e) => {
										onChangeValue(e, x)
										// paymentTypeRef.current.focus()
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

	const onChangeValue = (e, x) => {
		const value = e.target.value

		let feedback = ""
		if (x.require && !value.trim()) {
			feedback = x.placeholder
		} else if (x.validate && !x.validate.test(value)) {
			feedback = x.validate.feedback
		}

		setError((pre) => ({
			...pre,
			[x.key]: feedback,
		}))

		setData((pre) => ({
			...pre,
			[x.key]: value,
		}))
	}

	const onSubmitOrder = async () => {
		if (!cart.lines.length) {
			alert("Chưa có sản phẩm")
			return
		}

		let isOke = true
		Fields.forEach((field) => {
			if (field.require && !data[field.key]) {
				checkV(field.key)
				isOke = false
				error[field.key] = field.placeholder
				setError({ ...error })
			}
		})
		if (!isOke) return

		const order = {
			...data,
			allPrice: totalPrice,
			allDiscount: 0,
			total: totalPrice, // Math.ceil(totalPrice),
		}

		setLoading(true)

		// const {
		// 	success,
		// 	data: newOrder,
		// 	error: message,
		// } = await clientFetch(orderApi.checkout(order))

		const success = true

		if (success) {
			// setCart({ ...cart, lines: [] })
			const newOrder = { ...data, id: 1 }

			if (newOrder.paymentType === "COD") {
				setLoading(false)
				router.push("/checkout/success")
			}

			if (newOrder.paymentType === "BANK") {
				const response =
					await paymentApiRt.momoApiRt.createPayUrl({
						amount: newOrder.total,
						orderId: newOrder.id,
						returnUrl: "http://localhost:3000/checkout/success",
					})

				setLoading(false)
				if (response.resultCode === 0) {
					router.push(response.payUrl)
				} else {
					console.error("MoMo Client Error:", response)
					alert("Có lỗi xảy ra: " + response.message)
				}

				// const result = await handleTransaction.bank(
				// 	totalPrice,
				//  newOrder.id
				// )
				// router.push(result)
				// return
			}
		} else {
			setLoading(false)
			alert("Thanh toán thất bại: " + message)
		}
	}

	return (
		<div className='w-full'>
			<h1 className='text-center text-4xl font-[700] mt-8'>
				Thông tin khách hàng
			</h1>

			<form
				onSubmit={(e) => e.preventDefault()}
				className='flex flex-col gap-4 mt-4'
			>
				{Fields.map((field) => Input[field.tag](field))}

				<button
					onClick={onSubmitOrder}
					className='w-full bg-blue-500 rounded-full text-white py-3 text-2xl flex items-center justify-center font-bold'
				>
					{loading ? <CircleLoader /> : "Hoàn tất"}
				</button>
			</form>
		</div>
	)
}

export default OrderFormData
