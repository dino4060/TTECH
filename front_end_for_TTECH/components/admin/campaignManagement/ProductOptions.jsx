"use client"

import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CiFilter, CiPercent } from "react-icons/ci"
import { convertTokVND, convertToVND } from "@/utils/until"
import { useRouter, useSearchParams } from "next/navigation"
import { clientFetch } from "@/lib/http/fetch.client"
import { adminProductApi } from "@/lib/api/product.api"
import ProductList from "./ProductList"

const ProductOptions = ({ show, setShow }) => {
	const [productOptions, setProductOptions] = useState([])
	const [chosenProducts, setChosenProducts] = useState([])

	const getProductOptions = async () => {
		const { data } = await clientFetch(adminProductApi.list())
		setProductOptions(data.items)
	}

	const onKeyDown = (e) => {
		if (e.key === "Escape") {
			setShow(false)
		}
	}

	useEffect(() => {
		getProductOptions()

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
						<ProductList
							list={productOptions}
							setList={setProductOptions}
							currentProductChoose={chosenProducts}
							setCurrentProductChoose={setChosenProducts}
						/>
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
