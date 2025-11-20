"use client"
import { motion } from "framer-motion"
import { Fragment, useState } from "react"
import {
	CiDiscount1,
	CiGift,
	CiUser,
	CiCreditCard1,
	CiShoppingTag,
	CiMail,
} from "react-icons/ci"
import CampaignAdd from "./CampaignAdd"

const CampaignAction = ({}) => {
	const [action, setAction] = useState("ADD")

	return (
		<Fragment>
			<div className='flex gap-2 justify-end p-1'>
				{actions.map((action, index) => (
					<motion.div
						key={index}
						className={`
							px-4 cursor-pointer py-2 border border-b-4 rounded-md text-xl font-bold
							border-blue-500 border-b-blue-500 flex-1 shrink-0 text-center uppercase
							${action.key === action ? "bg-blue-50" : "bg-white"}
						`}
						whileHover={{ scale: 1.1 }}
						onClick={() => setAction(action.key)}
					>
						{action.name}
					</motion.div>
				))}
			</div>

			<div className='p-10'>
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
