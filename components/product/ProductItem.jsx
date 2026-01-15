"use client"
import { cartApi } from "@/lib/api/cart.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { convertTo000D } from "@/lib/utils/number2"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import CircleLoader from "../uncategory/CircleLoader"
import Notification from "../uncategory/Notification"

const ProductItem = ({
	loading,
	productId,
	name,
	thumb,
	highlight,
	price,
	discountCampaign,
}) => {
	const {
		mainPrice = 0,
		sidePrice = 0,
		dealPercent = 0,
	} = price || {}
	const router = useRouter()
	const [notification, setNotification] = useState("")

	const addToCart = async () => {
		const { success, data } = await clientFetch(
			cartApi.addLine({ productId, quantity: 1 })
		)
		success && setNotification("Đã thêm vào giỏi hàng")
	}

	return (
		<div className='flex flex-col bg-white p-4 items-center mb-10'>
			{notification && (
				<Notification
					setNotifications={() => setNotification("")}
					notification={{
						text: notification,
						style: "success",
					}}
				/>
			)}

			<div className='relative w-[200px] h-[200px] object-cover rounded-3xl flex items-center justify-center'>
				{loading ? (
					<CircleLoader />
				) : (
					<img src={thumb} alt='' className='rounded-[30px]' />
				)}
			</div>
			<h1 className='text-[1.7rem] z-10 font-[700] mt-5 max-w-[85%] overflow-hidden whitespace-nowrap overflow-ellipsis'>
				{name || "Loading..."}
			</h1>

			{/* <h2 className='text-[1.3rem] text-center w-2/3 display-2-line min-h-[3.9rem] font-[500] mt-5'>
				{highlight || "Loading..."}
			</h2> */}
			{/* Thay thế đoạn highlight */}
			{discountCampaign &&
			discountCampaign.promotionType === "FLASH_SALE" ? (
				<div className='w-2/3 mt-5 min-h-[3.9rem] flex flex-col justify-center gap-2'>
					{/* Chú thích thời gian */}
					<div className='flex flex-col justify-center items-center px-1'>
						{/* <span className='text-[1.1rem] font-medium text-gray-500 uppercase tracking-wider'>
							{new Date() < new Date(discountCampaign.startTime)
								? ""
								: ""}
						</span> */}
						<span className='text-[1.2rem] font-bold text-red-500'>
							FLASH SALE
						</span>
						<span className='text-[1.2rem] font-bold text-red-500'>
							{(() => {
								const now = new Date().getTime()
								const end = new Date(
									discountCampaign.endTime
								).getTime()
								const diff = end - now
								if (diff <= 0) return "Đã kết thúc"
								const hours = Math.floor(diff / (1000 * 60 * 60))
								const mins = Math.floor(
									(diff % (1000 * 60 * 60)) / (1000 * 60)
								)
								return `Còn ${hours}h ${mins}m`
							})()}
						</span>
					</div>

					{/* Thanh Progress Bar style Coupon */}
					<div className='w-full h-[6px] bg-gray-100 rounded-full overflow-hidden border border-black/[0.03] relative'>
						<motion.div
							initial={{ width: 0 }}
							animate={{
								width: `${(() => {
									const start = new Date(
										discountCampaign.startTime
									).getTime()
									const end = new Date(
										discountCampaign.endTime
									).getTime()
									const now = new Date().getTime()
									if (now < start) return 0
									if (now > end) return 100
									return ((now - start) / (end - start)) * 100
								})()}%`,
							}}
							transition={{ duration: 1, ease: "easeOut" }}
							className={`h-full bg-red-500 transition-all duration-500`}
						/>
					</div>
				</div>
			) : discountCampaign &&
			  discountCampaign.promotionType ===
					"NEW_ARRIVAL_DISCOUNT" ? (
				<div className='w-2/3 mt-5 min-h-[3.9rem] flex flex-col justify-center items-center gap-1'>
					<motion.span
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						className='text-[1.3rem] font-bold text-red-500 uppercase tracking-tight'
					>
						Hàng mới về
					</motion.span>
					<div className='flex items-center gap-2'>
						<span className='text-[1.2rem] font-semibold text-red-500'>
							Giá tốt. Chốt ngay
						</span>
						{/* <motion.span
							animate={{ x: [0, 3, 0] }}
							transition={{ repeat: Infinity, duration: 1 }}
							className='text-red-500 font-bold'
						>
							→
						</motion.span> */}
					</div>
				</div>
			) : (
				<h2 className='text-[1.3rem] text-center w-2/3 display-2-line min-h-[3.9rem] font-[500] mt-5'>
					{highlight || "Loading..."}
				</h2>
			)}

			{dealPercent > 0 ? (
				// Có giảm giá
				<div className='flex gap-3 items-center mt-5 text-black-500'>
					<h2 className='text-[1.8rem] font-bold'>
						{convertTo000D(mainPrice)}
					</h2>
					<h2 className='text-xl text-gray-400 line-through'>
						{convertTo000D(sidePrice)}
					</h2>
				</div>
			) : (
				// Không giảm giá
				<h2 className='text-[1.8rem] font-bold mt-5 text-black-500'>
					{convertTo000D(mainPrice) || "Loading..."}
				</h2>
			)}

			<div
				onClick={() => {
					router.push("/products/" + productId)
				}}
				className='text-[1.2rem] mb-6 text-blue-500 text-center cursor-pointer'
			>
				Tìm hiểu thêm
			</div>

			<motion.button
				onClick={async () => await addToCart(productId)}
				whileHover={{
					scale: [1, 1.1],
				}}
				className=' transition-all
			    :bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600
			    px-2 bg-blue-500 text-white font-[600] text-[1.6rem] mt-1'
			>
				Buy now
			</motion.button>
		</div>
	)
}

export default ProductItem
