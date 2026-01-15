"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const StatusForm = ({
	setBenefitsData,
	benefit,
	manage,
}) => {
	const [alive, setAlive] = useState(true)

	useEffect(() => {
		setAlive(!!benefit.isAlive)
	}, [benefit.isAlive])

	const toggleStatus = () => {
		const nextStatus = !alive
		setAlive(nextStatus)
		benefit.isAlive = nextStatus
	}

	const handleDelete = (id, tempId) => {
		if (!id && !tempId) return

		setBenefitsData((prev) =>
			prev.filter((b) => {
				if (!id) return b.tempId !== tempId
				return b.id !== id
			})
		)
	}

	return (
		<td className='w-[120px] py-2 font-normal shrink-0 text-center'>
			{!manage ? (
				<span
					onClick={toggleStatus}
					className='p-2 rounded-xl text-white cursor-pointer select-none transition-all active:scale-95'
					style={{
						backgroundColor: alive ? "#06b6d4" : "#94a3b8",
						fontSize: "1.2rem",
						fontWeight: "600",
					}}
				>
					{alive ? "ALIVE" : "OFF"}
				</span>
			) : (
				<div className='flex flex-col gap-2 items-center'>
					{/* Nút Xóa */}
					<motion.span
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						className='text-[1.4rem] font-semibold text-red-500 cursor-pointer'
						onClick={() =>
							handleDelete(benefit.id, benefit.tempId)
						}
					>
						Xóa
					</motion.span>

					{/* Nút Kích hoạt / Hủy */}
					<motion.span
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						className={`text-[1.4rem] font-semibold cursor-pointer ${
							alive ? "text-red-500" : "text-blue-500"
						}`}
						onClick={toggleStatus}
					>
						{alive ? "Hủy kích hoạt" : "Kích hoạt"}
					</motion.span>
				</div>
			)}
		</td>
	)
}

export default StatusForm
