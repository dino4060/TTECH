"use client"
import CircleLoader from "@/components/uncategory/CircleLoader"
import Notification from "@/components/uncategory/Notification"
import { UserAuth } from "@/context/AuthContext"
import { cartApi } from "@/lib/api/cart.api"
import { productApi } from "@/lib/api/product.api"
import { clientFetch } from "@/lib/http/fetch.client"
import {
	convertPercent,
	convertTo000D,
} from "@/utils/until"
import { AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Fragment, useEffect, useState } from "react"
import {
	CiBookmark,
	CiChat1,
	CiMedal,
} from "react-icons/ci"
import { motion } from "framer-motion"

export default function Page({ params }) {
	const productId = params.id
	const [product, setProduct] = useState(DefaultProduct)
	const [photoList, setPhotoList] = useState([])
	const [zoomPhotoIndex, setZoomPhotoIndex] = useState(null)
	const [loading, setLoading] = useState(true)
	const [notifications, setNotifications] = useState(false)
	const { user } = UserAuth()
	const router = useRouter()

	useEffect(() => {
		const getProduct = async () => {
			const apiRes = await clientFetch(
				productApi.get(Number(params.id))
			)
			if (apiRes.success === false) {
				alert(`Lỗi lấy sản phẩm: ${apiRes.error}`)
				return
			}

			setProduct(apiRes.data)
			setPhotoList([apiRes.data.thumb, ...apiRes.data.photos])
			setLoading(false)
		}
		getProduct()
	}, [params])

	const onAddToCart = async () => {
		if (!user?.id) router.push("/login")

		const apiRes = await clientFetch(
			cartApi.addLine({ productId, quantity: 1 })
		)
		if (apiRes.success === false) {
			alert(`Lỗi thêm vào giỏ hàng: ${apiRes.error}`)
			return
		}
		setNotifications(true)
	}

	const onZoomPhoto = (index) => {
		if (zoomPhotoIndex === index) {
			setZoomPhotoIndex(null)
		} else {
			setZoomPhotoIndex(index)
		}
	}

	return (
		<div className='container mx-auto pb-[100px] mt-28'>
			<div className='mx-auto w-4/5'>
				<div className='text-[1.9rem] font-[600] capitalize'>
					<span
						className='cursor-pointer text-black/80 hover:text-black'
						onClick={() =>
							router.push(
								"/products?category=" + product.category?.id
							)
						}
					>{`${product.category?.name} Catalog`}</span>
					<span className='ml-3 mr-6 text-[1.5rem] text-gray-400 select-none'>
						/
					</span>
					<span
						className='cursor-pointer text-black/80 hover:text-black'
						onClick={() =>
							router.push(
								"/products?category=" +
									product.category?.id +
									"&series=" +
									product.series?.id
							)
						}
					>{`${product.series?.name} Series`}</span>
				</div>
				<hr className='bg-black/10 h-[2px]'></hr>

				<div className='flex gap-5 flex-wrap mt-12 mb-12'>
					{loading ? (
						<div className='w-[200px] h-[200px] flex items-center justify-center'>
							<CircleLoader />
						</div>
					) : (
						photoList?.map((p, index) => (
							<motion.div
								key={index}
								className='flex items-center justify-center cursor-pointer relative'
								initial={{ width: 200, height: 200 }}
								animate={{
									width: zoomPhotoIndex === index ? 400 : 200,
									height: zoomPhotoIndex === index ? 400 : 200,
									zIndex: zoomPhotoIndex === index ? 10 : 1,
								}}
								transition={{
									type: "spring",
									stiffness: 300,
									damping: 30,
								}}
								onClick={() => onZoomPhoto(index)}
							>
								<img
									src={p || ""}
									alt={`Product ${index + 1}`}
									className='object-cover rounded-[30px] p-4 block w-full h-full'
								/>
							</motion.div>
							// <motion.div
							// 	key={img}
							// 	className='w-[200px] h-[200px] flex items-center justify-center'
							// >
							// 	<img
							// 		src={img || ""}
							// 		className='object-cover rounded-[30px] p-4 block'
							// 	/>
							// </motion.div>
						))
					)}
				</div>

				<div>
					<div className='title'>{product.name || ""}</div>
					<div className=''>
						<span className='text-[1.8rem] font-semibold mr-4'>
							{convertTo000D(product.price?.mainPrice || "")}
						</span>

						{product.price?.dealPercent > 0 && (
							<Fragment>
								<span className='text-[1.4rem] text-gray-400 line-through mr-4'>
									{convertTo000D(product.price?.sidePrice || "")}
								</span>

								<span className='text-[1.4rem] text-white/80 bg-pink-500 px-3 py-1 rounded-xl'>
									{"Giảm "}
									{convertPercent(product.price?.dealPercent || "")}
								</span>
							</Fragment>
						)}
					</div>

					<div className='mt-6 text-[2rem] flex flex-col md:flex-row gap-4 md:gap-0 items-start  divide-x divide-black/60'>
						<h1 className='flex-1 text-black/70'>
							{product.description || ""}
						</h1>
						<h1 className='flex-1 flex items-center gap-2 pl-2'>
							<CiMedal size={25} />
							Cam kết chất lượng với bảo hành{" "}
							<span className='text-red-500'>
								{product.guaranteeMonths || ""}
							</span>{" "}
							tháng
						</h1>
					</div>

					<div className='text-[1.6rem] mt-12 w-1/2'>
						Bạn chưa ưng ý sản phẩm lắm?
						<br></br>
						{"Hãy xem thêm nhiều sản phẩm "}
						<span className='font-semibold text-blue-400'>
							{product.category?.name || ""}
						</span>
						{" tại "}
						<span
							className='text-blue-500 underline cursor-pointer'
							onClick={() =>
								router.push(
									"/products?category=" + product.category?.id
								)
							}
						>
							đây
						</span>
					</div>

					{/* <div className='my-24'>
						<div className='flex items-center gap-1'>
							<CiDeliveryTruck size={25} />
							<div className='text-[1.4rem]'>
								Giao hàng ngay trong hôm nay{" "}
							</div>
						</div>
						<span className='text-[1.5rem] font-semibold'>
							12/11/2025 - Miễn phí
						</span>
					</div> */}

					<div>
						<div className='my-24'>
							<button
								className='w-full p-2 rounded-xl text-white text-[1.7rem] bg-blue-500 flex items-center justify-center'
								onClick={onAddToCart}
							>
								Mua ngay
							</button>
						</div>
						<div className='my-24'>
							<div className='text-[1.5rem] font-semibold'>
								Đang phân vân ra quyết định
							</div>

							<div className='text-[1.3rem]'>
								Lưu vào danh sách một cách dễ dàng và quay lại xem
								sau đó
							</div>

							<div className='flex gap-2  text-blue-500 items-center'>
								<CiBookmark size={20} />
								<span
									className=' text-[1.4rem] underline cursor-pointer'
									onClick={onAddToCart}
								>
									lưu vào giỏ hàng
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className='flex items-center gap-2 text-[1.5rem]'>
					<CiChat1 size={20} />
					Chat ngay với hệ thống, hoặc liên hệ hotline 09009090
				</div>
			</div>

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
		</div>
	)
}

const DefaultProduct = {
	id: 0,
	name: "Loading...",
	thumb: "Loading...",
	version: null,
	color: null,
	status: "LIVE",
	photos: [],
	description: "Loading...",
	guaranteeMonths: 0,
	price: {
		id: 0,
		retailPrice: 0,
		mainPrice: 0,
		sidePrice: 0,
		dealPercent: 0,
	},
	stock: {
		id: 0,
		available: 0,
		sold: 0,
		total: 0,
		views: 0,
		carts: 0,
	},
}
