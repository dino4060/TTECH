"use client"
import Notification from "@/components/uncategory/Notification"
import { adminCampaignApi } from "@/lib/api/campaign.api"
import { clientFetch } from "@/lib/http/fetch.client"
import {
	checkDateTimePair,
	checkSubmitForm,
} from "@/lib/utils/check"
import { AnimatePresence, motion } from "framer-motion"
import { Fragment, useEffect, useState } from "react"
import { IoChevronBackOutline } from "react-icons/io5"
import CouponConfigForm from "./CouponConfigForm"
import CouponUnitList from "./CouponUnitList"
import {
	ActionKeyMap,
	DEFAULT_CAMPAIGN,
	pickCampaign,
	DEFAULT_COUPON_CONFIG,
	pickCouponConfig,
	DEFAULT_COUPON_PRODUCTS,
	pickCouponProducts,
} from "../CampaignUtils"

const CouponForm = ({
	CampType: CouponType,
	action,
	onReturn,
	currentCamp,
	setCurrentCamp,
	setAsyncList,
}) => {
	const [couponData, setCouponData] = useState(
		DEFAULT_CAMPAIGN(CouponType.key)
	)
	const [couponConfig, setCouponConfig] = useState(
		DEFAULT_COUPON_CONFIG
	)
	const [productsConfig, setProductsConfig] = useState(
		DEFAULT_COUPON_PRODUCTS
	)
	const [feedback, setFeedback] = useState({})
	const [notification, setNotification] = useState("")
	const [isSubmitted, setSubmitted] = useState(false)

	// Turn add mode => Clean sale data
	useEffect(() => {
		if (action === ActionKeyMap.ADD || !currentCamp?.id) {
			setCouponData(DEFAULT_CAMPAIGN(CouponType.key))
			setCouponConfig(DEFAULT_COUPON_CONFIG)
			setProductsConfig(DEFAULT_COUPON_PRODUCTS)
		} else {
			setCouponData(pickCampaign(currentCamp))
			setCouponConfig(pickCouponConfig(currentCamp))
			setProductsConfig(pickCouponProducts(currentCamp))
		}
		setFeedback({})
	}, [currentCamp])

	const onChangeSale = (key, value) => {
		setCouponData((prev) => ({ ...prev, [key]: value }))
		setFeedback((prev) => ({ ...prev, [key]: null }))
	}

	const onSubmitCoupon = async () => {
		// Prepare data for ADD or EDIT
		const { isCheckID, api, notification } =
			action === ActionKeyMap.ADD
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
			...couponData,
			...couponConfig,
			...productsConfig,
			discountValue: couponConfig.discountValue || 1,
		}
		const isValid = checkSubmitForm(
			CampaignForm,
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
			setCouponData(DEFAULT_CAMPAIGN(CouponType.key))
			setCouponConfig(DEFAULT_COUPON_CONFIG)
			setProductsConfig(DEFAULT_COUPON_PRODUCTS)
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
						{CouponType.name}
					</h3>

					{action === ActionKeyMap.ADD && (
						<IoChevronBackOutline
							size={25}
							onClick={() => onReturn()}
							className='hover:text-blue-500'
						/>
					)}
				</div>

				{CampaignForm.map((FF) => (
					<div
						key={FF.key}
						className='mb-3 w-full flex flex-col gap-1'
					>
						<h2 className='text-[1.4rem] flex gap-1'>
							{FF.name}
							{FF.required && (
								<span className='text-red-500'>*</span>
							)}
						</h2>
						<input
							className={`outline-none w-full p-4 text-2xl font-medium border border-black/50 rounded-2xl ${
								FF.disabled && "text-black/50"
							}`}
							type={FF.type}
							{...(FF.type === "datetime-local"
								? { step: "3600" }
								: {})}
							disabled={FF.disabled}
							placeholder={FF.name}
							value={couponData[FF.key]}
							onChange={(e) =>
								onChangeSale(FF.key, e.target.value)
							}
						/>
						{feedback[FF.key] && (
							<h2 className='text-red-500 text-[1.4rem]'>
								{feedback[FF.key]}
							</h2>
						)}
					</div>
				))}

				<div className='flex flex-col gap-6 mt-6'>
					<CouponConfigForm
						couponConfig={couponConfig}
						setCouponConfig={setCouponConfig}
					/>

					<CouponUnitList
						productsConfig={productsConfig}
						setProductsConfig={setProductsConfig}
						isSubmitted={isSubmitted}
					/>
				</div>

				<button
					className='bg-blue-500 w-full p-4 mt-4 text-2xl font-semibold text-white rounded-2xl'
					onClick={() => onSubmitCoupon()}
				>
					{action === ActionKeyMap.ADD
						? "HOÀN TẤT THÊM"
						: "HOÀN TẤT SỬA"}
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

export default CouponForm

const CampaignForm = [
	{
		key: "id",
		name: "ID chiến dịch khuyến mãi",
		type: "number",
		disabled: true,
		required: false,
	},
	{
		key: "name",
		name: "Tên chiến dịch khuyến mãi",
		type: "text",
		disabled: false,
		required: true,
	},
	{
		key: "startTime",
		name: "Thời gian bắt đầu",
		type: "datetime-local",
		disabled: false,
		required: true,
	},
	{
		key: "endTime",
		name: "Thời gian kết thúc",
		type: "datetime-local",
		disabled: false,
		required: true,
	},
]
