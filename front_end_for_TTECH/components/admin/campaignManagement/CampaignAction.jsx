"use client"
import { motion } from "framer-motion"
import { Fragment, useState } from "react"

const CampaignAction = ({}) => {
	const actions = [
		{
			key: "ANALYZE",
			name: "phân tích",
		},
		{
			key: "ADD",
			name: "thêm mới",
		},
		{
			key: "UPDATE",
			name: "cập nhật",
		},
		{
			key: "DELETE",
			name: "xóa",
		},
	]

	const [mode, setMode] = useState("ADD")

	return (
		<Fragment>
			<div className='flex gap-2 justify-end p-1'>
				{actions.map((action, index) => (
					<motion.div
						key={index}
						className={`
							px-4 cursor-pointer py-2 border border-b-4 rounded-md text-xl font-bold
							border-blue-500 border-b-blue-500 flex-1 shrink-0 text-center uppercase
							${action.key === mode ? "bg-blue-50" : "bg-white"}
						`}
						whileHover={{ scale: 1.1 }}
						onClick={() => setMode(action.key)}
					>
						{action.name}
					</motion.div>
				))}
			</div>
		</Fragment>
	)
}

export default CampaignAction
