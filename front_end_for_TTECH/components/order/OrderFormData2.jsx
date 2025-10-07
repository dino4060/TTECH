"use client"
import { UserAuth } from "@/context/AuthContext"
import { v4 as uuidv4 } from "uuid"

import { handleCart } from "@/app/api/handleCart"
import { handleDetailOrder } from "@/app/api/handleDetailOrder"
import { handleOrder } from "@/app/api/handleOrder"
import {
	isValidEmail,
	isValidPhoneNumber,
} from "@/utils/until"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import CircleLoader from "../uncategory/CircleLoader"
import { handleTransaction } from "@/app/api/handleTransaction"

const OrderFormData = ({
	cart,
	setCart,
	totalPrice,
	discount,
}) => {
	const { user, token } = UserAuth()

	const router = useRouter()

	const [selectedPaymentType, setSelectedPaymentType] =
		useState("cash")
	const paymentTypeRef = useRef()

	const [loading, setLoading] = useState(false)

	const Fields = [
		{
			key: "name",
			name: "Tên khách hàng",
			tag: "input",
			placeholder: "Vui lòng nhập tên khách hàng",
			require: true,
		},
		{
			key: "email",
			name: "Email",
			tag: "input",
			placeholder: "Vui lòng nhập email",
			require: true,
			validate: isValidEmail,
		},
		{
			key: "phone",
			name: "Số điện thoại",
			tag: "input",
			placeholder: "Vui lòng nhập số điện thoại",
			require: true,
			validate: isValidPhoneNumber,
		},
		{
			key: "address",
			name: "Địa chỉ",
			tag: "input",
			placeholder: "Vui lòng nhập địa chỉ",
			require: true,
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
			tag: "ratio",
			options: [
				{
					key: "cash",
					name: "Thanh toán khi nhận hàng",
					default: true,
				},
				{
					key: "bank",
					name: "Chuyển khoản ngân hàng",
				},
			],
			require: true,
		},
	]

	const Input = {
		input: (x) => {
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
						onChange={onChangeValue}
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
						placeholder='Vui lòng nhập ghi chú'
						value={data[x.key]}
						onChange={(e) => {
							setData((pre) => ({
								...pre,
								Note: e.target.value,
							}))
						}}
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
									checked={option.default}
									onChange={() => {
										setSelectedPaymentType(option.key)
										paymentTypeRef.current.focus()
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

	const [data, setData] = useState({
		name: user?.name,
		address: "",
		email: user?.email,
		phone: user?.phone,
		note: "",
	})

	const [error, setError] = useState({
		name: "",
		address: "",
		email: "",
		phone: "",
	})

	const onChangeValue = (e) => {
		const { id, value } = e.target

		let errorMessage = ""
		if (!value.trim()) {
			errorMessage = `Vui lòng nhập ${
				id == "name"
					? "tên"
					: id == "email"
					? "email"
					: id == "password"
					? "mật khẩu"
					: id == "phone"
					? "số điện thoại"
					: id == "address"
					? "địa chỉ"
					: ""
			}`
		} else if (id === "phone" && !isValidPhoneNumber(value)) {
			errorMessage = "Sai định dạng số điện thoại"
		} else if (id === "email" && !isValidEmail(value))
			errorMessage = "Sai định dạng email"

		setError((pre) => ({
			...pre,
			[id]: errorMessage,
		}))

		setData((pre) => ({
			...pre,
			[id]: value,
		}))
	}

	const onSubmitOrder = async () => {
		const orderId = uuidv4()
		setLoading(true)

		const order = {
			orderId,
			userId: user.userId,
			// createOrderAt: new Date().getTime(),
			...data,
			state: "pending",
			note: data.note || "",
			total: Math.ceil(totalPrice),
			discountId: discount.discountId,
			deliveryFee: 0,
		}

		const detailOrder = [...cart].map((x) => ({
			orderId,
			productId: x.product.productId,
			price: x.product.price,
			quantity: x.quantity,
		}))

		await handleOrder.addNewOrder(order, token)
		await handleDetailOrder.addNewDetailOrder(
			detailOrder,
			token
		)
		await handleCart.EmptyCartUser(token)
		setCart([])
		setLoading(false)

		if (selectedPaymentType === "bank") {
			const result = await handleTransaction.bank(
				totalPrice,
				orderId
			)
			router.push(result)
			return
		} else router.push("/upcomming/success")
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
