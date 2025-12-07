"use client"
import { orderApi } from "@/lib/api/order.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { convertTo000D } from "@/utils/until"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import {
	CiBoxes,
	CiCircleRemove,
	CiCreditCard2,
	CiLocationArrow1,
	CiMaximize1,
	CiMinimize1,
} from "react-icons/ci"
import { toGMT7 } from "@/lib/utils/number"
import { IoCopyOutline } from "react-icons/io5"
import CircleLoader from "../uncategory/CircleLoader"
import {
	cancelOrder,
	mapOrderStatus,
	mapParcelStatus,
	trackGhnParcel,
	translateAddress,
} from "./order.service"

const UserOrder = () => {
	const [showDetail, setShowDetail] = useState({})
	const [showTracking, setShowTracking] = useState({})
	const [loadTracking, setLoadTracking] = useState({})
	const [showCanceling, setShowCanceling] = useState({})
	const [loadCanceling, setLoadCanceling] = useState({})
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

	const onCancelOrder = async ({ orderId, parcelCode }) => {
		const newOne = { ...loadCanceling }

		newOne[orderId] = true
		setLoadCanceling(newOne)

		await cancelOrder({ orderId, parcelCode })
		// to remove icon delete

		newOne[orderId] = false
		setLoadCanceling(newOne)
	}

	const onToggleDetail = (orderId) => {
		const newShowDetail = { ...showDetail }

		if (newShowDetail[orderId]) {
			newShowDetail[orderId] = false
		} else {
			newShowDetail[orderId] = true
		}

		setShowDetail(newShowDetail)
	}

	const onToggleTracking = async (parcelCode) => {
		const newShowTracking = { ...showTracking }

		if (newShowTracking[parcelCode]?.show) {
			newShowTracking[parcelCode] = {
				...newShowTracking[parcelCode],
				show: false,
			}
		} else if (showTracking[parcelCode]?.tracking) {
			newShowTracking[parcelCode] = {
				...newShowTracking[parcelCode],
				show: true,
			}
		} else {
			const newLoadTracking = { ...loadTracking }

			newLoadTracking[parcelCode] = true
			setLoadTracking(newLoadTracking)

			const ghnData = await trackGhnParcel(parcelCode)

			newLoadTracking[parcelCode] = false
			setLoadTracking(newLoadTracking)

			newShowTracking[parcelCode] = {
				trackingLogs: ghnData.trackingLogs,
				show: true,
			}
		}

		setShowTracking(newShowTracking)
	}

	const onToggleCanceling = (orderId) => {
		const newShowCanceling = { ...showCanceling }

		if (newShowCanceling[orderId]) {
			newShowCanceling[orderId] = false
		} else {
			newShowCanceling[orderId] = true
		}

		setShowCanceling(newShowCanceling)
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
							{
								id,
								orderTime,
								total,
								paymentType,
								status,
								lines,
								parcelCode,
							},
							i
						) => (
							<div key={i}>
								<motion.div
									variants={variant}
									initial='initial'
									animate={
										showDetail[id] ||
										showTracking[parcelCode]?.show ||
										showCanceling[id]
											? "active"
											: "initial"
									}
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
										{mapOrderStatus(status)}
									</h1>
									<motion.h1 className='flex-1 shrink-0 flex items-center justify-center gap-5'>
										<AnimatePresence>
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

											{!showDetail[id] ? (
												<motion.div
													initial={{ opacity: 0 }}
													whileInView={{ opacity: 1 }}
													whileHover={{ color: "rgb(239, 68, 68)" }}
													exit={{ opacity: 0 }}
													onClick={() => onToggleDetail(id)}
												>
													<CiMaximize1 size={20} />
												</motion.div>
											) : (
												<motion.div
													initial={{ opacity: 0 }}
													whileInView={{ opacity: 1 }}
													whileHover={{ color: "rgb(239, 68, 68)" }}
													exit={{ opacity: 0 }}
													onClick={() => onToggleDetail(id)}
												>
													<CiMinimize1 size={20} />
												</motion.div>
											)}

											<motion.div
												initial={{ opacity: 0 }}
												whileInView={{ opacity: 1 }}
												whileHover={{ color: "rgb(239, 68, 68)" }}
												exit={{ opacity: 0 }}
												onClick={() => onToggleTracking(parcelCode)}
											>
												<CiLocationArrow1 size={20} />
											</motion.div>

											{["PENDING", "UNPAID"].includes(status) && (
												<motion.div
													initial={{ opacity: 0 }}
													whileInView={{ opacity: 1 }}
													whileHover={{ color: "rgb(239, 68, 68)" }}
													exit={{ opacity: 0 }}
													onClick={() => onToggleCanceling(id)}
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
											className='flex flex-col gap-6 mt-2 mx-52 mb-6 origin-top'
										>
											<div className='flex gap-2'>
												<div className='flex-1 text-center text-white/60 bg-blue-400 py-2 rounded-3xl'>
													Ảnh sản phẩm
												</div>
												<div className='flex-[2] text-center text-white/60 bg-blue-400 py-2 rounded-3xl'>
													Tên sản phẩm
												</div>
												<div className='flex-[1] text-center text-white/60 bg-blue-400 py-2 rounded-3xl'>
													Giá
												</div>
												<div className='flex-[1] text-center text-white/60 bg-blue-400 py-2 rounded-3xl'>
													Số lượng
												</div>
											</div>

											{lines?.map(
												({ product, quantity, mainPrice }, j) => (
													<div key={j} className='flex'>
														<div className='flex-1 text-center rounded-3xl'>
															<img
																src={product.thumb}
																className='h-[60px] w-[60px] m-auto object-contain rounded-3xl'
															/>
														</div>
														<div className='flex-[2] flex items-center text-center justify-center px-3'>
															{product.name}
														</div>
														<div className='flex-[1] flex items-center text-center justify-center'>
															{convertTo000D(mainPrice || 0)}
														</div>
														<div className='flex-[1] flex items-center text-center justify-center'>
															{quantity}
														</div>
													</div>
												)
											)}
										</motion.div>
									)}

									{loadTracking[parcelCode] && (
										<div className='flex justify-center items-center mt-2 mx-52 mb-6 origin-top'>
											<CircleLoader />
										</div>
									)}

									{showTracking[parcelCode]?.show && (
										<motion.div
											initial={{ scaleY: 0.1, opacity: 0 }}
											whileInView={{ scaleY: 1, opacity: 1 }}
											exit={{ scaleY: 0.1, opacity: 0 }}
											className='flex flex-col gap-6 mt-2 mx-52 mb-6 origin-top'
										>
											<div className='flex gap-2'>
												<div className='flex-1 text-center text-white/60 bg-blue-400 py-2 rounded-3xl'>
													Thời gian giao vận
												</div>
												<div className='flex-1 text-center text-white/60 bg-blue-400 py-2 rounded-3xl'>
													Trạng thái kiện hàng
												</div>
												<div className='flex-1 text-center text-white/60 bg-blue-400 py-2 rounded-3xl'>
													Vị trí
												</div>
											</div>

											{showTracking[parcelCode].trackingLogs?.map(
												(log, k) => (
													<div key={k} className='flex'>
														<div className='flex-1 flex items-center text-center justify-center px-3'>
															{toGMT7(log.actionAt)}
														</div>
														<div className='flex-1 flex items-center text-center justify-center px-3'>
															{mapParcelStatus(log.status)}
														</div>
														<div className='flex-1 flex items-center text-center justify-center px-3'>
															{translateAddress(log.location.address)}
														</div>
													</div>
												)
											)}
										</motion.div>
									)}

									{showCanceling[id] && (
										<motion.div
											initial={{ scaleY: 0.1, opacity: 0 }}
											whileInView={{ scaleY: 1, opacity: 1 }}
											exit={{ scaleY: 0.1, opacity: 0 }}
											className='flex justify-end items-center gap-3 mt-2 mx-52 mb-6 origin-top'
										>
											<motion.button
												className='w-[300px] h-[30px] px-5 text-[1.4rem] font-[400] leading-6
                        text-white/60 bg-red-400 rounded-3xl hover:text-white hover:bg-red-500'
												whileHover={{ scale: 1.1 }}
												onClick={() =>
													onCancelOrder({
														orderId: id,
														parcelCode,
													})
												}
												disabled={loadCanceling[id]}
											>
												{loadCanceling[id] ? "..." : "Xác nhận hủy"}
											</motion.button>
											{/* {loadCanceling[id] ? (
												<CircleLoader type='red' />
											) : (
												<motion.button
													className='w-[300px] h-[30px] px-5 text-[1.4rem] font-[400] leading-6
                        text-white/60 bg-red-400 rounded-3xl hover:text-white hover:bg-red-500'
													whileHover={{ scale: 1.1 }}
													onClick={() =>
														onCancelOrder({
															orderId: id,
															parcelCode,
														})
													}
													disabled={loadCanceling[id]}
												>
													{loadCanceling[id] ? "..." : "Xác nhận hủy"}
												</motion.button>
											)} */}
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
