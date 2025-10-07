"use client"

import FilterProduct from "@/components/product/FilterProduct"
import PaginationControls from "@/components/uncategory/PaginationControls"
import ProductItem from "@/components/product/ProductItem"
import { useEffect, useState } from "react"
import { handleProduct } from "../api/handleProduct"
import { useRouter } from "next/navigation"
import { clientFetch } from "@/lib/http/fetch.client"
import { productApi } from "@/lib/api/product.api"

export default function Page({ searchParams }) {
	const [filter, setFilter] = useState(searchParams) // { keywords, category, supplier, prices }
	const [loading, setLoading] = useState(true)
	const [totalPages, setTotalPages] = useState(1)
	const [currentPage, setCurrentPage] = useState(
		searchParams.pageNumber
	)
	const [list, setList] = useState([
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
	])

	useEffect(() => {
		let { category, keywords } = searchParams

		category = category || undefined
		keywords = keywords || undefined

		setFilter({ ...filter, category, keywords })
	}, [searchParams.category, searchParams.keywords])

	// useEffect(() => {
	//   const queryString = Object.entries(filter)
	//     .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
	//     .join("&")
	//   router.push("/products?" + queryString, undefined, { shallow: true, })
	// }, [filter])

	useEffect(() => {
		const getProduct = async () => {
			const { data } = await clientFetch(
				productApi.list(filter)
			)
			setCurrentPage(data?.pagination?.page)
			setTotalPages(data?.pagination?.totalPages)
			setList(data?.items)
			setLoading(false)
		}

		getProduct()
	}, [filter])

	return (
		<div className='mt-20' suppressHydrationWarning={true}>
			<FilterProduct
				onFilterChange={setFilter}
				filter={filter}
			/>
			<div className='flex justify-center'>
				<div className='grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
					{list?.map((x, i) => (
						<ProductItem
							loading={loading}
							key={i}
							product_id={x?.id || ""}
							category_id={x?.category?.id || ""}
							name_pr={x?.name || ""}
							name_serial={x?.serialNumber || ""}
							detail={x?.description || ""}
							price={x?.price?.skuPrices[0]?.mainPrice || 0}
							quantity_pr={x?.skus?.[0].inventory.stocks || ""}
							img_href={x?.thumb || null}
							guarantee_period={x?.guaranteeMonths || ""}
							skus={x.skus}
						/>
					))}
				</div>
			</div>
			<PaginationControls
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={(pageNumber) => {
					const categoryId = searchParams.categoryId

					if (categoryId) {
						setFilter({
							...filter,
							pageNumber,
							categoryId,
						})
					} else {
						const { categoryId, ...rest } = filter
						setFilter({
							...rest,
							pageNumber,
						})
					}
				}}
			/>
		</div>
	)
}
