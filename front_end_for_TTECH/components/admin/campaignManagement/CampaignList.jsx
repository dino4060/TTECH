"use client"
import { adminCampaignApi } from "@/lib/api/campaign.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { toDateTimeVN } from "@/lib/utils/number"
import { motion } from "framer-motion"
import { Fragment, useEffect, useState } from "react"

const CampaignList = ({
	isRefresh,
	currentCamp,
	setCurrentCamp,
}) => {
	const [campList, setCampList] = useState([])
	useEffect(() => {
		const getCampList = async () => {
			const { success, data } = await clientFetch(
				adminCampaignApi.list()
			)
			success && setCampList(data.items)
		}

		getCampList()
	}, [isRefresh])
	return (
		<motion.div>
			<table className='w-full border-spacing-1 border-separate table-auto text-xl relative'>
				<thead class=' text-black uppercase sticky top-2'>
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
							variants={TableRowVariant}
							initial='init'
							whileHover='hover'
							animate={
								c.id === currentCamp.id ? "clicked" : "init"
							}
							transition={{ type: "spring" }}
							onClick={() => setCurrentCamp(c)}
						>
							{CampaignTable.map((col) => (
								<td
									key={col.key}
									className='px-2 py-2 flex-1 text-center font-[400] shrink-0'
								>
									{col.renderData(c)}
								</td>
							))}
						</motion.tr>
					))}
				</tbody>
			</table>
		</motion.div>
	)
}

export default CampaignList

const TableRowVariant = {
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
		renderData: (camp) => <Fragment>{camp.id}</Fragment>,
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
					style={{ backgroundColor: StatusColor[camp.status] }}
				>
					{camp.status}
				</span>
			</Fragment>
		),
	},
]

const StatusColor = {
	UPCOMING: "#8b5cf6",
	ONGOING: "#06b6d4", // "#10b981"
	ENDED: "#94a3b8", // "#ef4444"
	LIMITED: "#f59e0b", // "#6b7280"
	SECONDARY: "#f59e0b",
	DEACTIVATED: "#94a3b8",
}
