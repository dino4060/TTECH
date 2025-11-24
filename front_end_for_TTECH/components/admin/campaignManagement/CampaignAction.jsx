"use client"
import { motion } from "framer-motion"
import { Fragment, useState } from "react"
import CampaignAdd from "./CampaignAdd"

const CampaignAction = ({}) => {
	const [action, setAction] = useState("ADD")

	return (
		<Fragment>
			<div className='flex gap-2 justify-end p-1 '>
				{actions.map((action) => (
					<motion.div
						key={action.key}
						className={`
							px-4 cursor-pointer py-2 border border-b-4 rounded-md text-xl font-bold
							border-pink-500 border-b-pink-500 flex-1 shrink-0 text-center uppercase
							${action.key === action ? "bg-pink-100" : "bg-white"}
						`}
						whileHover={{ scale: 1.1 }}
						onClick={() => setAction(action.key)}
					>
						{action.name}
					</motion.div>
				))}
			</div>

			<div className='p-10 '>
				{actions.find((a) => a.key === action).render()}
			</div>
		</Fragment>
	)
}

export default CampaignAction

const actions = [
	{
		key: "ANALYZE",
		name: "phân tích",
		render: () => <div>Phân tích</div>,
	},
	{
		key: "ADD",
		name: "thêm mới",
		render: () => <CampaignAdd />,
	},
	{
		key: "UPDATE",
		name: "cập nhật",
		render: () => <div>Cập nhật</div>,
	},
	{
		key: "DELETE",
		name: "xóa",
		render: () => <div>Xóa</div>,
	},
]
