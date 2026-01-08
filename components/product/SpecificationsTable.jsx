import { motion } from "framer-motion"
import { Fragment, useEffect, useState } from "react"

const SpecificationsTable = ({ specifications }) => {
	// Nhóm data theo group
	const [groups, setGroups] = useState([])

	const [groupNames, setGroupNames] = useState([])

	const [activeGroup, setActiveGroup] = useState("")

	useEffect(() => {
		if (!specifications) return

		const groups = specifications.reduce((acc, spec) => {
			const groupName = spec.group || "Chưa phân nhóm"
			if (!acc[groupName]) acc[groupName] = []
			acc[groupName].push(spec)
			return acc
		}, {})

		const groupNames = Object.keys(groups)

		setGroups(groups)

		setGroupNames(groupNames)

		setActiveGroup(groupNames[0] || "")
	}, [specifications])

	return (
		<Fragment>
			{specifications.length === 0 ? null : (
				<div className='my-16 border-t py-8'>
					<h3 className='text-[2.2rem] font-semibold mb-8 flex items-center gap-3'>
						<span className='w-2 h-10 bg-blue-500 rounded-full'></span>
						Thông số kỹ thuật
					</h3>

					{/* Group Tabs */}
					<div className='flex gap-8 overflow-x-auto no-scrollbar border-b border-black/5'>
						{groupNames.map((name) => (
							<button
								key={name}
								onClick={() => setActiveGroup(name)}
								className={`pb-4 text-[1.6rem] font-medium transition-all relative whitespace-nowrap ${
									activeGroup === name
										? "text-blue-500"
										: "text-black/40 hover:text-black/60"
								}`}
							>
								{name}
								{activeGroup === name && (
									<motion.div
										layoutId='activeTab'
										className='absolute bottom-0 left-0 right-0 h-[3px] bg-blue-500 rounded-t-full'
									/>
								)}
							</button>
						))}
					</div>

					{/* Table Content */}
					<div className='mt-6 rounded-lg overflow-hidden border border-black/5'>
						<table className='w-full border-collapse'>
							<tbody>
								{groups[activeGroup]?.map((spec, index) => (
									<tr
										key={index}
										className='group transition-colors duration-300 hover:bg-slate-100/80'
									>
										<td className='py-5 px-8 text-[1.5rem] text-black/50 w-1/3 border-b border-black/[0.03] group-hover:text-blue-600 transition-colors'>
											{spec.name}
										</td>
										<td className='py-5 px-8 text-[1.5rem] font-medium text-black/80 border-b border-black/[0.03] group-hover:text-black transition-colors'>
											{spec.value}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</Fragment>
	)
}

export default SpecificationsTable
