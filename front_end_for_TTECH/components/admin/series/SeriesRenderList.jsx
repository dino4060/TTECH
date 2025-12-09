"use client"
import { motion } from "framer-motion"

const SeriesRenderList = ({
	seriesList,
	setCurrentSeries,
	currentSeries,
	setMode,
}) => {
	return (
		<table className='w-full border-spacing-1 border-separate table-auto text-xl bg-white relative'>
			<thead class=' text-black uppercase sticky top-2'>
				<tr>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Mã series
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Tên series
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Vị trí
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Thuộc ngành hàng
					</th>
				</tr>
			</thead>
			<tbody>
				{seriesList?.map((s) => (
					<motion.tr
						key={s.id}
						className='cursor-pointer'
						variants={{
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
						}}
						initial='init'
						whileHover='hover'
						animate={
							s.id === currentSeries.id ? "clicked" : "init"
						}
						transition={{ type: "spring" }}
						onClick={() => {
							setCurrentSeries({
								...s,
								categoryId: s.category?.id || "",
							})
							setMode("edit")
						}}
					>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{s.id}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{s.name}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{s.position}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{s.category?.name}
						</th>
					</motion.tr>
				))}
			</tbody>
		</table>
	)
}

export default SeriesRenderList
