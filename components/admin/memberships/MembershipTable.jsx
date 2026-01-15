"use client"
import { useIdContext } from "@/context/IdContext"
import { adminMembershipApi } from "@/lib/api/membership.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { formatNumberVN } from "@/lib/utils/number2"
import { motion } from "framer-motion"
import { Fragment, useEffect, useState } from "react"
import { IoCopyOutline } from "react-icons/io5"
import { ModeEnum } from "./MembershipUtils"

const MembershipTable = ({
	currentMBS,
	setCurrentMBS,
	asyncList,
	setMode,
}) => {
	const [mbsList, setMBSList] = useState([])
	const { onCopyId } = useIdContext()

	useEffect(() => {
		const getMBSList = async () => {
			const res = await clientFetch(adminMembershipApi.list())
			if (res.success === false) {
				return
			}
			setMBSList(res.data)
		}
		getMBSList()
	}, [asyncList])

	return (
		<motion.div
			initial='hidden'
			animate='visible'
			variants={TableVariant}
		>
			<table className='bg-white w-full border-spacing-1 border-separate table-auto text-xl relative'>
				<thead className='text-black uppercase sticky top-2'>
					<tr>
						{MembershipColumnList.map((col) => (
							<th
								key={col.header}
								className='px-4 py-2 flex-1 shrink-0 text-center bg-white
                  border border-b-4 border-blue-500 rounded-md'
							>
								{col.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{mbsList?.map((mbs) => (
						<motion.tr
							key={mbs.id}
							className='cursor-pointer'  
							variants={RowVariantEnum}
							initial='init'
							whileHover='hover'
							animate={
								mbs.id === currentMBS.id ? "clicked" : "init"
							}
							transition={{ type: "spring" }}
							onClick={() => {
								setCurrentMBS(mbs)
								setMode(ModeEnum.EDIT)
							}}
						>
							{MembershipColumnList.map((col) => {
								return col.key === "id" ? (
									<motion.td
										key={col.key}
										className='px-2 py-2 flex-1 text-center font-[400] shrink-0'
										whileHover={{ color: "rgb(239 68 68)" }}
										whileTap={{ scale: 1.5 }}
										onClick={(event) => {
											event.stopPropagation()
											onCopyId(mbs.id)
											setCurrentMBS(mbs)
											setMode(ModeEnum.DELETE)
										}}
									>
										{col.renderData(mbs)}
									</motion.td>
								) : (
									<td
										key={col.key}
										className='px-2 py-2 flex-1 text-center font-[400] shrink-0'
									>
										{col.renderData(mbs)}
									</td>
								)
							})}
						</motion.tr>
					))}
				</tbody>
			</table>
		</motion.div>
	)
}

export default MembershipTable

const RowVariantEnum = {
	init: {
		backgroundColor: "#f8fafc",
		padding: 0,
	},
	hover: {
		backgroundColor: "#cbd5e1",
		padding: "10px 0px",
	},
	clicked: {
		backgroundColor: "rgb(147 197 253)",
		padding: "10px 0px",
	},
}

const MembershipColumnList = [
	{
		key: "id",
		header: "ID",
		renderData: (mbs) => (
			<Fragment>
				<div className='flex justify-center items-center gap-1'>
					{mbs.id}
					<IoCopyOutline />
				</div>
			</Fragment>
		),
	},
	{
		key: "name",
		header: "Membership",
		renderData: (mbs) => (
			<Fragment>{mbs.membershipCode}</Fragment>
		),
	},
	{
		key: "name",
		header: "Điểm tối thiểu",
		renderData: (mbs) => (
			<Fragment>{formatNumberVN(mbs.minPoint)}</Fragment>
		),
	},
	{
		key: "status",
		header: "Trạng thái",
		renderData: (mbs) => (
			<Fragment>
				<span
					className='p-2 rounded-xl text-white'
					style={{
						backgroundColor: mbs.isAlive ? "#06b6d4" : "#94a3b8",
					}}
				>
					{mbs.isAlive ? "ALIVE" : "OFF"}
				</span>
			</Fragment>
		),
	},
]

const TableVariant = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			staggerChildren: 0.08,
		},
	},
}
