"use client"
import { useIdContext } from "@/context/IdContext"
import { adminCampaignApi } from "@/lib/api/campaign.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const CampaignRemove = ({ setAsyncList }) => {
	const { id } = useIdContext()
	const [campaignId, setCampaignId] = useState("")

	useEffect(() => {
		setCampaignId(id)
	}, [id])

	const handleCampaignRemove = async (id) => {
		if (id === "") return

		const res = await clientFetch(adminCampaignApi.delete(id))
		if (res.success === false) alert(res.error)

		setCampaignId("")
		setAsyncList((prev) => !prev)
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
				value={campaignId}
				onChange={(e) => setCampaignId(e.target.value)}
			/>

			<button
				className='py-3 px-5 text-[1.4rem] font-[400] leading-6 text-red-500
          border border-red-500 rounded-xl'
				onClick={() => handleCampaignRemove(campaignId)}
			>
				Xác nhận xóa
			</button>
		</div>
	)
}

export default CampaignRemove
