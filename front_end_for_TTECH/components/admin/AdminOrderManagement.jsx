"use client"
import useDebounce from "@/customHook/useDeboune"
import { adminOrderApi } from "@/lib/api/order.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import DetailOrder from "./orderManagement/DetailOrder"
import OrderFeatures from "./orderManagement/OrderFeatures"
import OrderRenderList from "./orderManagement/OrderRenderList"

const AdminOrderManagement = () => {
	const [orderList, setOrderList] = useState([
		{
			customerInfor: {
				user_id: "001",
				name: "Cao Hoài Sang",
				email: "Sang@gmail.com",
				phone: "0944552050",
				password:
					"$2a$11$/VyLbThx9mdMq1AXmqhSpuDQcEQOn0Q3IcQH04mfksGgbBE4MgBsS",
				role: "1",
				create_at: "2023-11-04T05:35:56",
			},
			orderInfor: {
				orderId: "11e77c53-c765-4c13-88a5-a5d8e4ef1d2f",
				userId: "001",
				createOrderAt: "2023-11-13T12:57:56",
				name: "CAO HOAI SANG",
				email: "sangfc347@gmail.com",
				phone: "0944552050",
				address: "Kí túc xá khu B, ĐHQG",
				state: "pending",
				note: "Che tên sản phẩm",
				total: 17000000,
				discount: "2",
				deliveryFee: 0,
			},
			discountInfor: {
				discountId: "2",
				discountCode: "FALL20",
				discountAmount: 20,
				discountDateFrom: "2022-09-01T07:00:00",
				discountDateTo: "2022-10-01T06:59:59",
			},
		},
	])
	const [searchOrderId, setSearchOrderId] = useState("")
	const searchOrderIdDeb = useDebounce(searchOrderId, 500)
	const [trigger, setTrigger] = useState(false)

	useEffect(() => {
		getAllOrder()
	}, [trigger])

	useEffect(() => {
		searchOrder()
	}, [searchOrderIdDeb])

	const getAllOrder = async () => {
		const { success, data, error } = await clientFetch(
			adminOrderApi.list()
		)

		if (!success) alert("Lỗi lấy tất cả đơn hàng: " + error)

		setOrderList(data.items)
	}

	const searchOrder = async () => {
		let query = searchOrderIdDeb
			? { id: searchOrderIdDeb }
			: {}

		const { success, data, error } = await clientFetch(
			adminOrderApi.list(query)
		)

		if (!success) alert("Lỗi tìm kiếm đơn hàng: " + error)

		setOrderList(data.items)
	}

	const [currentOrderClick, setCurrentOrderClick] = useState(
		{}
	)

	useEffect(() => {}, [currentOrderClick])

	return (
		<div className='mx-auto mt-10 container'>
			<OrderFeatures setSearchOrderId={setSearchOrderId} />

			<OrderRenderList
				orderList={orderList}
				setCurrentOrderClick={setCurrentOrderClick}
			/>

			<AnimatePresence>
				{currentOrderClick?.id && (
					<motion.div
						className='fixed inset-0 bg-white origin-top'
						initial={{ opacity: 0, height: 0 }}
						whileInView={{
							opacity: 1,
							height: "auto",
						}}
						exit={{ opacity: 0, height: 0 }}
					>
						<DetailOrder
							currentOrderClick={currentOrderClick}
							setCurrentOrderClick={setCurrentOrderClick}
							setTrigger={setTrigger}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default AdminOrderManagement
