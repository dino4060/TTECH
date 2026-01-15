"use client"
import { motion } from "framer-motion"
import { Fragment, useEffect, useState } from "react"
import DeleteForm from "./delete/DeleteForm"
import MembershipForm from "./MembershipForm"
import { ModeEnum } from "./MembershipUtils"

const MembershipPanel = ({
	currentMBS,
	mode,
	setCurrentMBS,
	setAsyncList,
	setMode,
}) => {
	// useEffect(() => {
	// 	currentMBS.id && setMode(ModeEnum.EDIT)
	// }, [currentMBS])

	const hanlePanelChange = (mode) => {
		if (mode === ModeEnum.EDIT) return
		if (mode === ModeEnum.DELETE) return
		setMode(mode)
		setCurrentMBS({})
	}

	return (
		<Fragment>
			<div className='flex gap-2 justify-end p-1 bg-white'>
				{PanelRenderList.map((PR) => (
					<motion.div
						key={PR.key}
						className={`
							px-4 cursor-pointer py-2 border border-b-4 rounded-md text-xl font-bold
							border-blue-500 border-b-blue-500 flex-1 shrink-0 text-center uppercase
							${PR.key === mode ? "bg-blue-500 text-white" : "bg-white"}
						`}
						whileHover={{ scale: 1.1 }}
						onClick={() => hanlePanelChange(PR.key)}
					>
						{PR.name}
					</motion.div>
				))}
			</div>

			<div className='p-10 pt-8'>
				{PanelRenderList.find((a) => a.key === mode).render(
					currentMBS,
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
		render: (currentMBS, setAsyncList) => (
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
		render: (currentMBS, setAsyncList) => (
			<MembershipForm
				mode={ModeEnum.ADD}
				currentMBS={currentMBS}
				setAsyncList={setAsyncList}
			/>
		),
	},
	{
		key: ModeEnum.DELETE,
		name: "quản lý",
		render: (currentMBS, setAsyncList) => (
			<DeleteForm
				currentMBS={currentMBS}
				setAsyncList={setAsyncList}
			/>
		),
	},
	{
		key: ModeEnum.CONFIG,
		name: "cấu hình",
		render: (currentCamp, setAsyncList) => (
			<div>Cấu hình tham số hiệu lực Membership 6 tháng</div>
		),
	},
]
