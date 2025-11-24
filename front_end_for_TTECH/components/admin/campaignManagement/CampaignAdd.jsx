"use client"
import { Fragment, useState } from "react"
import CampaignType from "./CampaignType"

const CampaignAdd = ({ currentCamp, setAsyncList }) => {
	const [CampType, setCampType] = useState(null)
	const onReturn = () => setCampType(null)
	const action = "ADD"
	return (
		<Fragment>
			{!CampType ? (
				<CampaignType setCurrentCampType={setCampType} />
			) : (
				CampType.renderForm(
					CampType,
					action,
					onReturn,
					currentCamp,
					setAsyncList
				)
			)}
		</Fragment>
	)
}

export default CampaignAdd
