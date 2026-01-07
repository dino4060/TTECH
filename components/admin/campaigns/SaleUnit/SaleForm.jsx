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
import { ActionKeyUn as ActionUn } from "../CampaignAction"
import SaleUnitList from "./SaleUnitList"

const SaleForm = ({
	CampType: SaleType,
	action,
	onReturn,
	currentCamp,
	setCurrentCamp,
	setAsyncList,
}) => {
	const [saleData, setSaleData] = useState({})
	const [saleUnits, setSaleUnits] = useState([])
	const [isAsyncUnits, setAsyncUnits] = useState(false)
	const [feedback, setFeedback] = useState({})
	const [notification, setNotification] = useState("")
	const cleanSaleData = {
		promotionType: SaleType.key,
		id: "",
		name: "",
		startTime: "",
		endTime: "",
		units: [],
	}

	// Turn add mode => Clean sale data
	useEffect(() => {
		if (action === ActionUn.ADD || !currentCamp?.id) {
			setSaleData(cleanSaleData)
			setSaleUnits([])
		} else {
			setSaleData(currentCamp)
			setSaleUnits(currentCamp.units)
		}
		setFeedback({})
	}, [currentCamp])

	const onChangeSale = (key, value) => {
		setSaleData((prev) => ({ ...prev, [key]: value }))
		setFeedback((prev) => ({ ...prev, [key]: null }))
	}

	const onSubmitSale = async () => {
		// Prepare data for ADD or EDIT
		const { id, isCheckID, api, notification } =
			action === ActionUn.ADD
				? {
						id: 0,
						isCheckID: false,
						api: (id, body) => {
							return adminCampaignApi.saleApi.create(body)
						},
						notification: "Tạo dữ liệu thành công",
				  }
				: {
						id: saleData.id,
						isCheckID: true,
						api: (id, body) => {
							return adminCampaignApi.saleApi.update(id, body)
						},
						notification: "Cập nhật dữ liệu thành công",
				  }

		// Validate form
		const body = { ...saleData, units: saleUnits }
		const isValid = checkSubmitForm(
			CampForm,
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
		const { success, error } = await clientFetch(
			api(id, body)
		)
		if (success) {
			setNotification(notification)
			setSaleData(cleanSaleData)
			setSaleUnits([])
			setAsyncUnits((prev) => ![prev])
			setAsyncList((prev) => !prev)
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
						{SaleType.name}
					</h3>

					{action === ActionUn.ADD && (
						<IoChevronBackOutline
							size={25}
							onClick={() => onReturn()}
						/>
					)}
				</div>

				{CampForm.map((FF) => (
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
							disabled={FF.disabled}
							placeholder={FF.name}
							value={saleData[FF.key]}
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

				<SaleUnitList
					action={action}
					saleUnits={saleUnits}
					setSaleUnits={setSaleUnits}
					isAsyncUnits={isAsyncUnits}
				/>

				<button
					className='bg-blue-500 w-full p-4 mt-4 text-2xl font-semibold text-white rounded-2xl'
					onClick={() => onSubmitSale()}
				>
					{action === ActionUn.ADD
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

export default SaleForm

const CampForm = [
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
