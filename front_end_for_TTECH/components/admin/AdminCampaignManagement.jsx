"use client"
import { useState } from "react"
import CampaignAction from "./campaignManagement/CampaignAction"
import CampaignList from "./campaignManagement/CampaignList"

const AdminCampaignManagement = () => {
	const [isAsyncList, setAsyncList] = useState(false)
	const [currentCamp, setCurrentCamp] = useState({})

	return (
		<div className='container mx-auto flex mt-10 gap-5 bg-white'>
			<div className='flex-[4]'>
				<CampaignList
					currentCamp={currentCamp}
					setCurrentCamp={setCurrentCamp}
					isAsync={isAsyncList}
				/>
			</div>
			<div className='flex-[6] bg-white'>
				<CampaignAction
					currentCamp={currentCamp}
					setAsyncList={setAsyncList}
				/>
			</div>
		</div>
	)
}

export default AdminCampaignManagement
