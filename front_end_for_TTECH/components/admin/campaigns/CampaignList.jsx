"use client"
import { useIdContext } from "@/context/IdContext"
import { adminCampaignApi } from "@/lib/api/campaign.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { toDateTimeVN } from "@/lib/utils/number"
import { motion } from "framer-motion"
import { Fragment, useEffect, useState } from "react"
import { IoCopyOutline } from "react-icons/io5"

const CampaignList = ({
	currentCamp,
	setCurrentCamp,
	isAsyncList,
}) => {
	const [campList, setCampList] = useState([])
	const { onCopyId } = useIdContext()

	useEffect(() => {
		const getCampList = async () => {
			const { success, data, error } = await clientFetch(
				adminCampaignApi.list()
			)
			success ? setCampList(data.items) : alert(error)
		}

		getCampList()
	}, [isAsyncList])
	return (
		<motion.div
			initial='hidden'
			animate='visible'
			variants={TableVariantUn}
		>
			<table className='bg-white w-full border-spacing-1 border-separate table-auto text-xl relative'>
				<thead className='text-black uppercase sticky top-2'>
					<tr>
						{CampaignTable.map((col) => (
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
					{campList?.map((c) => (
						<motion.tr
							key={c.id}
							className='cursor-pointer'
							variants={RowVariantUn}
							initial='init'
							whileHover='hover'
							animate={
								c.id === currentCamp.id ? "clicked" : "init"
							}
							transition={{ type: "spring" }}
							onClick={() => setCurrentCamp(c)}
						>
							{CampaignTable.map((col) => {
								return col.key === "id" ? (
									<motion.td
										key={col.key}
										className='px-2 py-2 flex-1 text-center font-[400] shrink-0'
										whileHover={{ color: "rgb(59 130 246)" }}
										whileTap={{ scale: 1.5 }}
										onClick={(event) => {
											event.stopPropagation()
											onCopyId(c.id)
										}}
									>
										{col.renderData(c)}
									</motion.td>
								) : (
									<td
										key={col.key}
										className='px-2 py-2 flex-1 text-center font-[400] shrink-0'
									>
										{col.renderData(c)}
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

export default CampaignList

const RowVariantUn = {
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

const CampaignTable = [
	{
		key: "id",
		header: "Id",
		renderData: (camp) => (
			<Fragment>
				<div className='flex justify-center items-center gap-1'>
					{camp.id}
					<IoCopyOutline />
				</div>
			</Fragment>
		),
	},
	{
		key: "name",
		header: "Tên khuyến mãi",
		renderData: (camp) => <Fragment>{camp.name}</Fragment>,
	},
	{
		key: "datetime",
		header: "Thời gian",
		renderData: (camp) => (
			<Fragment>
				<div>{toDateTimeVN(camp.startTime)}</div>
				<div>{toDateTimeVN(camp.endTime)}</div>
			</Fragment>
		),
	},
	{
		key: "status",
		header: "Trạng thái",
		renderData: (camp) => (
			<Fragment>
				<span
					className='p-2 rounded-xl text-white'
					style={{ backgroundColor: StatusColorUn[camp.status] }}
				>
					{camp.status}
				</span>
			</Fragment>
		),
	},
]

const StatusColorUn = {
	UPCOMING: "#8b5cf6",
	ONGOING: "#06b6d4", // "#10b981"
	ENDED: "#94a3b8", // "#ef4444"
	LIMITED: "#f59e0b", // "#6b7280"
	SECONDARY: "#f59e0b",
	DEACTIVATED: "#94a3b8",
}

const TableVariantUn = {
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
