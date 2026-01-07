"use client"
import { motion } from "framer-motion"
import { Fragment, useState } from "react"
import {
	ActionKeyMap,
	CampaignTypeMap,
} from "./CampaignUtils"

const CampaignAdd = ({
	currentCamp,
	setCurrentCamp,
	setAsyncList,
}) => {
	const [CampaignType, setCampaignType] = useState(null)
	const onReturn = () => setCampaignType(null)

	return (
		<Fragment>
			{!CampaignType ? (
				<NoCampaignAdd setCampaignType={setCampaignType} />
			) : (
				CampaignType.renderForm(
					CampaignType,
					ActionKeyMap.ADD,
					onReturn,
					currentCamp,
					setCurrentCamp,
					setAsyncList
				)
			)}
		</Fragment>
	)
}

export default CampaignAdd

const CampaignGroupList = [
	{
		key: "SALE",
		name: "Giảm giá",
		note:
			"Giảm giá sản phẩm giúp tăng sức cạnh tranh với đối thủ",
		CampTypes: [
			CampaignTypeMap.DAILY_SALE,
			CampaignTypeMap.FLASH_SALE,
			CampaignTypeMap.NEW_ARRIVAL_SALE,
		],
	},
	{
		key: "VOUCHER",
		name: "Coupon",
		note:
			"Trao tặng Coupon thúc đẩy khách hàng chi tiêu nhiều hơn",
		CampTypes: [
			CampaignTypeMap.PUBLIC_VOUCHER,
			CampaignTypeMap.CODE_VOUCHER,
			// CampaignTypeMap.REVIEW_VOUCHER,
			// CampaignTypeMap.NEW_CUSTOMER_VOUCHER,
			// CampaignTypeMap.LOYAL_CUSTOMER_VOUCHER,
			// CampaignTypeMap.MESSAGE_VOUCHER,
		],
	},
]

const NoCampaignAdd = ({ setCampaignType }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className='flex flex-col gap-8'
		>
			{CampaignGroupList.map((group) => (
				<div key={group.key}>
					<h3 className='text-[2.2rem] font-bold'>
						{group.name}
					</h3>
					<p className='text-xl text-gray-600 mb-6'>
						{group.note}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{group.CampTypes.map((type) => (
							<motion.div
								key={type.key}
								className='p-6 border border-gray-300 rounded-lg bg-white hover:border-pink-500
                    hover:shadow-md transition-all cursor-pointer'
								whileHover={{ scale: 1.02 }}
								onClick={() => setCampaignType(type)}
							>
								<div className='flex items-center gap-4'>
									<div className='p-3 bg-pink-100 rounded-lg'>
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
	)
}
