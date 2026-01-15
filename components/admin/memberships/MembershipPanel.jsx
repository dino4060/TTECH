"use client"
import { motion } from "framer-motion"
import { Fragment, useEffect, useState } from "react"
import CampaignAdd from "./FormAdd"
import CampaignEdit from "./FormEdit"
import CampaignRemove from "./FormDelete"
import { ModeEnum } from "./MembershipUtils"
import MembershipForm from "./MembershipForm"

const MembershipPanel = ({
	currentMBS,
	setCurrentMBS,
	setAsyncList,
}) => {
	const [mode, setMode] = useState(ModeEnum.ADD)

	useEffect(() => {
		currentMBS?.id && setMode(ModeEnum.EDIT)
	}, [currentMBS])

	useEffect(() => {
		mode !== ModeEnum.EDIT && setCurrentMBS({})
	}, [mode])

	return (
		<Fragment>
			<div className='flex gap-2 justify-end p-1 bg-white'>
				{PanelRenderList.map((Action) => (
					<motion.div
						key={Action.key}
						className={`
							px-4 cursor-pointer py-2 border border-b-4 rounded-md text-xl font-bold
							border-pink-500 border-b-pink-500 flex-1 shrink-0 text-center uppercase
							${Action.key === mode ? "bg-pink-100" : "bg-white"}
						`}
						whileHover={{ scale: 1.1 }}
						onClick={() => setMode(Action.key)}
					>
						{Action.name}
					</motion.div>
				))}
			</div>

			<div className='p-10 pt-8'>
				{PanelRenderList.find((a) => a.key === mode).render(
					currentMBS,
					setCurrentMBS,
					setAsyncList
				)}
			</div>
		</Fragment>
	)
}

export default MembershipPanel

const PanelRenderList = [
	{
		key: ModeEnum.ADD,
		name: "thêm mới",
		render: (currentMBS, setCurrentCamp, setAsyncList) => (
			<MembershipForm
				mode={ModeEnum.ADD}
				currentMBS={currentMBS}
				setAsyncList={setAsyncList}
			/>
		),
	},
	{
		key: ModeEnum.EDIT,
		name: "chỉnh sửa",
		render: (currentCamp, setCurrentCamp, setAsyncList) => (
			<CampaignEdit
				currentCamp={currentCamp}
				setCurrentCamp={setCurrentCamp}
				setAsyncList={setAsyncList}
			/>
		),
	},
	{
		key: ModeEnum.DELETE,
		name: "loại bỏ",
		render: (currentCamp, setCurrentCamp, setAsyncList) => (
			<CampaignRemove setAsyncList={setAsyncList} />
		),
	},
	{
		key: ModeEnum.CONFIG,
		name: "cấu hình",
		render: (currentCamp, setCurrentCamp, setAsyncList) => (
			<div>Cấu hình tham số hiệu lực Membership 6 tháng</div>
		),
	},
]
