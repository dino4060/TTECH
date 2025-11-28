"use client"
import {
	convertToD,
	convertTokVND,
	convertToVND,
} from "@/utils/until"
import { useEffect, useState } from "react"
import OrderFormData from "./OrderFormData"
import { checkV } from "@/lib/utils/check"

const OrderBill = ({ cart, setCart }) => {
	const [totalPrice, setTotalPrice] = useState(0)

	const [discount, setDiscount] = useState({
		discountId: null,
		discountCode: "",
		discountAmount: 0,
		discountDateFrom: "",
		discountDateTo: "",
	})

	useEffect(() => {
		if (!cart?.lines) {
			setTotalPrice(0)
			return
		}

		let total = 0
		cart.lines
			.map((l) => l.quantity * l.product.price.mainPrice)
			.forEach((l) => (total += l))
		setTotalPrice(total)
	}, [cart])

	// const getCurrentDiscount = async () => {
	// 	const date = new Date().toISOString().split("T")[0]

	// 	const response = await handleDiscount.getCurrentDiscount(
	// 		date
	// 	)

	// 	if (response.discountId) setDiscount(response)
	// }

	// useEffect(() => {
	// 	getCurrentDiscount()
	// }, [])

	return (
		<div className='flex flex-col items-center p-8 shrink-0  bg-white min-w-[300px] max-w-[500px] '>
			<h1 className='text-black font-semibold text-4xl text-center'>
				Chi tiết hóa đơn
			</h1>

			<h1 className='text-black font-[300] w-full text-xl text-center whitespace-nowrap overflow-hidden'>
				--------------------------------------------------------------------------
			</h1>

			<table className='w-full text-2xl text-left '>
				<thead>
					<tr>
						<th className='p-2'>Sản phẩm</th>
						<th className='p-2 w-[20%]'>Số lượng</th>
						<th className='p-2 w-[20%]'>Tổng tiền</th>
					</tr>
				</thead>
				<tbody className=''>
					{cart?.lines?.map((l) => (
						<tr
							key={l}
							className='border-t border-slate-500/60 my-2'
						>
							<td className='p-2'>
								{l?.product?.name || "loading"}
							</td>
							<td className='p-2'>{l?.quantity}</td>
							<td className='p-2'>
								{convertTokVND(
									l?.quantity * l?.product?.price?.mainPrice || 0,
									false
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{discount.discountId && (
				<div className='text-white mt-4 text-2xl w-3/4 text-center bg-blue-400 p-2 rounded-xl'>
					Quý khách được áp dụng mã:{" "}
					<span className='font-bold'>
						{discount.discountCode}
					</span>{" "}
					giảm <span>{discount.discountAmount}%</span> cho đơn
					hàng
				</div>
			)}

			<div className='text-black text-3xl grid grid-cols-2 px-[100px]  py-8 w-full rounded-full font-[600] mt-2'>
				<div className=' '>Tổng:</div>{" "}
				<div>{convertToD(totalPrice)}</div>
				{discount.discountId && (
					<>
						<div className=''>Giảm:</div>
						<div className='text-red-500'>
							{convertToVND(
								Math.ceil(
									totalPrice *
										(Number.parseInt(discount.discountAmount) / 100)
								)
							)}
						</div>
						<div className=''>=</div>
						<div>
							{convertToVND(
								Math.ceil(
									totalPrice -
										totalPrice *
											(Number.parseInt(discount.discountAmount) / 100)
								)
							)}
						</div>
					</>
				)}
			</div>

			<div className='h-[1px] bg-black/40 w-full mt-[12px]'></div>

			<OrderFormData
				cart={cart}
				setCart={setCart}
				discount={discount}
				totalPrice={
					totalPrice -
					totalPrice *
						(Number.parseInt(discount.discountAmount) / 100)
				}
			/>
		</div>
	)
}

export default OrderBill
