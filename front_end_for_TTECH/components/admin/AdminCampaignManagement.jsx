"use client"
import { handleDiscount } from "@/app/api/handleDiscount."
import { useEffect, useState } from "react"
import CampaignForm from "./campaignManagement/CampaignForm"
import CampaignList from "./campaignManagement/CampaignList"
import CampaignAction from "./campaignManagement/CampaignAction"

const AdminCampaignManagement = () => {
	const [discountList, setDiscountList] = useState([])
	const [mode, setMode] = useState("add")
	const [triggerGetData, setTriggerGetData] = useState(false)

	const [currentDiscountClicked, setCurrentDiscountClicked] =
		useState({})

	const getData = async () => {
		const response = await handleDiscount.getAllDiscount()
		if (Array.isArray(response)) setDiscountList(response)
	}

	useEffect(() => {
		getData()
	}, [triggerGetData])

	return (
		<div className='container mx-auto flex mt-10 gap-5'>
			<div className='flex-[4]'>
				<CampaignList
					discountList={discountList}
					setDiscountList={setDiscountList}
					currentDiscountClicked={currentDiscountClicked}
					setCurrentDiscountClicked={setCurrentDiscountClicked}
					setMode={setMode}
				/>
			</div>
			<div className='flex-[6] bg-white'>
				<CampaignAction />
				{/* <CampaignForm
					currentDiscountClicked={currentDiscountClicked}
					setCurrentDiscountClicked={setCurrentDiscountClicked}
					mode={mode}
					setMode={setMode}
					triggerGetData={triggerGetData}
					setTriggerGetData={setTriggerGetData}
				/> */}
			</div>
		</div>
	)
}

export default AdminCampaignManagement
