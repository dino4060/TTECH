"use client"
import { UserAuth } from "@/context/AuthContext"
import { cartApi } from "@/lib/api/cart.api"
import { productApi } from "@/lib/api/product.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import {
	GoChevronLeft,
	GoChevronRight,
} from "react-icons/go"
import {
	convertTo000D,
	smoothScrollHorizotal,
} from "../../lib/utils/number2"
import CircleLoader from "./CircleLoader"
import Notification from "./Notification"

const DefaultList = [
	{ id: 1 },
	{ id: 2 },
	{ id: 3 },
	{ id: 4 },
	{ id: 5 },
	{ id: 6 },
]

const ProductSlide = ({
	title,
	imageHref,
	styleForImage = {},
	categoryId,
}) => {
	const router = useRouter()
	const [productList, setProductList] = useState(DefaultList)

	const [notifications, setNotifications] = useState(false)
	const [loading, setLoading] = useState(true)
	const { token } = UserAuth()

	const containerRef = useRef()
	const itemRef = useRef()
	const bannerRef = useRef()

	useEffect(() => {
		const listProducts = async () => {
			const apiRes = await clientFetch(
				productApi.list({
					category: categoryId,
					page: 1,
					size: 100,
				})
			)

			if (apiRes.success === false) {
				alert(`Lỗi lấy danh sách sản phẩm: ${apiRes.error}`)
				return
			}
			setProductList(apiRes.data.items)
			setLoading(false)
		}

		listProducts() // khi chạy hàm này => fill data => lỗi TypeError: Cannot read properties of null (reading 'offsetWidth') const itemWidth = itemRef.current.offsetWidth * 1.5
	}, [])

	const handleBuyClick = async (productId) => {
		const apiRes = await clientFetch(
			cartApi.addLine({ productId: productId, quantity: 1 })
		)
		if (apiRes.success === false) {
			return
		}
		setNotifications(true)
	}

	const formattedTitle = {
		__html: title,
	}

	const handleNextClick = () => {
		if (!itemRef.current || !containerRef.current) return

		const itemWidth = itemRef.current.offsetWidth * 1.5
		const scrollLeft = containerRef.current.scrollLeft
		const targetScrollLeft = scrollLeft + itemWidth
		smoothScrollHorizotal(
			containerRef.current,
			scrollLeft,
			targetScrollLeft,
			300
		)
	}

	const handlePreClick = () => {
		if (!itemRef.current || !containerRef.current) return

		const itemWidth = itemRef.current.offsetWidth
		const scrollLeft = containerRef.current.scrollLeft
		const targetScrollLeft = scrollLeft - itemWidth
		smoothScrollHorizotal(
			containerRef.current,
			scrollLeft,
			targetScrollLeft,
			300
		)
	}

	return (
		<div className='mt-3 bg-slate-200/90 py-4 md:flex overflow-hidden relative '>
			<AnimatePresence>
				{notifications && (
					<Notification
						setNotifications={setNotifications}
						notifications={notifications}
						notification={{
							style: "success",
							text: "Sản phẩm đã được thêm vào giỏi hàng của bạn",
						}}
					/>
				)}
			</AnimatePresence>

			<div ref={bannerRef} className='md:w-1/3 p-2'>
				<div className='flex gap-3 flex-col items-center'>
					<div
						className='text-center w-[70%]'
						dangerouslySetInnerHTML={formattedTitle}
					></div>
					<div
						onClick={() => {
							router.push("/products?category=" + categoryId)
						}}
						className='text-blue-500 text-[1.1rem] flex
             items-center underline z-[29] underline-offset-2 mb-4 cursor-pointer'
						href={""}
					>
						<div> Tìm hiểu thêm</div>{" "}
						<GoChevronRight scale={25} />
					</div>

					<div className='relative w-[200px] h-[200px]'>
						<Image
							src={imageHref}
							alt=''
							fill
							style={{
								...styleForImage,
								objectFit: "contain",
							}}
						/>
					</div>
				</div>
			</div>

			<div className='relative'>
				<div
					onClick={handlePreClick}
					className=' absolute top-1/2 -translate-y-1/2
          hidden md:inline-flex -translate-x-1/2  text-5xl
           bg-black/10 backdrop-blur-lg z-20  items-center
            justify-center p-3 rounded-full'
				>
					<GoChevronLeft size={25} />
				</div>
			</div>

			{productList.length !== 0 && (
				<motion.div
					ref={containerRef}
					className='hidden flex-1 gap-6 md:flex
          md:overflow-scroll scroll-smooth relative'
				>
					{productList?.map((x, i) => (
						<div
							ref={itemRef}
							key={i}
							className={`w-[40%] lg:w-1/3 h-full
              flex flex-col items-center justify-center bg-white shrink-0 rounded-[26px]`}
						>
							<div className='w-[200px] h-[200px] mt-8 mb-4 rounded-[32px] flex items-center justify-center'>
								{loading ? (
									<CircleLoader />
								) : (
									<img
										src={x.thumb}
										style={{
											objectFit: "cover",
											borderRadius: "32px",
											margin: "auto",
											maxWidth: "100%",
											maxHeight: "100%",
										}}
									/>
								)}
							</div>
							<div
								className='flex flex-col gap-2
              items-center text-[1.3rem] mt-[auto] flex-1'
							>
								<div className='font-[600] text-[2.2rem] w-[200px] text-center overflow-hidden whitespace-nowrap overflow-ellipsis'>
									{x.name || "Loading..."}
								</div>

								<div className='font-[300]'>
									Từ{" "}
									<span className='font-[500]'>
										{x.price?.mainPrice
											? convertTo000D(x.price?.mainPrice)
											: "Loading..."}
									</span>
								</div>
								<div
									onClick={() => {
										handleBuyClick(x.id)
									}}
									className='px-[11px] cursor-pointer
                 py-2 bg-blue-500 rounded-full text-white'
								>
									Mua
								</div>
								<div
									href=''
									onClick={() => {
										router.push("/products/" + x.id)
									}}
									className='text-blue-500 flex items-center gap-1 pb-4 mt-4 cursor-pointer'
								>
									Tìm hiểu thêm <GoChevronRight scale={15} />
								</div>
							</div>
						</div>
					))}
				</motion.div>
			)}

			<div
				onClick={handleNextClick}
				className='absolute text-5xl hidden md:flex
         -translate-x-5  top-1/2 right-0 -translate-y-1/2
          bg-black/10 backdrop-blur-lg z-20  items-center
          justify-center p-3 rounded-full'
			>
				<GoChevronRight size={25} />
			</div>
		</div>
	)
}

export default ProductSlide
