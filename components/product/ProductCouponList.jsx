"use client"
import { Fragment, useEffect, useState } from "react"
import { clientFetch } from "@/lib/http/fetch.client"
import { couponApi } from "@/lib/api/coupon.api"
import {
	convertTo000D,
	convertPercent,
} from "@/lib/utils/number2"
import { motion } from "framer-motion"
import {
	IoTicketOutline,
	IoGiftOutline,
} from "react-icons/io5"
import { TbTruckDelivery } from "react-icons/tb"
import { UserAuth } from "@/context/AuthContext"
import { CampaignTypeMap as PromoType } from "../admin/campaigns/CampaignUtils"

const ProductCouponList = ({ productId }) => {
	const { user } = UserAuth()
	const [coupons, setCoupons] = useState([])
	const [loading, setLoading] = useState(true)
	const [claimingCouponId, setClaimingCouponId] =
		useState(undefined)

	useEffect(() => {
		fetchCoupons()
	}, [productId, user])

	const fetchCoupons = async () => {
		setLoading(true)
		if (user && user?.id) {
			setLoading(false)
			return
		}

		const res = await clientFetch(couponApi.list(productId))
		if (!res.success) {
			alert("Error coupon api: " + res.error)
			setLoading(false)
			return
		}

		setCoupons(res.data)
		setLoading(false)
	}

	const handleClaimCoupon = async (couponId) => {
		return
		setClaimingCouponId(couponId)

		const { success, error } = await clientFetch(
			couponApi.claim({ couponId })
		)

		if (success) {
			alert("Nhận coupon thành công!")
			await fetchCoupons()
		} else {
			alert(error || "Không thể nhận coupon")
		}

		setClaimingCouponId(null)
	}

	// if (loading) {
	// 	return (
	// 		<div className='my-12 flex justify-center'>
	// 			<div className='text-2xl text-gray-500'>
	// 				Đang tải coupon...
	// 			</div>
	// 		</div>
	// 	)
	// }

	// if (coupons.length === 0) {
	// 	return null
	// }

	return (
		<Fragment>
			{loading ? (
				<div className='my-12 flex justify-center'>
					<div className='text-2xl text-gray-500'>
						Đang tải coupon...
					</div>
				</div>
			) : (
				<div className='my-12'>
					<h2 className='text-[2.4rem] font-bold mb-6 flex items-center gap-2'>
						<IoGiftOutline size={32} className='text-red-500' />
						Ưu đãi dành cho bạn
					</h2>

					<div className='flex flex-col gap-6'>
						{/* Order Coupons */}
						{coupons.length > 0 && (
							<div>
								<h3 className='text-[1.8rem] font-semibold mb-4 flex items-center gap-2 text-red-600'>
									<IoTicketOutline size={24} />
									Mã giảm giá đơn hàng
								</h3>
								<div className='flex flex-col gap-3'>
									{coupons
										.filter(
											(c) => c.promotionType === PromoType.ORDER_COUPON
										)
										.map((coupon) => (
											<CouponCard
												key={coupon.id}
												coupon={coupon}
												onClaim={handleClaimCoupon}
												isClaiming={claimingCouponId === coupon.id}
												type='order'
											/>
										))}
								</div>
							</div>
						)}

						{/* Shipping Coupons */}
						{coupons.length > 0 && (
							<div>
								<h3 className='text-[1.8rem] font-semibold mb-4 flex items-center gap-2 text-blue-600'>
									<TbTruckDelivery size={24} />
									Mã giảm phí vận chuyển
								</h3>
								<div className='flex flex-col gap-3'>
									{coupons
										.filter(
											(c) =>
												c.promotionType === PromoType.SHIPPING_COUPON
										)
										.map((coupon) => (
											<CouponCard
												key={coupon.id}
												coupon={coupon}
												onClaim={handleClaimCoupon}
												isClaiming={claimingCouponId === coupon.id}
												type='shipping'
											/>
										))}
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</Fragment>
	)
}

const CouponCard = ({
	coupon,
	onClaim,
	isClaiming,
	type,
}) => {
	const isOrder = type === "order"
	const bgGradient = isOrder
		? "bg-gradient-to-r from-red-50 to-pink-50"
		: "bg-gradient-to-r from-blue-50 to-green-50"
	const borderColor = isOrder
		? "border-red-200"
		: "border-blue-200"
	const textColor = isOrder
		? "text-red-600"
		: "text-blue-600"
	const buttonBg = isOrder ? "bg-red-500" : "bg-blue-500"
	const buttonHover = isOrder
		? "hover:bg-red-600"
		: "hover:bg-blue-600"

	const formatDiscount = () => {
		if (coupon.isFixed) {
			return convertTo000D(coupon.discountValue)
		} else {
			return `${convertPercent(coupon.discountValue)}`
		}
	}

	const formatCondition = () => {
		if (!coupon.minSpend) return "Không giới hạn"
		return `Đơn tối thiểu ${convertTo000D(coupon.minSpend)}`
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className={`${bgGradient} ${borderColor} border-2 rounded-2xl p-4 flex items-center justify-between`}
		>
			<div className='flex-1'>
				<div className='flex items-center gap-3 mb-2'>
					<div
						className={`${textColor} font-bold text-[2.4rem]`}
					>
						{formatDiscount()}
					</div>
					<div className='bg-white px-3 py-1 rounded-full text-[1.2rem] font-semibold text-gray-700'>
						{coupon.code}
					</div>
				</div>

				<div className='text-[1.4rem] text-gray-700 mb-1'>
					{coupon.name || "Mã giảm giá"}
				</div>

				<div className='flex flex-wrap gap-x-4 gap-y-1 text-[1.2rem] text-gray-600'>
					<span>• {formatCondition()}</span>
					{coupon.maxDiscount && (
						<span>
							• Giảm tối đa {convertTo000D(coupon.maxDiscount)}
						</span>
					)}
					{coupon.totalLimit && (
						<span>• Còn {coupon.totalLimit} lượt</span>
					)}
					{coupon.endTime && (
						<span>
							• HSD:{" "}
							{new Date(coupon.endTime).toLocaleDateString(
								"vi-VN"
							)}
						</span>
					)}
				</div>
			</div>

			<button
				onClick={() => onClaim(coupon.id)}
				disabled={isClaiming || coupon.isClaimed}
				className={`ml-4 px-6 py-3 rounded-xl text-white text-[1.4rem] font-semibold transition-all ${
					coupon.isClaimed
						? "bg-gray-400 cursor-not-allowed"
						: isClaiming
						? "bg-gray-400"
						: `${buttonBg} ${buttonHover}`
				}`}
			>
				{coupon.isClaimed
					? "Đã nhận"
					: isClaiming
					? "Đang nhận..."
					: "Nhận ngay"}
			</button>
		</motion.div>
	)
}

export default ProductCouponList
