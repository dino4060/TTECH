"use client"
import { adminCampaignApi as adminDataApi } from "@/lib/api/campaign.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const DeleteForm = ({
	currentMBS: currentData,
	setAsyncList,
}) => {
	const [dataID, setDataID] = useState("")
	const [isAlive, setIsAlive] = useState(undefined)

	useEffect(() => {
		setDataID(currentData.id)
		setIsAlive(
			typeof currentData.isAlive === "boolean"
				? currentData.isAlive
				: undefined
		)
	}, [currentData])

	const handleDelete = async (id) => {
		if (id === "") return
		const res = await clientFetch(adminDataApi.delete(id))
		if (res.success === false) {
			alert(res.error)
			return
		}

		setDataID("")
		setAsyncList((prev) => !prev)
	}

	const handleToggleStatus = async () => {
		if (!dataID) return
		const res = await clientFetch(
			adminDataApi.update({
				id: dataID,
				isAlive: !isAlive,
			})
		)
		if (res.success === false) {
			alert(res.error)
			return
		}

		setIsAlive(!isAlive)
		setAsyncList((prev) => !prev)
	}

	return (
		<div className='flex flex-col justify-center items-center gap-6 min-h-[200px]'>
			{/* Group 1: Toggle Status */}
			{isAlive !== undefined && (
				<div className='flex justify-center items-center gap-3'>
					<motion.input
						className={`border rounded-2xl outline-none w-[200px] h-[30px] px-4 text-[1.4rem] ${
							isAlive
								? "border-red-500 text-red-500"
								: "border-blue-500 text-blue-500"
						}`}
						required
						variants={{
							init: { width: 0 },
							animate: { width: 200 },
						}}
						initial='init'
						exit='init'
						animate='animate'
						placeholder='Nhập vào id để xóa'
						value={dataID}
						onChange={(e) => setDataID(e.target.value)}
					/>

					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className={`py-3 w-[100px] text-[1.4rem] font-[400] leading-6 rounded-xl border transition-colors ${
							isAlive
								? "border-red-500 text-red-500"
								: "border-blue-500 text-blue-500"
						}`}
						onClick={handleToggleStatus}
					>
						{isAlive ? "Hủy kích hoạt" : "Kích hoạt"}
					</motion.button>
				</div>
			)}

			{/* Group 2: Delete Form */}
			<div className='flex justify-center items-center gap-3'>
				<motion.input
					className='border border-red-500 rounded-2xl outline-none
          w-[200px] h-[30px] px-4 text-[1.4rem] text-red-500 placeholder-red-500'
					required
					variants={{
						init: { width: 0 },
						animate: { width: 200 },
					}}
					initial='init'
					exit='init'
					animate='animate'
					placeholder='Nhập vào id để xóa'
					value={dataID}
					onChange={(e) => setDataID(e.target.value)}
				/>

				<button
					className='py-3 w-[100px] text-[1.4rem] font-[400] leading-6 border
          text-red-500 border-red-500 rounded-xl'
					onClick={() => handleDelete(dataID)}
				>
					Xác nhận xóa
				</button>
			</div>
		</div>
	)
}

export default DeleteForm
