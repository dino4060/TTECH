"use client"
import {
	convertDate,
	copy,
} from "@/components/user/UserOrder"
import { convertToVND } from "@/utils/until"
import { motion } from "framer-motion"
import { useState } from "react"
import { IoCopyOutline } from "react-icons/io5"
const OrderRenderList = ({
	orderList,
	setOrderList,
	currentOrderClick,
	setCurrentOrderClick,
}) => {
	// const statusOptions = [
	// 	"PREPARING",
	// 	"TRANSIT",
	// 	"DELIVERING",
	// 	"COMPLETED",
	// ]
	// const statusColors = {
	// 	PENDING: "#8b5cf6",
	// 	PREPARING: "#f59e0b",
	// 	TRANSIT: "#f97316",
	// 	DELIVERING: "#06b6d4",
	// 	COMPLETED: "#3b82f6",
	// 	BANKED: "#06b6d4",
	// 	FAILED: "#ef4444",
	// }

	// const [editingStatusId, setEditingStatusId] =
	// 	useState(null)

	const handleCurrentClick = (x) => {
		setCurrentOrderClick(x)
	}
	return (
		<table className='w-full border-spacing-1 border-separate table-auto text-xl bg-white relative'>
			<thead class=' text-black uppercase sticky top-2'>
				<tr className=''>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Mã đơn hàng
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Tên khách hàng
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Số điện thoại
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Địa chỉ
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Ngày đặt hàng
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Trạng thái
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Ghi chú
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Khuyến mãi
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Phí giao hàng
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Tổng tiền
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Loại thanh toán
					</th>
				</tr>
			</thead>
			<tbody>
				{orderList.map((x) => (
					<motion.tr
						onClick={() => handleCurrentClick(x)}
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
						<motion.th
							whileTap={{ color: "red" }}
							className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'
							onClick={(event) => {
								event.stopPropagation()
								copy(x.id)
							}}
						>
							<div className='flex justify-center items-center gap-2'>
								{x.id}
								<IoCopyOutline size={15} />
							</div>
						</motion.th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.customerName || ""}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.customerPhone || ""}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.deliveryAddress || ""}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{convertDate(x.orderTime)}
						</th>
						{/* <th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center relative'>
							{editingStatusId === x.id ? (
								<motion.ul
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ type: "spring", stiffness: 300 }}
									className='absolute z-10 top-full left-1/2 -translate-x-1/2 mt-1 bg-white border border-blue-400 rounded-md shadow-lg text-black text-sm w-32'
								>
									{statusOptions.map((status) => {
										const currentIndex = statusOptions.indexOf(
											x.status
										)
										const newIndex = statusOptions.indexOf(status)
										const isDisabled = newIndex < currentIndex

										return (
											<li
												key={status}
												onClick={() => {
													if (!isDisabled) {
														setOrderList((prev) =>
															prev.map((order) =>
																order.id === x.id
																	? { ...order, status }
																	: order
															)
														)
													}
													setEditingStatusId(null)
												}}
												className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${
													isDisabled
														? "text-gray-400 cursor-not-allowed"
														: ""
												}`}
												style={{
													backgroundColor:
														statusColors[status] || "#94a3b8",
													color: "white",
													borderRadius: "6px",
													margin: "4px",
													opacity: isDisabled ? 0.5 : 1,
												}}
											>
												{status}
											</li>
										)
									})}
								</motion.ul>
							) : (
								<motion.span
									whileHover={{ scale: 1.05 }}
									onClick={(e) => {
										e.stopPropagation()
										setEditingStatusId(x.id)
									}}
									className='p-2 rounded-xl text-white cursor-pointer inline-block'
									style={{
										backgroundColor:
											statusColors[x.status] || "#ef4444",
									}}
								>
									{x.status}
								</motion.span>
							)}
						</th> */}
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							<span
								style={{
									backgroundColor:
										x.status === "PENDING"
											? "#8b5cf6"
											: x.status === "COMPLETED"
											? "#3b82f6"
											: x.status === "BANKED"
											? "#06b6d4"
											: "#ef4444",
								}}
								className='p-2 rounded-xl text-white'
							>
								{x.status}
							</span>
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.note}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.allDiscount}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.shippingFee}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{convertToVND(x.total || 0)}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							<span
								style={{
									backgroundColor:
										x.paymentType === "PENDING"
											? "#8b5cf6"
											: x.paymentType === "COMPLETED"
											? "#3b82f6"
											: x.paymentType === "COD"
											? "#06b6d4"
											: "#ef4444",
								}}
								className='p-2 rounded-xl text-white'
							>
								{x.paymentType}
							</span>
						</th>
					</motion.tr>
				))}
			</tbody>
		</table>
	)
}

export default OrderRenderList
