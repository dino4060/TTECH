"use client"
import { Fragment, useState } from "react"
import CampaignType from "./CampaignType"

const CampaignAdd = ({}) => {
	const [step, setStep] = useState(1)

	return (
		<Fragment>
			{steps.find((s) => s.key === step).render()}
		</Fragment>
	)
}

export default CampaignAdd

const steps = [
	{
		key: 1,
		render: () => <CampaignType />,
	},
	{
		key: 2,
		render: () => <div>Form Giảm giá</div>,
	},
]
