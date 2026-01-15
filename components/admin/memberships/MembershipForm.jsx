"use client"
import Notification from "@/components/uncategory/Notification"
import { adminCampaignApi } from "@/lib/api/campaign.api"
import { clientFetch } from "@/lib/http/fetch.client"
import {
	checkDateTimePair,
	checkSubmitForm,
} from "@/lib/utils/check"
import { formatNumberVN } from "@/lib/utils/number2"
import { AnimatePresence, motion } from "framer-motion"
import { Fragment, useEffect, useState } from "react"
import {
	DEFAULT_MEMBERSHIP,
	ModeEnum,
	pickMembership,
} from "./MembershipUtils"
import BenefitsForm from "./benefits/BenefitsForm"

const MembershipForm = ({
	mode,
	currentMBS,
	setAsyncList,
}) => {
	const [mbsData, setMBSData] = useState(DEFAULT_MEMBERSHIP)
	const [benefitsData, setBenefitsData] = useState([])
	const [feedback, setFeedback] = useState({})
	const [notification, setNotification] = useState("")
	const [isSubmitted, setSubmitted] = useState(false)

	// Fill form data
	useEffect(() => {
		if (mode === ModeEnum.ADD) {
			setMBSData(DEFAULT_MEMBERSHIP)
			setFeedback({})
			return
		}

		if (mode === ModeEnum.EDIT) {
			setMBSData(pickMembership(currentMBS))
			setFeedback({})
			return
		}
	}, [currentMBS])

	const handleChange = (key, value) => {
		setMBSData((prev) => ({ ...prev, [key]: value }))
		setFeedback((prev) => ({ ...prev, [key]: undefined }))
	}

	const handleSubmit = async () => {
		// Prepare data for ADD or EDIT
		const { isCheckID, api, notification } =
			mode === ModeEnum.ADD
				? {
						isCheckID: false,
						api: (body) => {
							return adminCampaignApi.couponApi.create(body)
						},
						notification: "Tạo mới coupon thành công",
				  }
				: {
						isCheckID: true,
						api: (body) => {
							return adminCampaignApi.couponApi.update(body)
						},
						notification: "Cập nhật coupon thành công",
				  }

		// Validate form
		const body = {
			...mbsData,
		}
		const isValid = checkSubmitForm(
			MembershipFormList,
			body,
			feedback,
			isCheckID
		)
		if (!isValid) {
			setFeedback({ ...feedback })
			return
		}
		const isValidDateTime = checkDateTimePair(
			body,
			"startTime",
			"endTime"
		)
		if (!isValidDateTime) {
			setFeedback({
				...feedback,
				endTime: "Thời gian kết thúc phải sau bắt đầu",
			})
			return
		}

		// Call API
		const { success, error } = await clientFetch(api(body))
		if (success) {
			setNotification(notification)
			setMBSData(DEFAULT_MEMBERSHIP)
			setAsyncList((prev) => !prev)
			setSubmitted((prev) => !prev)
		} else {
			alert(error)
		}
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
						{"Thông tin membership"}
					</h3>
				</div>

				{MembershipFormList.map((FF) => (
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
								{FF.preview(mbsData)}
							</div>
						</div>

						<input
							className={`outline-none w-full p-4 text-2xl font-medium border border-black/50 rounded-2xl ${
								FF.disabled && "text-black/50"
							}`}
							type={FF.type}
							disabled={FF.disabled}
							placeholder={FF.name}
							value={mbsData[FF.key]}
							onChange={(e) => {
								if (FF.normalize) {
									handleChange(FF.key, FF.normalize(e.target.value))
									return
								}
								handleChange(FF.key, e.target.value)
							}}
						/>
						{feedback[FF.key] && (
							<h2 className='text-red-500 text-[1.2rem]'>
								{feedback[FF.key]}
							</h2>
						)}
					</div>
				))}

				<div className='flex flex-col gap-6 mt-6'>
					<BenefitsForm
						mode={mode}
						benefitsData={benefitsData}
						setBenefitsData={setBenefitsData}
					/>
				</div>

				<button
					className='bg-blue-500 w-full p-4 mt-10 text-2xl font-semibold text-white rounded-2xl'
					onClick={() => handleSubmit()}
				>
					{mode === ModeEnum.ADD && "HOÀN TẤT THÊM"}
					{mode === ModeEnum.EDIT && "HOÀN TẤT SỬA"}
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

export default MembershipForm

const MembershipFormList = [
	{
		key: "id",
		name: "ID membership",
		type: "number",
		disabled: true,
		required: false,
		preview: (membershipData) => {
			return membershipData.id
				? `Cập nhật ID ${membershipData.id}`
				: "Thêm mới Membership"
		},
	},
	{
		key: "membershipCode",
		name: "Mã membership",
		type: "text",
		disabled: false,
		required: true,
		preview: (membershipData) => {
			return membershipData.membershipCode
				? `Mã hạng là ${membershipData.membershipCode}`
				: "Nhập mã hạng"
		},
		normalize: (value) => {
			return value
				.toUpperCase()
				.replace(/[^A-Z0-9.]/g, "")
				.slice(0, 9)
		},
	},
	{
		key: "minPoint",
		name: "Điểm tối thiểu",
		type: "number",
		disabled: false,
		required: true,
		preview: (membershipData) => {
			return membershipData.minPoint
				? `Thành viên hạng có từ ${formatNumberVN(
						membershipData.minPoint
				  )} điểm`
				: "Điểm tối thiểu là 0"
		},
	},
]
