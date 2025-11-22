"use client"
import React, { Fragment, useEffect, useState } from "react"
import CampaignType from "./CampaignType"

const CampaignAdd = ({}) => {
	const [RenderStep2, setRenderStep2] = useState(null)

	return (
		<Fragment>
			{!RenderStep2 ? (
				<CampaignType setRenderStep2={setRenderStep2} />
			) : (
				<RenderStep2 />
			)}
		</Fragment>
	)
}

export default CampaignAdd
