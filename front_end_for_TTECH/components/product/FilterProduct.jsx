"use client"
import { convertTokVND } from "@/utils/until"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { CiFilter, CiPercent } from "react-icons/ci"

const FilterProduct = ({
	filter,
	setFilter,
	seriesList,
}) => {
	const [show, setShow] = useState(false)
	const [error, setError] = useState({})
	const [currSeriesId, setCurrSeriesId] = useState(null)
	const [currProductStt, setCurrProductStt] = useState(null)
	const [currPriceDirt, setCurrPriceDirt] = useState(null)
	const [currPriceRange, setCurrPriceRange] = useState([
		0, 0,
	])

	useEffect(() => {
		const onPressCloseKey = (e) => {
			if (["Escape", "Enter"].includes(e.key)) setShow(false)
		}
		window.addEventListener("keydown", onPressCloseKey)
		return () => {
			window.removeEventListener("keydown", onPressCloseKey)
		}
	}, [])

	useEffect(() => {
		if (show === false) {
			setFilter({
				...filter,
				series: currSeriesId,
				statistics: currProductStt,
				direction: currPriceDirt,
				sort: currPriceDirt ? "price.mainPrice" : null,
			})
		}
	}, [show])

	const onPriceRangeChange = (e) => {
		const { value, id } = e.target
		console.log(value, id)

		if (
			id === "minPrice" &&
			currPriceRange[1] &&
			value > currPriceRange[1]
		) {
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

		if (
			id === "maxPrice" &&
			currPriceRange[0] &&
			value < currPriceRange[0]
		) {
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
			setCurrPriceRange([
				Number.parseInt(value) || 0,
				currPriceRange[1],
			])

		if (id === "maxPrice")
			setCurrPriceRange([
				currPriceRange[0],
				Number.parseInt(value) || 0,
			])

		// setError((prev) => ({
		// 	...prev,
		// 	minPrice: "",
		// 	maxPrice: "",
		// }))
	}

	const handlePriceRangeClick = (e) => {
		setFilter((pre) => ({ ...pre, prices: currPriceRange }))
		setShow(false)
	}

	return (
		<div>
			<div className='flex gap-5 mt-24 mb-10 items-center justify-center'>
				<div
					onClick={() => setShow(true)}
					className='flex cursor-pointer gap-2 items-center justify-center mx-[20px]'
				>
					<CiFilter
						size={30}
						color='white'
						className='bg-blue-500 p-1 rounded-2xl'
					/>
					<div>
						<h1 className='text-2xl text-black/70 font-[400]'>
							Sử dụng tính năng lọc <br></br> để tìm ra{" "}
							<span className='text-black'>
								sản phẩm ưng ý nhất
							</span>
						</h1>
					</div>
				</div>

				<div
					className='flex justify-center gap-2 items-center'
					onClick={() => {}}
				>
					<CiPercent
						className='bg-red-500 px-2 py-1 rounded-2xl'
						color='white'
						size={30}
					/>
					<h1 className='text-2xl text-black/70  font-[400]'>
						Ưu đãi ngập tràng, <br></br> khuyến mại đến 60%
					</h1>
				</div>
			</div>

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
								<div className='col-span-6 text-center'>
									<h1 className='text-5xl font-bold'>
										{PriceSort.name}
									</h1>
									<div className='mt-5'>
										{PriceSort.list.map((p) => (
											<div key={p.id}>
												<motion.div
													className='text-2xl cursor-pointer transition-colors'
													whileHover={{ color: "rgb(239, 68, 68)" }}
													animate={{
														color:
															currPriceDirt === p.id
																? "rgb(239, 68, 68)"
																: "",
													}}
													onClick={() =>
														setCurrPriceDirt(
															currPriceDirt === p.id ? null : p.id
														)
													}
												>
													{p.name}
												</motion.div>
											</div>
										))}
									</div>
								</div>

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
													value={currPriceRange[i]}
													id={x.key}
													placeholder={x.placeholder}
												/>
												<h1
													className={`text-black/40 font-[400] hidden md:block text-xl ${
														error[x.key] ? "text-red-500" : ""
													}`}
												>
													{currPriceRange[i] <= 0
														? "Không giới hạn"
														: error[x.key]
														? error[x.key]
														: convertTokVND(
																Number.parseInt(currPriceRange[i])
														  )}
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

								<div className='col-span-6 text-center mt-36'>
									<h1 className='text-5xl font-bold'>
										{ProductSort.name}
									</h1>
									<div className='mt-5'>
										{ProductSort.list.map((p) => (
											<div key={p.id}>
												<motion.div
													className='text-2xl cursor-pointer transition-colors'
													whileHover={{ color: "rgb(239, 68, 68)" }}
													animate={{
														color:
															currProductStt === p.id
																? "rgb(239, 68, 68)"
																: "",
													}}
													onClick={() =>
														setCurrProductStt(
															currProductStt === p.id ? null : p.id
														)
													}
												>
													{p.name}
												</motion.div>
											</div>
										))}
									</div>
								</div>

								<div className='col-span-4 mt-36'>
									<h1 className='text-5xl font-bold'>
										Series sản phẩm
									</h1>
									<div className='mt-5'>
										<div className='mt-5 flex flex-wrap max-w-[400px] gap-x-4 gap-y-2'>
											{seriesList.map((s, i) => (
												<div key={s.id}>
													<motion.span
														className='cursor-pointer text-2xl transition-colors'
														style={{ userSelect: "none" }}
														whileHover={{ color: "rgb(239, 68, 68)" }}
														animate={{
															color:
																currSeriesId === s.id
																	? "rgb(239, 68, 68)"
																	: "",
														}}
														onClick={() =>
															setCurrSeriesId(
																currSeriesId === s.id ? null : s.id
															)
														}
													>
														{s.name}
													</motion.span>

													{i < seriesList.length - 1 && (
														<span className='mx-2 text-gray-400 select-none'>
															/
														</span>
													)}
												</div>
											))}
										</div>
									</div>
								</div>

								<div className='absolute hidden sm:block bottom-10 left-1/2 z-40 text-2xl -translate-x-1/2'>
									Press{" "}
									<span className='bg-blue-500 px-2 py-1 text-white rounded-2xl'>
										ENTER
									</span>
									{" / "}
									<span className='bg-blue-500 px-2 py-1 text-white rounded-2xl'>
										ESC
									</span>{" "}
									to apply
								</div>
							</div>
						</div>
						<div
							onClick={() => setShow(false)}
							className='bg-white/20  backdrop-blur-md absolute inset-0'
						></div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default FilterProduct

const PriceSort = {
	id: 1,
	name: "Hướng giá",
	list: [
		{
			id: "ASC",
			name: "Từ thấp đến cao",
		},
		{
			id: "DESC",
			name: "Từ cao đến thấp",
		},
	],
}

const ProductSort = {
	id: 2,
	name: "Tính sản phẩm",
	list: [
		{
			id: "trendy",
			name: "Đang xu hướng",
		},
		{
			id: "bestseller",
			name: "Bán chạy",
		},

		{
			id: "discount",
			name: "Giá rẻ nhất",
		},
		{
			id: "favorite",
			name: "Nhiều yêu thích",
		},
		{
			id: "new",
			name: "Hàng mới về",
		},
	],
}
