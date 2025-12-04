"use client"
import { convertTo000D, convertTokVND } from "@/utils/until"
import { useEffect, useState } from "react"
import CustomerDataForm from "./CustomerDataForm"
import {
	calcDiscount,
	calcPayment,
	fetchCalcGhnShippingFee,
	fetchEstimateGhnLeadtime,
	fetchGetWarehouseAddress,
	formatDateTimeRange,
} from "./helper"

const OrderBill = ({ cart, setCart }) => {
	const [totalPrice, setTotalPrice] = useState(0)
	const [discount, setDiscount] = useState({
		discountId: 123,
		discountCode: "TTECH10P",
		discountAmount: 10,
		discountDateFrom: "",
		discountDateTo: "",
	})
	const [shippingFee, setShippingFee] = useState(0)
	const [deliveryTime, setDeliveryTime] = useState(null)
	const [warehouseAddr, setWarehouseAddr] = useState(null)
	const [customerAddr, setCustomerAddr] = useState(null)

	// init => get the warehouse address
	useEffect(() => {
		fetchGetWarehouseAddress(setWarehouseAddr)
	}, [])

	// have address pair => calc shipping fee
	useEffect(() => {
		if (
			warehouseAddr &&
			customerAddr &&
			cart.lines &&
			cart.lines.length > 0
		) {
			fetchEstimateGhnLeadtime(
				warehouseAddr,
				customerAddr,
				setDeliveryTime
			)

			fetchCalcGhnShippingFee(
				warehouseAddr,
				customerAddr,
				cart.lines,
				setShippingFee
			)
		}
	}, [warehouseAddr, customerAddr, cart])

	// get cart => fill order line items
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
							key={l.id}
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

			{deliveryTime && (
				<div className='text-white mt-4 text-2xl w-3/4 text-center bg-green-400 p-2 rounded-xl'>
					Dự kiến giao hàng vào ngày:{" "}
					<span className='font-bold'>
						{formatDateTimeRange(
							deliveryTime.from,
							deliveryTime.to
						)}
					</span>
					, giao bởi GHN
				</div>
			)}

			<div className='text-black text-3xl grid grid-cols-2 px-[100px]  py-8 w-full rounded-full font-[600] mt-2'>
				<div>Tổng:</div>{" "}
				<div className='text-right'>
					{convertTo000D(totalPrice)}
				</div>
				{discount.discountId && (
					<>
						<div className=''>Giảm:</div>
						<div className='text-red-500 text-right'>
							{convertTo000D(
								calcDiscount(totalPrice, discount.discountAmount)
							)}
						</div>
					</>
				)}
				{shippingFee !== 0 && (
					<>
						<div className=''>Vận chuyển:</div>
						<div className='text-red-500 text-right'>
							{convertTo000D(shippingFee)}
						</div>
					</>
				)}
				<div>{"="}</div>
				<div className='text-right'>
					{convertTo000D(
						calcPayment(
							totalPrice,
							discount.discountAmount,
							shippingFee
						)
					)}
				</div>
			</div>

			<div className='h-[1px] bg-black/40 w-full mt-[12px]'></div>

			<CustomerDataForm
				cart={cart}
				setCart={setCart}
				totalPrice={totalPrice}
				totalDiscount={calcDiscount(
					totalPrice,
					discount.discountAmount
				)}
				shippingFee={shippingFee}
				totalPayment={calcPayment(
					totalPrice,
					discount.discountAmount,
					shippingFee
				)}
				setCustomerAddr={setCustomerAddr}
			/>
		</div>
	)
}

export default OrderBill
