"use client"
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
	convertPercent,
	convertTokVND,
} from "@/utils/until"
import { clientFetch } from "@/lib/http/fetch.client"
import { adminProductApi } from "@/lib/api/product.api"

const ProductOptions = ({
	show,
	setShow,
	setNewProducts,
	appliedProductIds,
	isAsyncUnits,
}) => {
	const [products, setProducts] = useState([])
	const [stickedProducts, setStickedProduct] = useState(
		new Set()
	)

	const fetchProducts = async () => {
		const { success, data } = await clientFetch(
			adminProductApi.list()
		)
		success && setProducts(data.items)
	}

	const onStick = (product) => {
		stickedProducts.has(product)
			? stickedProducts.delete(product)
			: stickedProducts.add(product)
		setStickedProduct(new Set(stickedProducts))
	}

	const onSubmit = () => {
		setNewProducts(stickedProducts)
		onRefresh()
	}

	const onRefresh = () => {
		setStickedProduct(new Set())
		setShow(false)
	}

	const onEscape = (e) =>
		e.key === "Escape" && setShow(false)

	useEffect(() => {
		window.addEventListener("keydown", onEscape)

		return () => {
			window.removeEventListener("keydown", onEscape)
		}
	}, [])

	useEffect(() => {
		fetchProducts()
	}, [isAsyncUnits])

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
							<div className='flex gap-2'>
								<button
									className='self-center px-5 py-2 text-2xl text-white bg-blue-500
                    flex items-center justify-center rounded-full'
									onClick={() => onSubmit()}
								>
									Chọn hoàn tất
								</button>
								<button
									className='self-center px-5 py-2 text-2xl text-white bg-blue-500
                    flex items-center justify-center rounded-full'
									onClick={() => onRefresh()}
								>
									Hủy
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
												Giá bán lẻ
											</th>
											<th className='w-[15%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
												% Khuyến mãi
											</th>
											<th className='w-[15%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
												Giá chính thức
											</th>
											<th className='w-[15%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
												Tồn kho
											</th>
										</tr>
									</thead>
									<tbody>
										{products.map(
											(p) =>
												!appliedProductIds.has(p.id) && (
													<motion.tr
														key={p.id}
														className='cursor-pointer'
														initial={{
															backgroundColor: "#f8fafc",
															padding: 0,
														}}
														whileHover={{
															backgroundColor: "#cbd5e1",
															padding: "10px 0px",
														}}
														transition={{ type: "spring" }}
														onClick={() => onStick(p)}
													>
														<motion.th
															whileTap={{ scale: 0.95 }}
															className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'
														>
															<div className='flex justify-center items-center gap-2'>
																<input
																	className='w-6 h-6 cursor-pointer'
																	type='checkbox'
																	checked={stickedProducts.has(p)}
																/>
															</div>
														</motion.th>
														<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
															<div className='flex gap-2 '>
																<div className='w-14 h-14 shrink-0 rounded-xl bg-sky-300'>
																	<img
																		src={p.thumb}
																		className='w-full h-full object-cover rounded-xl'
																	/>
																</div>
																<div>
																	<div className='text-[1.4rem] whitespace-nowrap overflow-hidden text-ellipsis'>
																		{p.name}
																	</div>
																	<div className='text-left'>{`ID: ${p.id}`}</div>
																</div>
															</div>
														</th>
														<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
															{convertTokVND(p.price.retailPrice)}
														</th>
														<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
															{convertPercent(p.price.dealPercent)}
														</th>
														<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
															{convertTokVND(p.price.mainPrice)}
														</th>
														<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
															{p.stock.available}
														</th>
													</motion.tr>
												)
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div
						className='bg-white/20  backdrop-blur-md absolute inset-0'
						onClick={() => setShow(false)}
					></div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default ProductOptions
