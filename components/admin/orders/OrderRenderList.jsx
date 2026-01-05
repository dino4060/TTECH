"use client"
import { copy } from "@/lib/utils"
import { convertDate } from "@/lib/utils/number"
import { convertTokVND } from "@/lib/utils/number2"
import { motion } from "framer-motion"
import { IoCopyOutline } from "react-icons/io5"

const OrderRenderList = ({
	orderList,
	setCurrentOrderClick,
}) => {
	const onClickOrder = (order) => {
		setCurrentOrderClick(order)
	}
	return (
		<table className='w-full border-spacing-1 border-separate table-auto text-xl bg-white relative'>
			<thead className=' text-black uppercase sticky top-2'>
				<tr>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Mã đơn hàng
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Tên khách hàng
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Số điện thoại
					</th>
					{/* <th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Địa chỉ
					</th> */}
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
						Phí giao
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Thanh toán
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Hình thức
					</th>
				</tr>
			</thead>
			<tbody>
				{orderList.map((o) => (
					<motion.tr
						key={o.id}
						onClick={() => onClickOrder(o)}
						initial={{
							backgroundColor: "#f8fafc",
							padding: 0,
						}}
						whileHover={{
							backgroundColor: "#cbd5e1",
							padding: "10px 0px",
						}}
						transition={{ type: "spring" }}
						className='cursor-pointer'
					>
						<motion.th
							whileTap={{ color: "red" }}
							className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'
							onClick={(event) => {
								event.stopPropagation()
								copy(o.id)
							}}
						>
							<div className='flex justify-center items-center gap-2'>
								{o.id}
								<IoCopyOutline size={15} />
							</div>
						</motion.th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{o.toUserName || ""}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{o.toPhone || ""}
						</th>
						{/* <th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{o.deliveryAddress || ""}
						</th> */}
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{convertDate(o.orderTime)}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							<span
								style={{
									backgroundColor: ColorMap[o.status],
								}}
								className='p-2 rounded-xl text-white'
							>
								{o.status}
							</span>
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{o.note}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{o.allDiscount
								? convertTokVND(o.allDiscount, false)
								: ""}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{o.shippingFee
								? convertTokVND(o.shippingFee, false)
								: ""}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{o.total ? convertTokVND(o.total || 0, false) : ""}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							<span
								style={{
									backgroundColor: ColorMap[o.paymentType],
								}}
								className='p-2 rounded-xl text-white'
							>
								{o.paymentType}
							</span>
						</th>
					</motion.tr>
				))}
			</tbody>
		</table>
	)
}

export default OrderRenderList

const ColorMap = {
	PENDING: "#8b5cf6",
	PREPARING: "#8b5cf6",
	UNPAID: "#ef4444",
	SHIPPING: "#06b6d4",
	TRANSIT: "#06b6d4",
	DELIVERING: "#06b6d4",
	COMPLETED: "#16a34a",
	RETURN: "#f59e0b",
	CANCELED: "#f97316",
	COD: "#3b82f6",
	BANK: "#16a34a",
}
