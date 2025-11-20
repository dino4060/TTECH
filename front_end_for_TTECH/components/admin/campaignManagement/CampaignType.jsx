"use client"
import { motion } from "framer-motion"
import { Fragment, useState } from "react"
import {
	CiDiscount1,
	CiGift,
	CiUser,
	CiCreditCard1,
	CiShoppingTag,
	CiMail,
} from "react-icons/ci"

const CampaignType = ({}) => {
	return (
		<Fragment>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className='mt-8'
			>
				{/* Giảm giá section */}
				<div className='mb-8'>
					<h2 className='text-2xl font-bold mb-2'>Giảm giá</h2>
					<p className='text-gray-600 mb-6'>
						Đặt ưu đãi giảm giá cho sản phẩm để thu hút khách hàng
						và tăng doanh số
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{campaignTypes.slice(0, 3).map((type, index) => (
							<motion.div
								key={index}
								className='p-6 border border-gray-200 rounded-lg bg-white hover:border-blue-500 hover:shadow-md transition-all cursor-pointer'
								whileHover={{ scale: 1.02 }}
							>
								<div className='flex items-start gap-4'>
									<div className='p-3 bg-blue-50 rounded-lg'>
										<type.icon className='w-8 h-8 text-blue-600' />
									</div>
									<div className='flex-1 min-w-0'>
										<h3 className='text-lg font-semibold mb-2 flex items-center gap-2'>
											{type.title}
											{type.badge && (
												<span className='text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded'>
													{type.badge}
												</span>
											)}
										</h3>
										<p className='text-gray-600 text-sm leading-relaxed'>
											{type.description}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>

				{/* Voucher section */}
				<div>
					<h2 className='text-2xl font-bold mb-2'>Voucher</h2>
					<p className='text-gray-600 mb-6'>
						Trao tặng voucher để khuyến khích khách tăng giá trị
						đơn hàng
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{campaignTypes.slice(3).map((type, index) => (
							<motion.div
								key={index}
								className='p-6 border border-gray-200 rounded-lg bg-white hover:border-blue-500 hover:shadow-md transition-all cursor-pointer'
								whileHover={{ scale: 1.02 }}
							>
								<div className='flex items-start gap-4'>
									<div className='p-3 bg-blue-50 rounded-lg'>
										<type.icon className='w-8 h-8 text-blue-600' />
									</div>
									<div className='flex-1 min-w-0'>
										<h3 className='text-lg font-semibold mb-2 flex items-center gap-2'>
											{type.title}
											{type.badge && (
												<span className='text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded'>
													{type.badge}
												</span>
											)}
										</h3>
										<p className='text-gray-600 text-sm leading-relaxed'>
											{type.description}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.div>
		</Fragment>
	)
}

export default CampaignType

const campaignTypes = [
	{
		icon: CiDiscount1,
		title: "Giảm giá sản phẩm",
		description:
			"Thiết lập giảm giá hàng ngày để tạo sức hút và thúc đẩy doanh số.",
	},
	{
		icon: CiShoppingTag,
		title: "Flash Sale của shop",
		description:
			"Tung ưu đãi có thời hạn để khuyến khích mua hàng nhanh chóng, bán hàng tồn dư thừa hoặc thu hút khách mới.",
	},
	{
		icon: CiGift,
		title: "Giảm giá hàng mới về",
		description:
			"Đặt giảm giá giới hạn cho sản phẩm mới để khuyến khích mọi người mua hàng.",
	},
	{
		icon: CiCreditCard1,
		title: "Voucher đánh giá",
		badge: "Mới",
		description:
			"Khuyến khích nhiều đánh giá chất lượng cao hơn bằng cách tặng voucher giảm giá",
	},
	{
		icon: CiGift,
		title: "Voucher",
		description:
			"Khuyến khích khách gia tăng tổng giá trị đơn hàng và thúc đẩy doanh số tổng thể.",
	},
	{
		icon: CiUser,
		title: "Voucher cho khách mới của người bán",
		description:
			"Voucher chỉ cho những khách chưa bao giờ mua từ cửa hàng của bạn.",
	},
	{
		icon: CiMail,
		title: "Voucher qua chat",
		description:
			"Gửi voucher độc quyền cho khách hàng qua tin nhắn chat.",
	},
	{
		icon: CiUser,
		title: "Voucher cho khách mua tiếp",
		description:
			"Voucher cho những khách đã mua nhiều lần từ cửa hàng của bạn.",
	},
	{
		icon: CiShoppingTag,
		title: "Mã khuyến mãi",
		description:
			"Chia sẻ mã trên TikTok và các nền tảng mạng xã hội khác để tăng lưu lượng truy cập và tỷ lệ chuyển đổi.",
	},
]
