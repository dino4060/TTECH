"use client"
import {
	convertTo000D,
	convertToK,
	convertTokVND,
} from "@/lib/utils/number2"
import { useEffect, useState } from "react"
import CustomerDataForm from "./CustomerDataForm"
import {
	applyCouponCode,
	calcPayment,
	fetchCalcGhnShippingFee,
	fetchEstimateGhnLeadtime,
	fetchGetWarehouseAddress,
	fetchPreviewClaims,
	formatDateTimeRange,
} from "./order.service"

const DEFAILT_COUPON_RESULT = {
	isApplied: false,
	promotionType: undefined,
	id: undefined,
	couponCode: undefined,
	discountAmount: undefined,
	message: undefined,
}

const OrderBill = ({ cart, setCart }) => {
	const [totalPrice, setTotalPrice] = useState(0)
	const [discountAmount, setDiscountAmount] = useState(0)
	const [shippingFee, setShippingFee] = useState(0)
	const [deliveryTime, setDeliveryTime] = useState(null)
	const [warehouseAddr, setWarehouseAddr] = useState(null)
	const [customerAddr, setCustomerAddr] = useState(null)

	// Coupon code states
	const [couponCode, setCouponCode] = useState("")
	const [couponError, setCouponError] = useState("")
	const [appliedCouponCode, setAppliedCouponCode] = useState(
		DEFAILT_COUPON_RESULT
	)
	const [isApplyingCoupon, setIsApplyingCoupon] =
		useState(false)

	// Claimed coupon states
	const [bestOrderCoupon, setBestOrderCoupon] = useState(
		DEFAILT_COUPON_RESULT
	)
	const [bestShippingCoupon, setBestShippingCoupon] =
		useState(DEFAILT_COUPON_RESULT)

	// init => get the warehouse address
	useEffect(() => {
		fetchGetWarehouseAddress(setWarehouseAddr)
	}, [])

	// have address pair => calc shipping fee
	useEffect(() => {
		const isValid =
			warehouseAddr &&
			customerAddr &&
			cart.lines &&
			cart.lines.length > 0

		if (isValid) {
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
		if (!cart?.lines || cart.lines.length === 0) {
			setTotalPrice(0)
			setShippingFee(0)
			return
		}

		let total = 0
		cart.lines
			.map((l) => l.quantity * l.product.price.mainPrice)
			.forEach((l) => (total += l))
		setTotalPrice(total)
	}, [cart])

	// totalPrice changes => fetch best coupons
	useEffect(() => {
		const getBestCoupons = async () => {
			if (totalPrice === 0) return

			const body = {
				spendAmount: totalPrice,
				productIDs: cart.lines.map((l) => l.product.id),
			}

			await fetchPreviewClaims({
				body,
				onSuccess: (data) => {
					console.log(data)

					const [order, shipping] = data
					order.isApplied && setBestOrderCoupon(order)
					shipping.isApplied && setBestShippingCoupon(shipping)
				},
			})
		}
		getBestCoupons()
	}, [totalPrice])

	// Sync total discount amount from all applied sources
	useEffect(() => {
		let totalDiscount = 0
		// if (appliedCouponCode.isApplied)
		// 	totalDiscount += appliedCouponCode.discountAmount
		if (bestOrderCoupon.isApplied)
			totalDiscount += bestOrderCoupon.discountAmount
		if (bestShippingCoupon.isApplied)
			totalDiscount += bestShippingCoupon.discountAmount

		setDiscountAmount(totalDiscount)
	}, [
		// appliedCouponCode,
		bestOrderCoupon,
		bestShippingCoupon,
	])

	const handleApplyCoupon = async () => {
		setIsApplyingCoupon(true)
		setCouponError("")

		await applyCouponCode({
			couponCode,
			totalPrice,
			cart,
			onSuccess: (data) => {
				setDiscountAmount((prev) => prev + data.discountAmount)
				setAppliedCouponCode(data)
				setCouponError("")
			},
			onError: (error) => {
				setAppliedCouponCode(DEFAILT_COUPON_RESULT)
				setCouponError(error)
			},
		})

		setIsApplyingCoupon(false)
	}

	const handleRemoveCoupon = () => {
		setDiscountAmount(
			(prev) => prev - appliedCouponCode.discountAmount
		)
		setAppliedCouponCode(DEFAILT_COUPON_RESULT)
		setCouponCode("")
	}

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

			{/* Code Coupon Input */}
			<div className='w-full mt-6'>
				<div className='flex gap-2'>
					<input
						type='text'
						placeholder='Nhập mã coupon để nhận ưu dãi'
						value={couponCode}
						onChange={(e) =>
							setCouponCode(e.target.value.toUpperCase())
						}
						className='flex-1 outline-none border-2 border-black/20 rounded-xl p-3 text-[1.4rem]'
						disabled={
							isApplyingCoupon || appliedCouponCode.isApplied
						}
					/>
					<button
						onClick={
							appliedCouponCode.isApplied
								? handleRemoveCoupon
								: handleApplyCoupon
						}
						disabled={isApplyingCoupon || !couponCode.trim()}
						className={`px-6 py-3 text-xl font-semibold rounded-xl transition-colors ${
							isApplyingCoupon || !couponCode.trim()
								? "bg-gray-300 text-gray-300 cursor-not-allowed"
								: "bg-gray-300 text-gray-500"
						}`}
					>
						{isApplyingCoupon
							? "Chờ tí nhóa <3"
							: appliedCouponCode.isApplied
							? "Hủy áp dụng"
							: "Áp dụng"}
					</button>
				</div>

				{couponError && (
					<p className='text-red-500 text-lg mt-2'>
						{couponError}
					</p>
				)}
			</div>

			{/* Discount Notification Lines */}
			{appliedCouponCode.isApplied && (
				<div className='text-white mt-4 text-2xl w-3/4 text-center bg-blue-400 p-2 rounded-xl'>
					Đã áp dụng Coupon{" "}
					<span className=''>
						{appliedCouponCode.couponCode}.
					</span>{" "}
					<span className='font-bold'>
						Giảm {convertToK(appliedCouponCode.discountAmount)}
					</span>{" "}
					tổng tiền hàng
				</div>
			)}

			{bestOrderCoupon.isApplied && (
				<div className='text-white mt-4 text-2xl w-3/4 text-center bg-blue-400 p-2 rounded-xl'>
					Đã áp dụng Coupon Mua hàng đã nhận.{" "}
					<span className='font-bold'>
						Giảm {convertToK(bestOrderCoupon.discountAmount)}
					</span>{" "}
					tổng tiền hàng
				</div>
			)}

			{bestShippingCoupon.isApplied && (
				<div className='text-white mt-4 text-2xl w-3/4 text-center bg-blue-400 p-2 rounded-xl'>
					Đã áp dụng Coupon Vận chuyển đã nhận.{" "}
					<span className='font-bold'>
						Giảm {convertToK(bestShippingCoupon.discountAmount)}
					</span>{" "}
					phí vận chuyển
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
				{discountAmount !== 0 && (
					<>
						<div className=''>Phí:</div>
						<div className='text-right'>
							{convertTo000D(shippingFee)}
						</div>
					</>
				)}
				{shippingFee !== 0 && (
					<>
						<div className=''>Giảm:</div>
						<div className='text-red-500 text-right'>
							{convertTo000D(discountAmount)}
						</div>
					</>
				)}
				<div>{"="}</div>
				<div className='text-right'>
					{convertTo000D(
						calcPayment(totalPrice, discountAmount, shippingFee)
					)}
				</div>
			</div>

			<div className='h-[1px] bg-black/40 w-full mt-[12px]'></div>

			<CustomerDataForm
				cart={cart}
				setCart={setCart}
				customerAddr={customerAddr}
				setCustomerAddr={setCustomerAddr}
				warehouseAddr={warehouseAddr}
				setWarehouseAddr={setWarehouseAddr}
				totalPrice={totalPrice}
				totalDiscount={discountAmount}
				totalPayment={calcPayment(
					totalPrice,
					discountAmount,
					shippingFee
				)}
				shippingFee={shippingFee}
				appliedCouponCode={appliedCouponCode}
			/>
		</div>
	)
}

export default OrderBill
