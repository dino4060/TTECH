"use client"
import Notification from "@/components/uncategory/Notification"
import { adminCampaignApi } from "@/lib/api/campaign.api"
import { adminParamAPI } from "@/lib/api/param.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { checkSubmitForm } from "@/lib/utils/check"
import { convertPositiveNumOr } from "@/lib/utils/number2"
import { AnimatePresence, motion } from "framer-motion"
import { Fragment, useEffect, useState } from "react"

const DEFAULT = {
	validityMonths: 1,
}

const ConfigForm = ({}) => {
	const [configData, setConfigData] = useState(DEFAULT)
	const [feedback, setFeedback] = useState({})
	const [notification, setNotification] = useState("")

	useEffect(() => {
		const fetchData = async () => {
			const res = await clientFetch(
				adminParamAPI.membershipAPI.get()
			)
			if (!res.success) {
				return
			}
			setConfigData(res.data)
		}
		fetchData()
	}, [])

	const handleChange = (key, value) => {
		setConfigData((prev) => ({ ...prev, [key]: value }))
		setFeedback((prev) => ({ ...prev, [key]: undefined }))
	}

	const handleSubmit = async () => {
		const body = {
			...configData,
			validityMonths: configData.validityMonths || 1,
		}

		// Validate body
		const isValid = checkSubmitForm(
			ConfigFormList,
			body,
			feedback,
			false
		)
		if (!isValid) {
			setFeedback({ ...feedback })
			return
		}

		// Call API
		const res = await clientFetch(
			adminParamAPI.membershipAPI.patch(body)
		)
		if (!res.success) {
			alert(res.error)
			return
		}
		setNotification("Cập nhật cấu hình thành công")
	}

	return (
		<Fragment>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className='flex flex-col'
			>
				<div className='flex justify-between items-center mb-4'>
					<h3 className='text-[2.2rem] font-semibold'>
						Cấu hình membership
					</h3>
				</div>

				{ConfigFormList.map((FF) => (
					<div
						key={FF.key}
						className='mb-3 w-full flex flex-col gap-1'
					>
						<div className='flex justify-between items-center'>
							<h2 className='text-[1.4rem] mb-2'>
								{FF.name}
								{FF.required && (
									<span className='text-red-500'>*</span>
								)}
							</h2>

							<div className='text-[1.4rem] font-medium text-blue-500'>
								{FF.preview(configData)}
							</div>
						</div>

						<div className='relative flex items-center'>
							<input
								className={`outline-none w-full p-4 text-2xl font-medium border border-black/50 rounded-2xl ${
									FF.disabled ? "text-black/50" : ""
								} ${FF.unit ? "pr-28" : ""}`}
								type={FF.type}
								disabled={FF.disabled}
								placeholder={FF.name}
								value={configData[FF.key]}
								onChange={(e) => {
									if (FF.normalize) {
										handleChange(FF.key, FF.normalize(e.target.value))
										return
									}
									handleChange(FF.key, e.target.value)
								}}
							/>

							{FF.unit && (
								<span className='absolute right-5 text-[1.4rem] font-semibold text-black pointer-events-none'>
									{FF.unit}
								</span>
							)}
						</div>

						{feedback[FF.key] && (
							<h2 className='text-red-500 text-[1.2rem]'>
								{feedback[FF.key]}
							</h2>
						)}
					</div>
				))}

				<button
					className='bg-blue-500 w-full p-4 mt-10 text-2xl font-semibold text-white rounded-2xl'
					onClick={() => handleSubmit()}
				>
					{"HOÀN TẤT"}
				</button>
			</motion.div>

			<AnimatePresence>
				{notification && (
					<Notification
						notification={{
							text: notification,
							style: "success",
						}}
						setNotifications={setNotification}
					/>
				)}
			</AnimatePresence>
		</Fragment>
	)
}

export default ConfigForm

const ConfigFormList = [
	{
		key: "validityMonths",
		name: "Hiệu lực Membership",
		type: "number",
		unit: "tháng",
		disabled: false,
		required: false,
		preview: (data) => {
			return `Hiệu lực trong ${data.validityMonths || 1} tháng`
		},
		normalize: (value) => {
			return convertPositiveNumOr(value, "")
		},
	},
]
