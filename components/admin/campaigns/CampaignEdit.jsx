import {
	IoAlertCircleOutline,
	IoInformation,
	IoInformationCircleOutline,
} from "react-icons/io5"
import { ActionKeyUn as ActionUn } from "./CampaignAction"
import { CampTypeUn } from "./CampaignAdd"
import SaleForm from "./SaleUnit/SaleForm"
import { adminCampaignApi } from "@/lib/api/campaign.api"
import { useEffect, useState } from "react"
import { clientFetch } from "@/lib/http/fetch.client"
import { motion } from "framer-motion"

const CampaignEdit = ({
	currentCamp,
	setCurrentCamp,
	setAsyncList,
}) => {
	// Render form
	const [currentSale, setCurrentSale] = useState({})

	const fetchCurrentSale = async (id) => {
		const { success, data, error } = await clientFetch(
			adminCampaignApi.saleApi.get(id)
		)
		success ? setCurrentSale(data) : alert(error)
	}

	useEffect(() => {
		currentCamp?.id && fetchCurrentSale(currentCamp.id)
	}, [currentCamp])

	// promotionType là falsy => Choose a camp
	const campTypeKey = currentCamp?.promotionType

	if (!campTypeKey) {
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

	// promotionType is out of limit => error
	const campType = CampTypeUn[campTypeKey]

	if (!campType) {
		alert("Loại chiến dịch không được hỗ trợ.")
		return null
	}

	return (
		<SaleForm
			CampType={campType}
			action={ActionUn.EDIT}
			currentCamp={currentSale}
			setCurrentCamp={setCurrentCamp}
			setAsyncList={setAsyncList}
		/>
	)
}

export default CampaignEdit
