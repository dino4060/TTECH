import { adminCampaignApi } from "@/lib/api/campaign.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { motion } from "framer-motion"
import { Fragment, useEffect, useState } from "react"
import {
	IoAlertCircleOutline,
	IoInformation,
} from "react-icons/io5"
import { ActionKeyUn as ActionKeyMap } from "./CampaignAction"
import {
	CampaignApiMap,
	CampTypeUn as CampaignTypeMap,
} from "./CampaignUtils"

const CampaignEdit = ({
	currentCamp: currentCampaign,
	setCurrentCamp: setCurrentCampaign,
	setAsyncList,
}) => {
	const [show, setShow] = useState(false)
	const [CampaignType, setCampaignType] = useState(null)
	const [fullCampaign, setFullCampaign] = useState(null)

	useEffect(() => {
		const campaignId = currentCampaign?.id
		const campaignTypeKey = currentCampaign?.promotionType
		if (!campaignId || !campaignTypeKey) return

		const CampaignType = CampaignTypeMap[campaignTypeKey]
		if (!CampaignType) {
			alert(`CampaignType ${CampaignType} is out of scope`)
			return
		}

		const CampaignApi = CampaignApiMap[CampaignType.key]
		if (!CampaignApi) {
			alert(`CampaignType ${CampaignApi} is out of scope`)
			return
		}

		const fetchFullCampaign = async (id) => {
			const res = await clientFetch(CampaignApi.get(id))
			if (res.success === false) alert(res.error)

			setFullCampaign(res.data)
			setCampaignType(CampaignType)
			setShow(true)
		}

		fetchFullCampaign(currentCampaign.id)
	}, [currentCampaign])

	return (
		<Fragment>
			{show === false ? (
				<NoCampaignEdit />
			) : (
				CampaignType.renderForm(
					CampaignType,
					ActionKeyMap.EDIT,
					null,
					fullCampaign,
					setCurrentCampaign,
					setAsyncList
				)
			)}
		</Fragment>
	)
}

export default CampaignEdit

const NoCampaignEdit = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-[200px] gap-6'>
			{1 === 1 ? (
				<motion.div
					variants={{
						init: { width: 0 },
						animate: { width: 250 },
					}}
					initial='init'
					exit='init'
					animate='animate'
					className='py-3 px-5 text-[1.4rem] font-[400] leading-6 text-red-500
              border border-red-500 rounded-xl whitespace-nowrap overflow-hidden
              flex justify-between items-center'
				>
					<span>Chọn chiến dịch để cập nhật</span>
					<IoInformation className='w-7 h-7' />
				</motion.div>
			) : (
				<div className='bg-gray-50 border-2 border-gray-300 rounded-lg p-8 max-w-xl'>
					<div className='flex items-center gap-4 mb-4'>
						<IoAlertCircleOutline className='w-12 h-12 text-gray-600' />
						<h2 className='text-2xl font-bold text-gray-800'>
							Chưa chọn chiến dịch khuyến mãi
						</h2>
					</div>
					<p className='text-gray-700 text-[1.4rem] leading-relaxed'>
						Vui lòng chọn một chiến dịch từ danh sách bên trái.
					</p>
				</div>
			)}
		</div>
	)
}
