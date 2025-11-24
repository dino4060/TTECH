"use client"
import FilterProduct from "@/components/product/FilterProduct"
import ProductItem from "@/components/product/ProductItem"
import PaginationControls from "@/components/uncategory/PaginationControls"
import { productApi } from "@/lib/api/product.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { useEffect, useState } from "react"

export default function Page({ searchParams }) {
	const [filter, setFilter] = useState(searchParams) // { keywords, category, supplier, prices }
	const [loading, setLoading] = useState(true)
	const [totalPages, setTotalPages] = useState(1)
	const [currentPage, setCurrentPage] = useState(
		searchParams.pageNumber
	)
	const [productList, setProductList] = useState([
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
			const { success, data } = await clientFetch(
				productApi.list(filter)
			)
			success &&
				(setTotalPages(data?.totalPages),
				setCurrentPage(data?.page),
				setProductList(data?.items),
				setLoading(false))
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
					{productList.map((p) => (
						<ProductItem
							key={p.id}
							loading={loading}
							productId={p?.id || 0}
							name={p?.name || ""}
							thumb={p?.thumb || ""}
							highlight={p?.description || ""}
							price={p?.price || null}
						/>
					))}
				</div>
			</div>

			<PaginationControls
				totalPages={totalPages}
				currentPage={currentPage}
				onPageChange={(pageNumber) => {
					const categoryId = searchParams.categoryId

					if (categoryId) {
						setFilter({ ...filter, pageNumber, categoryId })
					} else {
						const { categoryId, ...rest } = filter
						setFilter({ ...rest, pageNumber })
					}
				}}
			/>
		</div>
	)
}
