import { handleDiscount } from "@/app/api/handleDiscount."
import { handleSupplier } from "@/app/api/handleSupplier"
import { UserAuth } from "@/context/AuthContext"
import { motion } from "framer-motion"
import { v4 as uuidv4 } from "uuid"
import ProductOptions from "./ProductOptions"
import { useState } from "react"

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
	const { token } = UserAuth()
	const [show, setShow] = useState(false)

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

	return (
		<div className=''>
			<div className='flex gap-2 justify-end'>
				<motion.div
					whileHover={{ scale: 1.1 }}
					onClick={() => {
						setMode("add")
						// clearinput
						setCurrentDiscountClicked({
							discountId: "",
							discountCode: "",
							discountAmount: "",
							discountDateFrom: "",
							discountDateTo: "",
						})
					}}
					className='px-4 cursor-pointer py-2 border border-b-4 rounded-md text-xl font-bold border-blue-500 border-b-blue-500 bg-white flex-1 shrink-0 text-center'
				>
					THÊM
				</motion.div>
				<motion.div
					onClick={handleDelete}
					whileHover={{ scale: 1.1 }}
					className='px-4 cursor-pointer py-2 border border-b-4 rounded-md text-xl font-bold border-red-500 border-b-red-500 bg-white flex-1 shrink-0 text-center'
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
						Danh sách sản phẩm
					</h3>
					<button
						onClick={() => {
							setShow(true)
						}}
						className='px-4 text-white text-2xl mt-4 bg-blue-500 rounded-full  py-1 '
					>
						Chọn sản phẩm
					</button>
				</div>

				<button
					onClick={handleSubmit}
					className='bg-blue-500 w-full p-4 mt-4 text-2xl font-semibold text-white rounded-2xl'
				>
					{mode === "add" ? "THÊM" : "SỬA"}
				</button>
			</div>
			<ProductOptions show={show} setShow={setShow} />
		</div>
	)
}

export default CampaignForm

// mode = [add, edit]
