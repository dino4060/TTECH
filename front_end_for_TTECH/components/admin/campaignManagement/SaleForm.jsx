import Notification from "@/components/uncategory/Notification"
import { adminCampaignApi } from "@/lib/api/campaign.api"
import { clientFetch } from "@/lib/http/fetch.client"
import {
	checkDateTimePair,
	checkSubmitForm,
} from "@/lib/utils/check"
import { AnimatePresence, motion } from "framer-motion"
import { Fragment, useEffect, useState } from "react"
import { CiLogout } from "react-icons/ci"
import { ActionKeyUn as ActionUn } from "./CampaignAction"
import LimitCell from "./SaleUnit/LimitCell"
import PriceCell from "./SaleUnit/PriceCell"
import ProductOptions from "./ProductOptions"

const SaleForm = ({
	CampType: SaleType,
	action,
	onReturn,
	currentCamp: saleData,
	setCurrentCamp: setSaleData,
	setAsyncList,
}) => {
	const [show, setShow] = useState(false)
	const [remove, setRemove] = useState(false)
	const [saleUnits, setSaleUnits] = useState([])
	const [newProducts, setNewProducts] = useState(new Set())
	const [appliedProductIds, setAppliedProductIds] = useState(
		new Set()
	)
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
		action === ActionUn.ADD && setSaleData(cleanSaleData)
	}, [action])

	// Set new sale => Clean feedback
	useEffect(() => {
		setFeedback({})
	}, [saleData])

	const onChangeSale = (key, value) => {
		setSaleData((prev) => ({ ...prev, [key]: value }))
		setFeedback((prev) => ({ ...prev, [key]: null }))
	}

	const onSubmitSale = async () => {
		// Prepare data for ADD or EDIT
		const { id, idModelName, api, notification } =
			action === ActionUn.ADD
				? {
						id: 0,
						idModelName: "",
						api: (id, body) => {
							return adminCampaignApi.saleApi.create(body)
						},
						notification: "Tạo dữ liệu thành công",
				  }
				: {
						id: saleData.id,
						idModelName: "Chiến dịch khuyến mãi",
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
			idModelName
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
			setAsyncList((prev) => !prev)
		} else {
			alert(error)
		}
	}

	// === Sale Units ===

	// Choose new products =>  Add sale units
	useEffect(() => {
		if (newProducts.size == 0) return

		setSaleUnits((prev) => [
			...Array.from(newProducts).map((p) => ({
				id: 0,
				product: p,
				isLive: true,
				dealPrice: 0,
				dealPercent: 0,
				totalLimit: -1,
				usedCount: 0,
				levelType: "PRODUCT",
			})),
			...prev,
		])

		setAppliedProductIds(
			(prev) =>
				new Set([
					...Array.from(newProducts).map((p) => p.id),
					...prev,
				])
		)

		setNewProducts(new Set())
	}, [newProducts])

	const onRemoveSaleUnit = (productId) => {
		setSaleUnits(
			saleUnits.filter((u) => u.product.id !== productId)
		)
		appliedProductIds.delete(productId)
		setAppliedProductIds(new Set(appliedProductIds))
	}

	const onEditSaleUnit = (saleUnit) => {
		setSaleUnits(
			saleUnits.map((u) => {
				if (u.product.id !== saleUnit.product.id) return u
				else return saleUnit
			})
		)
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

					{action === ActionUn.dealPercent && (
						<CiLogout size={18} onClick={() => onReturn()} />
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

				<div className='flex justify-between items-center mb-4 mt-8'>
					<h3 className='text-[2.2rem] font-semibold '>
						{saleUnits.length > 0
							? "Danh sách sản phẩm áp dụng"
							: "Chưa có sản phẩm áp dụng"}
					</h3>

					<div className='flex gap-2'>
						<button
							className='self-center px-5 py-2 text-white text-2xl bg-blue-500 rounded-full'
							onClick={() => setShow(!show)}
						>
							Chọn sản phẩm
						</button>

						{saleUnits.length > 0 && (
							<button
								className='self-center px-5 py-2 text-white text-2xl bg-blue-500 rounded-full'
								onClick={() => setRemove(!remove)}
							>
								Xóa
							</button>
						)}
					</div>
				</div>

				{saleUnits.length !== 0 && (
					<div className='overflow-x-auto'>
						<table className='w-full border-spacing-1 border-separate table-fixed text-xl bg-white relative'>
							<thead class=' text-black uppercase sticky top-2'>
								<tr>
									<th className='w-[40%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white shrink-0 text-center'>
										Tên sản phẩm
									</th>
									<th className='w-[25%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white shrink-0 text-center'>
										Giảm giá
									</th>
									<th className='w-[25%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white shrink-0 text-center'>
										Hạn mức
									</th>
									{!remove ? (
										<th className='w-[10%] py-2 border border-b-4 rounded-md border-blue-500 bg-white shrink-0 text-center'>
											Trạng thái
										</th>
									) : (
										<th className='w-[10%] py-2 border border-b-4 rounded-md border-blue-500 bg-white shrink-0 text-center'></th>
									)}
								</tr>
							</thead>

							<tbody>
								{saleUnits.map((u) => (
									<motion.tr
										key={u.product.id}
										className='cursor-pointer'
										initial={{
											backgroundColor: "#f8fafc",
											padding: 0,
										}}
										whileHover={{
											backgroundColor: "#cbd5e1",
											padding: "10px 0px",
										}}
										transition={{ type: "spring" }}
									>
										<td className='px-4 py-2 font-normal shrink-0 text-center'>
											<div className='flex gap-2 '>
												<div className='w-14 h-14 shrink-0 rounded-xl bg-sky-300'>
													<img
														src={u.product.thumb}
														className='w-full h-full object-cover rounded-xl'
													/>
												</div>
												<div className='flex-1 min-w-0 text-left'>
													<div className='text-[1.4rem] whitespace-nowrap overflow-hidden text-ellipsis'>
														{u.product.name}
													</div>
													<div>ID: {u.product.id}</div>
												</div>
											</div>
										</td>

										<PriceCell
											saleUnit={u}
											onEditSaleUnit={onEditSaleUnit}
										/>

										<LimitCell
											saleUnit={u}
											onEditSaleUnit={onEditSaleUnit}
										/>

										{!remove ? (
											<td className='px-4 py-2 font-normal shrink-0 text-center'>
												<span
													style={{
														backgroundColor: u.isLive
															? "#06b6d4"
															: "#ef4444",
													}}
													className='p-2 rounded-xl text-white'
												>
													{u.isLive ? "LIVE" : "OFF"}
												</span>
											</td>
										) : (
											<td className='px-4 py-2 font-normal shrink-0 text-center'>
												<span
													className='text-[1.4rem] font-semibold text-red-500'
													onClick={() => onRemoveSaleUnit(u.product.id)}
												>
													Xóa
												</span>
											</td>
										)}
									</motion.tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				<ProductOptions
					show={show}
					setShow={setShow}
					setNewProducts={setNewProducts}
					appliedProductIds={appliedProductIds}
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
