import { handleDiscount } from "@/app/api/handleDiscount."
import { handleSupplier } from "@/app/api/handleSupplier"
import { UserAuth } from "@/context/AuthContext"
import { motion } from "framer-motion"
import { v4 as uuidv4 } from "uuid"
import ProductOptions from "./ProductOptions"
import { use, useEffect, useState } from "react"
import { convertTokVND } from "@/utils/until"
import PriceCell from "./PriceCell"
import LimitCell from "./LimitCell"

const CampaignForm = ({
	currentDiscountClicked = {
		discountId: "1",
		discountCode: "SUMMER10",
		discountAmount: 10,
		discountDateFrom: "2022-06-01T07:00:00",
		discountDateTo: "2022-07-01T06:59:59",
	},
	setCurrentDiscountClicked,
	mode,
	setMode,
	triggerGetData,
	setTriggerGetData,
}) => {
	const [show, setShow] = useState(false)
	const [manage, setManage] = useState(false)
	const [chosenProductIds, setChosenProductIds] = useState(
		new Set()
	)
	const [chosenProducts, setChosenProducts] = useState([])
	const [saleUnits, setSaleUnits] = useState([])
	const { token } = UserAuth()

	useEffect(() => {
		setChosenProductIds(
			new Set(chosenProducts.map((product) => product.id))
		)

		setSaleUnits(
			chosenProducts.map((product) => ({
				isLive: true,
				dealPrice: 0,
				dealPercent: 0,
				totalLimit: -1,
				usedCount: 0,
				levelType: "PRODUCT",
				product: product,
			}))
		)
	}, [chosenProducts])

	const handleSubmit = async (e) => {
		if (mode === "add") {
			const newDiscount = {
				discountCode: currentDiscountClicked.discountCode,
				discountAmount: currentDiscountClicked.discountAmount,
				discountDateFrom:
					currentDiscountClicked.discountDateFrom,
				discountDateTo: currentDiscountClicked.discountDateTo,
			}
			const res = await handleDiscount.addDiscount(
				newDiscount,
				token
			)
		} else {
			const updatedDiscount = {
				discountId: currentDiscountClicked.discountId,
				discountCode: currentDiscountClicked.discountCode,
				discountAmount: currentDiscountClicked.discountAmount,
				discountDateFrom:
					currentDiscountClicked.discountDateFrom,
				discountDateTo: currentDiscountClicked.discountDateTo,
			}
			const res = await handleDiscount.updateDiscount(
				updatedDiscount,
				token
			)
		}
		setTriggerGetData((pre) => !pre)
	}

	const handleDelete = async (e) => {
		const isSure = prompt("Nhập vào '1' để xóa")
		if (isSure == "1") {
			await handleDiscount.deleteDiscount(
				currentDiscountClicked?.discountId,
				token
			)

			setCurrentDiscountClicked({
				discountId: "",
				discountCode: "",
				discountAmount: "",
				discountDateFrom: "",
				discountDateTo: "",
			})
			alert("deleted")
			setTriggerGetData((pre) => !pre)
		}
	}

	const handleOnChange = (e) => {
		const { value, id } = e.target

		setCurrentDiscountClicked((pre) => ({
			...pre,
			[id]: value,
		}))
	}

	const handleRemove = (e) => {
		const productIdToRemove = e.target.getAttribute(
			"data-product-id"
		)
		setChosenProducts((prevProducts) =>
			prevProducts.filter(
				(product) => product.id !== productIdToRemove
			)
		)
	}

	return (
		<div className=''>
			<div className='flex gap-2 justify-end'>
				<motion.div
					whileHover={{ scale: 1.1 }}
					onClick={() => {
						setMode("add")
						setCurrentDiscountClicked({
							discountId: "",
							discountCode: "",
							discountAmount: "",
							discountDateFrom: "",
							discountDateTo: "",
						})
					}}
					className='
            px-4 cursor-pointer py-2 border border-b-4 rounded-md text-xl font-bold
            border-blue-500 border-b-blue-500 bg-white flex-1 shrink-0 text-center'
				>
					THÊM
				</motion.div>
				<motion.div
					onClick={handleDelete}
					whileHover={{ scale: 1.1 }}
					className='
            px-4 cursor-pointer py-2 border border-b-4 rounded-md text-xl font-bold
            border-red-500 border-b-red-500 bg-white flex-1 shrink-0 text-center'
				>
					XÓA
				</motion.div>
			</div>
			<div className='p-10'>
				<h3 className='text-[2.2rem] font-semibold mb-4'>
					Giảm giá sản phẩm
				</h3>

				{[
					{
						key: "id",
						name: "ID chiến dịch",
						type: "text",
					},
					{
						key: "name",
						name: "Tên chiến dịch",
						type: "text",
					},
					{
						key: "startTime",
						name: "Thời gian bắt đầu",
						type: "datetime-local",
					},
					{
						key: "endTime",
						name: "Thời gian kết thúc",
						type: "datetime-local",
					},
				].map((x, i) => (
					<div className=' mb-3 w-full ' key={i}>
						<h2 className={`text-xl mb-1 `}>{x.name}</h2>
						<input
							disabled={x.key === "id"}
							type={x.type}
							id={x.key}
							onChange={handleOnChange}
							value={currentDiscountClicked?.[x.key]}
							className={`outline-none w-full border border-black/50 ${
								x.key === "discountId" && "text-black/50"
							} p-4  text-2xl rounded-2xl font-[500]`}
							placeholder={x.name}
						/>
					</div>
				))}

				<div className='flex justify-between mb-4 mt-8'>
					<h3 className='text-[2.2rem] font-semibold '>
						{saleUnits.length !== 0
							? "Danh sách sản phẩm"
							: "Chưa có sản phẩm"}
					</h3>
					<div className='flex gap-4'>
						<button
							onClick={() => {
								setShow(!show)
							}}
							className='px-4 py-1 text-white text-2xl bg-blue-500 rounded-full'
						>
							Chọn sản phẩm
						</button>
						{chosenProducts.length > 0 && (
							<button
								onClick={() => {
									setManage(!manage)
								}}
								className='px-4 py-1 text-white text-2xl bg-gray-500 rounded-full'
							>
								Quản lý
							</button>
						)}
					</div>
				</div>

				{saleUnits.length !== 0 && (
					<div className='overflow-x-auto'>
						<table className='w-full border-spacing-1 border-separate table-fixed text-xl bg-white relative'>
							<thead class=' text-black uppercase sticky top-2'>
								<tr className=''>
									<th className='w-[40%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white shrink-0 text-center'>
										Tên sản phẩm
									</th>
									<th className='w-[25%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white shrink-0 text-center'>
										Giảm giá
									</th>
									<th className='w-[25%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white shrink-0 text-center'>
										Hạn mức
									</th>
									{!manage ? (
										<th className='w-[10%] py-2 border border-b-4 rounded-md border-blue-500 bg-white shrink-0 text-center'>
											Trạng thái
										</th>
									) : (
										<th className='w-[10%] py-2 border border-b-4 rounded-md border-blue-500 bg-white shrink-0 text-center'>
											Quản lý
										</th>
									)}
								</tr>
							</thead>
							<tbody>
								{saleUnits.map((x) => (
									<motion.tr
										initial={{
											backgroundColor: "#f8fafc",
											padding: 0,
										}}
										whileHover={{
											backgroundColor: "#cbd5e1",
											padding: "10px 0px",
										}}
										transition={{ type: "spring" }}
										key={x.id}
										className='cursor-pointer'
									>
										<th className='px-4 py-2 font-normal shrink-0 text-center'>
											<div className='flex gap-2 '>
												<div className='w-14 h-14 shrink-0 rounded-xl bg-sky-300'>
													<img
														src={x.product.thumb}
														className='w-full h-full object-cover rounded-xl'
													/>
												</div>
												<div className='flex-1 min-w-0 text-left'>
													<div className='text-[1.4rem] whitespace-nowrap overflow-hidden text-ellipsis'>
														{x.product.name}
													</div>
													<div>ID: {x.product.id}</div>
												</div>
											</div>
										</th>

										<PriceCell saleUnit={x} />

										<LimitCell saleUnit={x} />

										{!manage ? (
											<th className='px-4 py-2 font-normal shrink-0 text-center'>
												<span
													style={{
														backgroundColor: x.isLive
															? "#06b6d4"
															: "#ef4444",
													}}
													className='p-2 rounded-xl text-white'
												>
													{x.isLive ? "LIVE" : "OFF"}
												</span>
											</th>
										) : (
											<th className='px-4 py-2 font-normal shrink-0 text-center'>
												<span
													className='text-[1.4rem] font-semibold text-red-500'
													onClick={handleRemove}
												>
													Xóa
												</span>
											</th>
										)}
									</motion.tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				<button
					onClick={handleSubmit}
					className='bg-blue-500 w-full p-4 mt-4 text-2xl font-semibold text-white rounded-2xl'
				>
					{mode === "add" ? "THÊM" : "SỬA"}
				</button>
			</div>
			<ProductOptions
				show={show}
				setShow={setShow}
				chosenProducts={chosenProducts}
				setChosenProducts={setChosenProducts}
				chosenProductIds={chosenProductIds}
			/>
		</div>
	)
}

export default CampaignForm

// mode = [add, edit]
