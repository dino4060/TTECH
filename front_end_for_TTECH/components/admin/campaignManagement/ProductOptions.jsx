"use client"

import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CiFilter, CiPercent } from "react-icons/ci"
import { convertTokVND } from "@/utils/until"
import { useRouter, useSearchParams } from "next/navigation"
import { clientFetch } from "@/lib/http/fetch.client"
import { adminProductApi } from "@/lib/api/product.api"

const ProductOptions = ({
	show,
	setShow,
	chosenProducts,
	setChosenProducts,
}) => {
	const [productOptions, setProductOptions] = useState([])
	const [loading, setLoading] = useState(false)

	const getProductOptions = async () => {
		const { data } = await clientFetch(adminProductApi.list())
		setProductOptions(data.items)
	}

	const onClick = (product) => {
		const update = new Set(chosenProducts)

		update.has(product)
			? update.delete(product)
			: update.add(product)

		setChosenProducts(update)
	}

	const onSubmit = async () => {
		setShow(false)
	}

	useEffect(() => {
		getProductOptions()

		const onKeyDown = (e) =>
			e.key === "Escape" && setShow(false)

		window.addEventListener("keydown", onKeyDown)

		return () => {
			window.removeEventListener("keydown", onKeyDown)
		}
	}, [])

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					initial={{ scaleY: 0 }}
					whileInView={{ scaleY: 1 }}
					exit={{ scaleY: 0 }}
					transition={{
						duration: 0.4,
						type: "spring",
					}}
					className='fixed inset-0 z-30 origin-top'
				>
					<div className='absolute top-0 bottom-40 inset-x-0 bg-white z-40'>
						<div className='p-10 pb-2 flex justify-between items-center'>
							<h1 className='text-black font-semibold text-4xl text-center'>
								Lựa chọn sản phẩm
							</h1>
							<div className='flex gap-5'>
								<button
									onClick={() => onSubmit()}
									className=' bg-blue-500 rounded-full text-white py-3 px-10 text-2xl flex items-center justify-center font-bold'
								>
									{loading ? <CircleLoader /> : "Hoàn tất"}
								</button>
							</div>
						</div>

						<div className='mx-auto p-10 pt-2 container'>
							<div className='overflow-x-auto'>
								<table className='w-full border-spacing-1 border-separate table-auto text-xl bg-white relative'>
									<thead class=' text-black uppercase sticky top-2'>
										<tr className=''>
											<th className='w-[10%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
												Lựa chọn
											</th>
											<th className='w-[30%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
												Tên sản phẩm
											</th>
											<th className='w-[15%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
												Giá bán chính
											</th>
											<th className='w-[15%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
												Giá bán phụ
											</th>
											<th className='w-[15%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
												% Khuyến mãi
											</th>
											<th className='w-[15%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
												Tồn kho
											</th>
										</tr>
									</thead>
									<tbody>
										{productOptions.map((x) => (
											<motion.tr
												onClick={() => onClick(x)}
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
													whileTap={{ scale: 0.95 }}
													className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'
													onClick={(event) => {
														event.stopPropagation()
													}}
												>
													<div className='flex justify-center items-center gap-2'>
														<input
															type='checkbox'
															checked={chosenProducts.has(x)}
															className='w-6 h-6 cursor-pointer'
														/>
													</div>
												</motion.th>
												<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
													<div className='flex gap-2 '>
														<div className='w-14 h-14 shrink-0 rounded-xl bg-sky-300'>
															<img
																src={x.thumb}
																className='w-full h-full object-cover rounded-xl'
															/>
														</div>
														<div>
															<div className='text-[1.4rem] whitespace-nowrap overflow-hidden text-ellipsis'>
																{x.name}
															</div>
															<div className='text-left'>{`ID: ${x.id}`}</div>
														</div>
													</div>
												</th>
												<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
													{convertTokVND(x.price.skuPrices[0].mainPrice)}
												</th>
												<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
													{x?.price?.skuPrices[0]?.sidePrice
														? convertTokVND(
																x.price.skuPrices[0].sidePrice
														  )
														: ""}
												</th>
												<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
													{x?.price?.skuPrices[0]?.dealPercent
														? convertTokVND(
																x.price.skuPrices[0].dealPercent
														  )
														: ""}
												</th>
												<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
													{x.skus[0].inventory.stocks} PCS
												</th>
											</motion.tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div
						onClick={() => {
							setShow(false)
						}}
						className='bg-white/20  backdrop-blur-md absolute inset-0'
					></div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default ProductOptions

const PriceSortOptions = [
	{
		id: 1,
		name: "Hướng giá",
		filter: [
			{
				id: 1,
				name: "Từ thấp đến cao",
				type: "Asc",
			},
			{
				id: 2,
				name: "Từ cao đến thấp",
				type: "Desc",
			},
		],
	},
]

const GroupQueryOptions = [
	{
		id: 1,
		name: "Sản phẩm",
		filter: [
			{
				id: 2,
				name: "Đang xu hướng",
				type: "trendy",
			},
			{
				id: 3,
				name: "Bán chạy",
				type: "bestseller",
			},
			{
				id: 1,
				name: "Mới về",
				type: "new",
			},
			{
				id: 4,
				name: "Đặt trước ngay hôm nay",
				type: "preorder",
			},
		],
	},
]

const variant = {
	init: {
		opacity: 1,
	},
	tap: {
		color: "red",
	},
}
