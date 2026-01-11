"use client"
import { UserAuth } from "@/context/AuthContext"
import { couponApi } from "@/lib/api/coupon.api"
import { clientFetch } from "@/lib/http/fetch.client"
import {
	calcPercentOfPart,
	convertPercent,
	convertTo000D,
	convertToK,
} from "@/lib/utils/number2"
import { Fragment, useEffect, useState } from "react"
import { TbTicket, TbTruckDelivery } from "react-icons/tb"
import { CampaignTypeMap } from "../admin/campaigns/CampaignUtils"

const ProductCoupon = ({ productId }) => {
	const { user } = UserAuth()
	const [coupons, setCoupons] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchCoupons = async () => {
			setLoading(true)
			if (!user?.id) {
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
		fetchCoupons()
	}, [productId, user])

	return (
		<Fragment>
			{loading ? (
				<div className='my-12 flex justify-center'>
					<div className='text-2xl text-gray-500'>
						Đang tải coupon...
					</div>
				</div>
			) : (
				<div className='my-16 border-t py-8'>
					<h3 className='text-[2.2rem] font-semibold mb-8 flex items-center gap-3'>
						<span className='w-2 h-10 bg-blue-500 rounded-full'></span>
						Khuyến mãi đặc biệt
					</h3>

					<div className='flex flex-col lg:flex-row gap-6'>
						{/* Order Coupons - Red/Pink like TikTok */}
						<div className='flex-1 mr-[150px]'>
							<div className='text-[1.4rem] font-semibold text-black/40 mb-3 uppercase tracking-wider'>
								Giảm giá đơn hàng
							</div>
							{coupons.length > 0 ? (
								coupons
									.filter(
										(c) =>
											c.promotionType ===
											CampaignTypeMap.ORDER_COUPON.key
									)
									.map((c) => (
										<CouponItem
											key={c.id}
											coupon={c}
											primaryColor='bg-gradient-to-r from-pink-500 to-red-500'
											textColor='text-red-500'
											name={"Mua hàng"}
											icon={TbTicket}
										/>
									))
							) : (
								<p className='text-[1.2rem] italic text-black/20'>
									Không có mã giảm giá
								</p>
							)}
						</div>

						{/* Shipping Coupons - Blue/Green like TikTok */}
						<div className='flex-1 mr-[150px]'>
							<div className='text-[1.4rem] font-semibold text-black/40 mb-3 uppercase tracking-wider'>
								Ưu đãi vận chuyển
							</div>
							{coupons.length > 0 ? (
								coupons
									.filter(
										(c) =>
											c.promotionType ===
											CampaignTypeMap.SHIPPING_COUPON.key
									)
									.map((c) => (
										<CouponItem
											key={c.id}
											coupon={c}
											primaryColor='bg-gradient-to-r from-green-500 to-teal-500'
											textColor='text-teal-500'
											name={"Vận chuyển"}
											icon={TbTruckDelivery}
										/>
									))
							) : (
								<p className='text-[1.2rem] italic text-black/20'>
									Không có mã vận chuyển
								</p>
							)}
						</div>
					</div>
				</div>
			)}
		</Fragment>
	)
}

export default ProductCoupon

const CouponItem = ({
	coupon,
	primaryColor,
	textColor,
	name,
	icon: Icon,
}) => (
	<div
		className={`flex items-center border rounded-xl overflow-hidden mb-3 bg-white`}
	>
		<div
			className={`p-4 ${primaryColor} text-white flex flex-col items-center justify-center w-[100px]`}
		>
			<Icon size={24} />
			<span className='text-[1.4rem] font-semibold mt-1'>
				{name}
			</span>
		</div>
		<div className='flex-1 p-3 flex justify-between items-center gap-4'>
			<div>
				<div
					className={`text-[1.4rem] font-semibold ${textColor}`}
				>
					{coupon.isFixed
						? `Giảm ${convertToK(coupon.discountValue)}`
						: `Nhận ưu đãi ${convertPercent(
								coupon.discountValue
						  )}`}
				</div>
				<div className='text-[1.2rem] text-black/50 line-clamp-1'>
					{!coupon.minSpend
						? "Dành cho mọi đơn hàng"
						: `Dành cho đơn hàng trên ${convertTo000D(
								coupon.minSpend
						  )}`}
				</div>
			</div>
			<div>
				<div className='flex flex-col items-end min-w-[100px]'>
					<div className='text-[1.15rem] text-black/50 mb-1'>
						Đã dùng hết{" "}
						{calcPercentOfPart(
							coupon.usedCount,
							coupon.totalLimit || ((coupon.usedCount + 1) * 4) / 3
						)}
						%
					</div>
					<div className='w-full h-[6px] bg-gray-100 rounded-full overflow-hidden border border-black/[0.03]'>
						<div
							className={`h-full ${primaryColor} transition-all duration-500`}
							style={{
								width: `${calcPercentOfPart(
									coupon.usedCount,
									coupon.totalLimit ||
										((coupon.usedCount + 1) * 4) / 3
								)}%`,
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
)
