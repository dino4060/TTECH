"use client"
import { useIdContext } from "@/context/IdContext"
import { adminCampaignApi } from "@/lib/api/campaign.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const CampaignRemove = ({ setAsyncList }) => {
	const [campId, setCampId] = useState(null)
	const { id, onCopyId } = useIdContext()

	useEffect(() => {
		setCampId(id)
	}, [id])

	useEffect(() => {
		onCopyId("")
	}, [])

	const onRemoveCamp = async (campId) => {
		const { success, error } = await clientFetch(
			adminCampaignApi.saleApi.remove(campId)
		)
		success ? setAsyncList((prev) => !prev) : alert(error)
	}

	return (
		<div className='flex justify-center items-center gap-3 min-h-[200px]'>
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
				value={campId}
				onChange={(e) => setCampId(e.target.value)}
			/>

			<button
				className='py-3 px-5 text-[1.4rem] font-[400] leading-6 text-red-500
          border border-red-500 rounded-xl'
				onClick={() => onRemoveCamp(campId)}
			>
				Xác nhận xóa
			</button>
		</div>
	)
}

export default CampaignRemove
