"use client"

import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CiFilter, CiPercent } from "react-icons/ci"
import { convertTokVND, convertToVND } from "@/utils/until"
import { useRouter, useSearchParams } from "next/navigation"

const ProductOptions = ({ show, setShow }) => {
	const searchParams = useSearchParams()

	const [priceRange, setPriceRange] = useState({
		minPrice: 0,
		maxPrice: 999_999_999,
	})

	const [error, setError] = useState({})
	const [prices, setPrices] = useState([0, 0])
	const [supplier, setSupplier] = useState({})

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape") {
				setShow(false)
			}
		}

		window.addEventListener("keydown", handleKeyDown)

		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [])

	const onPriceRangeChange = (e) => {
		const { value, id } = e.target
		console.log(value, id)

		if (id === "minPrice" && prices[1] && value > prices[1]) {
			setError((prev) => ({
				...prev,
				minPrice: "Giá nhỏ nhất nên nhỏ hơn giới hạn trên",
			}))
		} else {
			setError((prev) => ({
				...prev,
				minPrice: "",
			}))
		}

		if (id === "maxPrice" && prices[0] && value < prices[0]) {
			setError((prev) => ({
				...prev,
				maxPrice: "Giá lớn nhất nên lớn hơn giới hạn dưới",
			}))
		} else {
			setError((prev) => ({
				...prev,
				maxPrice: "",
			}))
		}

		if (id === "minPrice")
			setPrices([Number.parseInt(value) || 0, prices[1]])

		if (id === "maxPrice")
			setPrices([prices[0], Number.parseInt(value) || 0])

		// setError((prev) => ({
		// 	...prev,
		// 	minPrice: "",
		// 	maxPrice: "",
		// }))
	}

	const handlePriceRangeClick = (e) => {
		setShow(false)
	}

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
						<div className='grid grid-cols-10 mt-36'>
							{PriceSortOptions.map((x, i) => (
								<div key={i} className='col-span-6 text-center'>
									<h1 className='text-5xl font-bold'>{x.name}</h1>
									<div className='mt-5'>
										{x.filter.map((y, j) => (
											<div key={j}>
												<motion.div
													variants={variant}
													initial='init'
													whileTap='tap'
													onClick={() => {
														const category_id =
															searchParams.get("categoryId")
													}}
													className='text-2xl cursor-pointer'
												>
													{y.name}
												</motion.div>
											</div>
										))}
									</div>
								</div>
							))}

							<div className='col-span-4'>
								<h1 className='text-5xl font-bold'>Khoảng giá</h1>
								<form
									className='flex flex-col items-start mt-5 gap-0.5'
									onSubmit={(e) => e.preventDefault()}
								>
									{[
										{
											name: "Từ",
											key: "minPrice",
											placeholder: "Giá nhỏ nhất", // convertToVND(0),
										},
										{
											name: "Đến",
											key: "maxPrice",
											placeholder: "Giá lớn nhất", // convertToVND(9999999),
										},
									].map((x, i) => (
										<div
											key={x.key}
											className='flex items-center text-2xl gap-2'
										>
											<label htmlFor={x.key} className='min-w-[40px]'>
												{x.name}
											</label>
											<input
												onChange={(e) => onPriceRangeChange(e)}
												value={prices[i]}
												id={x.key}
												placeholder={x.placeholder}
											/>
											<h1
												className={`text-black/40 font-[400] hidden md:block text-xl ${
													error[x.key] ? "text-red-500" : ""
												}`}
											>
												{prices[i] <= 0
													? "Không giới hạn"
													: error[x.key]
													? error[x.key]
													: convertTokVND(Number.parseInt(prices[i]))}
											</h1>
										</div>
									))}

									<button
										onClick={handlePriceRangeClick}
										className='px-4 text-white text-2xl mt-4 bg-blue-500 rounded-full  py-1 '
									>
										Xác nhận
									</button>
								</form>
							</div>

							{GroupQueryOptions.map((x, i) => (
								<div
									key={i}
									className='col-span-6 text-center mt-36'
								>
									<h1 className='text-5xl font-bold'>{x.name}</h1>
									<div className='mt-5'>
										{x.filter.map((y, j) => (
											<div key={j}>
												<motion.div
													variants={variant}
													initial='init'
													whileTap='tap'
													onClick={() => {
														const category_id =
															searchParams.get("categoryId")

														onFilterChange(() => {
															if (x.id == 1) {
																return category_id
																	? {
																			SortBy: "price",
																			IsDescending: y.type === "Desc",
																			categoryId: category_id,
																	  }
																	: {
																			SortBy: "price",
																			IsDescending: y.type === "Desc",
																	  }
															}
														})
													}}
													className='text-2xl cursor-pointer'
												>
													{y.name}
												</motion.div>
											</div>
										))}
									</div>
								</div>
							))}

							<div className='col-span-4 mt-36'>
								<h1 className='text-5xl font-bold'>Nhà cung cấp</h1>
								<div className='mt-5'>
									<div className='mt-5 flex flex-wrap max-w-[400px] gap-x-4 gap-y-2'></div>
								</div>
							</div>

							<div className='absolute hidden sm:block bottom-10 left-1/2 z-40 text-2xl -translate-x-1/2'>
								Pres{" "}
								<span className='bg-blue-500 px-2 py-1 text-white rounded-2xl'>
									ESC
								</span>{" "}
								to quit
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
