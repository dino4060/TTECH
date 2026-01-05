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

			<h2 className='text-[1.3rem] text-center w-2/3 display-2-line min-h-[3.9rem] font-[500] mt-5'>
				{highlight || "Loading..."}
			</h2>

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
