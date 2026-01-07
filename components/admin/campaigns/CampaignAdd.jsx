"use client"
import { motion } from "framer-motion"
import { Fragment, useState } from "react"
import { ActionKeyUn } from "./CampaignAction"
import { CampTypeUn } from "./CampaignUtils"

const CampTypeGroups = [
	{
		key: "SALE",
		name: "Giảm giá",
		note:
			"Ưu đãi giảm giá sản phẩm giúp tăng sức cạnh tranh với đối thủ",
		CampTypes: [
			CampTypeUn.DAILY_SALE,
			CampTypeUn.FLASH_SALE,
			CampTypeUn.NEW_ARRIVAL_SALE,
		],
	},
	{
		key: "VOUCHER",
		name: "Coupon",
		note:
			"Trao tặng Coupon thúc đẩy khách hàng chi tiêu nhiều hơn",
		CampTypes: [
			CampTypeUn.PUBLIC_VOUCHER,
			CampTypeUn.CODE_VOUCHER,
			CampTypeUn.REVIEW_VOUCHER,
			CampTypeUn.NEW_ARRIVAL_SALE,
			CampTypeUn.LOYAL_CUSTOMER_VOUCHER,
			CampTypeUn.MESSAGE_VOUCHER,
		],
	},
]

const CampaignAdd = ({
	currentCamp,
	setCurrentCamp,
	setAsyncList,
}) => {
	const [CampaignType, setCampaignType] = useState(null)
	const onNextStep = (type) => setCampaignType(type)
	const onReturn = () => setCampaignType(null)

	return (
		<Fragment>
			{!CampaignType ? (
				/* Step 1: Choose a Campaign Type */
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className='flex flex-col gap-8'
				>
					{CampTypeGroups.map((group) => (
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
										onClick={() => onNextStep(type)}
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
			) : (
				/* Step 2: Render a Campaign Form */
				CampaignType.renderForm(
					CampaignType,
					ActionKeyUn.ADD,
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
