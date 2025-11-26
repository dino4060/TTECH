"use client"
import { motion } from "framer-motion"
import { Fragment, useEffect, useState } from "react"
import CampaignAdd from "./CampaignAdd"
import CampaignEdit from "./CampaignEdit"
import CampaignRemove from "./CampaignRemove"

const CampaignAction = ({
	currentCamp,
	setCurrentCamp,
	setAsyncList,
}) => {
	const [action, setAction] = useState(ActionKeyUn.ADD)

	useEffect(() => {
		currentCamp?.id && setAction(ActionKeyUn.EDIT)
	}, [currentCamp])

	return (
		<Fragment>
			<div className='flex gap-2 justify-end p-1 bg-white'>
				{Actions.map((Action) => (
					<motion.div
						key={Action.key}
						className={`
							px-4 cursor-pointer py-2 border border-b-4 rounded-md text-xl font-bold
							border-pink-500 border-b-pink-500 flex-1 shrink-0 text-center uppercase
							${Action.key === action ? "bg-pink-100" : "bg-white"}
						`}
						whileHover={{ scale: 1.1 }}
						onClick={() => setAction(Action.key)}
					>
						{Action.name}
					</motion.div>
				))}
			</div>

			<div className='p-10 pt-8'>
				{Actions.find((a) => a.key === action).render(
					currentCamp,
					setCurrentCamp,
					setAsyncList
				)}
			</div>
		</Fragment>
	)
}

export default CampaignAction

export const ActionKeyUn = {
	ADD: "ADD",
	EDIT: "EDIT",
	REMOVE: "REMOVE",
	ANALYZE: "ANALYZE",
}

const Actions = [
	{
		key: ActionKeyUn.ANALYZE,
		name: "phân tích",
		render: () => <div>Phân tích</div>,
	},
	{
		key: ActionKeyUn.ADD,
		name: "thêm mới",
		render: (currentCamp, setCurrentCamp, setAsyncList) => (
			<CampaignAdd
				currentCamp={currentCamp}
				setCurrentCamp={setCurrentCamp}
				setAsyncList={setAsyncList}
			/>
		),
	},
	{
		key: ActionKeyUn.EDIT,
		name: "cập nhật",
		render: (currentCamp, setCurrentCamp, setAsyncList) => (
			<CampaignEdit
				currentCamp={currentCamp}
				setCurrentCamp={setCurrentCamp}
				setAsyncList={setAsyncList}
			/>
		),
	},
	{
		key: ActionKeyUn.REMOVE,
		name: "xóa",
		render: (currentCamp, setCurrentCamp, setAsyncList) => (
			<CampaignRemove />
		),
	},
]
