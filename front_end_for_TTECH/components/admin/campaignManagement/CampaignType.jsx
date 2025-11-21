"use client"
import { motion } from "framer-motion"
import {
	CirclePercentIcon,
	MessagesSquareIcon,
	PackagePlusIcon,
	PencilLineIcon,
	TagIcon,
	TicketIcon,
	UserRoundCheckIcon,
	UserRoundPlusIcon,
	ZapIcon,
} from "lucide-react"
import { Fragment } from "react"

const CampaignType = ({}) => {
	return (
		<Fragment>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className='flex flex-col gap-8'
			>
				{campaignTypeGroup.map(({ key, name, note, types }) => (
					<div key={key}>
						<h3 className='text-[2.2rem] font-bold'>{name}</h3>
						<p className='text-xl text-gray-600 mb-6'>{note}</p>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
							{types.map((type) => (
								<motion.div
									key={type.key}
									className='p-6 border border-gray-300 rounded-lg bg-white hover:border-pink-500 hover:shadow-md transition-all cursor-pointer'
									whileHover={{ scale: 1.02 }}
								>
									<div className='flex items-center gap-4'>
										<div className='p-3 bg-pink-50 rounded-lg'>
											<type.icon className='w-8 h-8 text-pink-500' />
										</div>
										<div className='flex-1 min-w-0'>
											<h3 className='text-2xl font-semibold flex items-center gap-2'>
												{type.name}
											</h3>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				))}
			</motion.div>
		</Fragment>
	)
}

export default CampaignType

const campaignTypeGroup = [
	{
		key: "SALE",
		name: "Giảm giá",
		note:
			"Ưu đãi giảm giá sản phẩm giúp tăng sức cạnh tranh với đối thủ",
		types: [
			{
				key: "DAILY_SALE",
				name: "Giảm giá hằng ngày",
				icon: CirclePercentIcon,
			},
			{
				key: "FLASH_SALE",
				name: "Flash Sale",
				icon: ZapIcon,
			},
			{
				key: "NEW_ARRIVAL_SALE",
				name: "Giảm giá hàng mới về",
				icon: PackagePlusIcon,
			},
		],
	},
	{
		key: "VOUCHER",
		name: "Voucher",
		note:
			"Trao tặng voucher thúc đẩy khách hàng chi tiêu nhiều hơn",
		types: [
			{
				key: "PUBLIC_VOUCHER",
				name: "Voucher đơn hàng",
				icon: TicketIcon,
			},
			{
				key: "CODE_VOUCHER",
				name: "Voucher mã dành riêng",
				icon: TagIcon,
			},
			{
				key: "REVIEW_VOUCHER",
				name: "Voucher đánh giá",
				icon: PencilLineIcon,
			},
			{
				key: "NEW_CUSTOMER_VOUCHER",
				name: "Voucher khách mới",
				icon: UserRoundPlusIcon,
			},
			{
				key: "LOYAL_CUSTOMER_VOUCHER",
				name: "Voucher khách quen",
				icon: UserRoundCheckIcon,
			},
			{
				key: "MESSAGE_VOUCHER",
				name: "Voucher tin nhắn",
				icon: MessagesSquareIcon,
			},
		],
	},
]
