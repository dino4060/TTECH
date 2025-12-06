"use client"
import { orderApi } from "@/lib/api/order.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { convertTo000D } from "@/utils/until"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import {
	CiBoxes,
	CiCircleRemove,
	CiCreditCard1,
	CiCreditCard2,
	CiFileOff,
	CiMaximize1,
	CiMinimize1,
} from "react-icons/ci"

import {
	IoCloseOutline,
	IoCopyOutline,
} from "react-icons/io5"

const UserOrder = () => {
	const [showDetail, setShowDetail] = useState({})
	const [orderList, setOrderList] = useState([
		{
			orderInfo: {
				orderId: "d73d9714-22e3-4700-9631-ed6ae590a8e8",
				createOrderAt: "2023-11-09T11:43:46",
				userId: "001",
				total: 3000000,
			},
			orderDetails: [
				{
					product: {
						product_id: "609bbadf-409f-48e0-9fff-4e2bea4b13f0",
						name_pr: "Cục Gạch XX",
						detail:
							"Điện thoại rung mạnh, báo thức như còi xe tải. Siêu nặng và bền.",
						price: 121212,
						images: [
							"https://localhost:7067/Upload/product/609bbadf-409f-48e0-9fff-4e2bea4b13f0/609bbadf-409f-48e0-9fff-4e2bea4b13f0_638351663329180378.webp",
						],
					},
					quantityPr: 1,
					pricePr: 121212,
				},
				{
					product: {
						product_id: "AKG001",
						name_pr: "AKG Y500 Wireless",
						detail:
							"On-ear headphones, Bluetooth 4.2, multipoint connection",
						price: 3000000,
						images: [
							"https://localhost:7067/Upload/product/AKG001/AKG001_1.jpg",
						],
					},
					quantityPr: 1,
					pricePr: 3000000,
				},
			],
		},
	])

	const onOpenOrCloseDetail = (orderId) => {
		const newShowDetail = { ...showDetail }

		if (newShowDetail[orderId]) {
			newShowDetail[orderId] = false
		} else {
			newShowDetail[orderId] = true
		}

		setShowDetail(newShowDetail)
	}

	const getALlOrder = async () => {
		const { data } = await clientFetch(orderApi.list())
		setOrderList(data.items)
	}

	function copy(text) {
		navigator.clipboard.writeText(text)
	}

	useEffect(() => {
		getALlOrder()
	}, [])

	return (
		<div className='container mx-auto text-2xl px-4 pt-4 pb-[500px]'>
			<h1 className='text-5xl font-[700] gap-5 mb-6 mt-10 flex items-center justify-center'>
				<CiBoxes /> Đơn hàng
			</h1>

			<ul className='flex flex-col gap-4'>
				<div className='flex gap-2'>
					<h1 className='flex-1 text-center bg-blue-500 text-white/90 p-2 rounded-2xl'>
						Mã đơn hàng
					</h1>
					<h1 className='flex-1 text-center bg-blue-500 text-white/90 p-2 rounded-2xl'>
						Thời gian đặt hàng
					</h1>
					<h1 className='flex-1 text-center bg-blue-500 text-white/90 p-2 rounded-2xl'>
						Tổng cộng
					</h1>
					<h1 className='flex-1 text-center bg-blue-500 text-white/90 p-2 rounded-2xl'>
						Phương thức thanh toán
					</h1>
					<h1 className='flex-1 text-center bg-blue-500 text-white/90 p-2 rounded-2xl'>
						Trạng thái
					</h1>
					<h1 className='flex-1 text-center bg-blue-500 text-white/90 p-2 rounded-2xl'>
						Quản lý
					</h1>
				</div>
				<div>
					{orderList?.map(
						(
							{ id, orderTime, total, paymentType, status, lines },
							i
						) => (
							<div key={i}>
								<motion.div
									variants={variant}
									initial='initial'
									animate={showDetail[id] ? "active" : "initial"}
									transition={{ type: "spring", delay: 0.1 }}
									className='flex gap-1 xl:gap-2 p-4 rounded-2xl mb-6'
								>
									<motion.h1
										whileTap={{ color: "red" }}
										onClick={() => copy(id)}
										className='flex-1 shrink-0 flex items-center justify-center gap-2'
									>
										{id}
										<IoCopyOutline size={15} />
									</motion.h1>
									<h1 className='flex-1 shrink-0 flex items-center justify-center'>
										{convertDate(orderTime)}
									</h1>
									<h1 className='flex-1 shrink-0 flex items-center justify-center'>
										{convertTo000D(total || 0)}
									</h1>
									<h1 className='flex-1 shrink-0 flex items-center justify-center'>
										{paymentType}
									</h1>
									<h1 className='flex-1 shrink-0 flex items-center justify-center'>
										{status}
									</h1>
									<motion.h1 className='flex-1 shrink-0 flex items-center justify-center gap-5'>
										<AnimatePresence>
											{!showDetail[id] ? (
												<motion.div
													initial={{ opacity: 0 }}
													whileInView={{ opacity: 1 }}
													whileHover={{ color: "rgb(239, 68, 68)" }}
													exit={{ opacity: 0 }}
													onClick={() => onOpenOrCloseDetail(id)}
												>
													<CiMaximize1 size={20} />
												</motion.div>
											) : (
												<motion.div
													initial={{ opacity: 0 }}
													whileInView={{ opacity: 1 }}
													whileHover={{ color: "rgb(239, 68, 68)" }}
													exit={{ opacity: 0 }}
													onClick={() => onOpenOrCloseDetail(id)}
												>
													<CiMinimize1 size={20} />
												</motion.div>
											)}

											{status === "UNPAID" && (
												<motion.div
													initial={{ opacity: 0 }}
													whileInView={{ opacity: 1 }}
													whileHover={{ color: "rgb(239, 68, 68)" }}
													exit={{ opacity: 0 }}
												>
													<CiCreditCard2 size={20} />
												</motion.div>
											)}

											{["PENDING", "UNPAID"].includes(status) && (
												<motion.div
													initial={{ opacity: 0 }}
													whileInView={{ opacity: 1 }}
													whileHover={{ color: "rgb(239, 68, 68)" }}
													exit={{ opacity: 0 }}
												>
													<CiCircleRemove size={20} />
												</motion.div>
											)}
										</AnimatePresence>
									</motion.h1>
								</motion.div>
								<AnimatePresence>
									{showDetail[id] && (
										<motion.div
											initial={{ scaleY: 0.1, opacity: 0 }}
											whileInView={{ scaleY: 1, opacity: 1 }}
											exit={{ scaleY: 0.1, opacity: 0 }}
											className='flex flex-col gap-6 mt-2 mx-12 origin-top'
										>
											<div className='pl-0 text-[1.7rem] font-semibold'>
												Danh sách sản phẩm
											</div>
											<div className='flex gap-2'>
												<div className='flex-1 text-center text-white/60 bg-blue-400 py-2 rounded-3xl'>
													Ảnh sản phẩm
												</div>
												<div className='flex-[2] text-center text-white/60 bg-blue-400 py-2 rounded-3xl'>
													Tên sản phẩm
												</div>
												<div className='flex-[2] text-center text-white/60 bg-blue-400 py-2 rounded-3xl'>
													{" "}
													Giá
												</div>
												<div className='flex-[2] text-center text-white/60 bg-blue-400 py-2 rounded-3xl'>
													Số lượng
												</div>
											</div>

											{lines?.map(
												(
													{ product, quantity, mainPrice, sidePrice },
													j
												) => (
													<div key={j} className='flex pb-6'>
														<div className='flex-1 text-center rounded-3xl'>
															<img
																src={product.thumb}
																className='h-[70px] m-auto w-[70px] object-contain rounded-3xl'
															/>
														</div>
														<div className='flex-[2] flex items-center text-center justify-center px-3'>
															{product.name}
														</div>
														<div className='flex-[2] flex items-center text-center justify-center'>
															{convertTo000D(mainPrice || 0)}{" "}
														</div>
														<div className='flex-[2] flex items-center text-center justify-center'>
															{quantity}{" "}
														</div>
													</div>
												)
											)}

											<div className='pl-0 text-[1.7rem] font-semibold'>
												Lộ trình vận chuyển
											</div>

											<div className='flex gap-2'>
												<div className='flex-1 text-center text-white/60 bg-blue-400 py-2 rounded-3xl'>
													Ảnh sản phẩm
												</div>
												<div className='flex-[2] text-center text-white/60 bg-blue-400 py-2 rounded-3xl'>
													Tên sản phẩm
												</div>
												<div className='flex-[2] text-center text-white/60 bg-blue-400 py-2 rounded-3xl'>
													{" "}
													Giá
												</div>
												<div className='flex-[2] text-center text-white/60 bg-blue-400 py-2 rounded-3xl'>
													Số lượng
												</div>
											</div>

											{lines?.map(
												(
													{ product, quantity, mainPrice, sidePrice },
													j
												) => (
													<div key={j} className='flex pb-6'>
														<div className='flex-1 text-center rounded-3xl'>
															<img
																src={product.thumb}
																className='h-[60px] m-auto w-[60px] object-contain rounded-3xl'
															/>
														</div>
														<div className='flex-[2] flex items-center text-center justify-center px-3'>
															{product.name}
														</div>
														<div className='flex-[2] flex items-center text-center justify-center'>
															{convertTo000D(mainPrice || 0)}{" "}
														</div>
														<div className='flex-[2] flex items-center text-center justify-center'>
															{quantity}{" "}
														</div>
													</div>
												)
											)}
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						)
					)}
				</div>
			</ul>
		</div>
	)
}

export default UserOrder

const variant = {
	initial: { backgroundColor: "white" },
	active: { backgroundColor: "#bfdbfe" },
}

export const convertDate = (date) => {
	const datePortion = date?.slice(0, 10)
	if (!datePortion) return ""
	const [year, month, day] = datePortion?.split("-")
	const formattedDate = `${day}/${month}/${year}`
	return formattedDate
}

export function copy(text) {
	navigator.clipboard.writeText(text)
}
