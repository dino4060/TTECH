"use client"
import FilterProduct from "@/components/product/ProductFilter"
import ProductItem from "@/components/product/ProductItem"
import PaginationControls from "@/components/uncategory/PaginationControls"
import { useSearch } from "@/context/SearchContext"
import { productApi } from "@/lib/api/product.api"
import { seriesApi } from "@/lib/api/series.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { useEffect, useState } from "react"

/**
 * @param {searchParams} { keywords, category, series, prices }
 */
export default function Page() {
	const [filter, setFilter] = useState({})
	const [loading, setLoading] = useState(true)
	const [totalPages, setTotalPages] = useState(1)
	const [currentPage, setCurrentPage] = useState(1)
	const [productList, setProductList] = useState(List12)
	const [seriesList, setSeriesList] = useState(List12)
	const [asyncSeries, setAsyncSeries] = useState(false)
	const { param: searchParams } = useSearch()

	useEffect(() => {
		const listProducts = async () => {
			const apiRes = await clientFetch(
				productApi.list({ ...filter, size: 12 })
			)
			if (apiRes.success === false) {
				alert(`Lỗi lấy danh sách sản phẩm: ${apiRes.error}`)
				return
			}
			setProductList(apiRes.data?.items)
			setTotalPages(apiRes.data?.totalPages)
			setCurrentPage(apiRes.data?.page)
			setLoading(false)
		}
		listProducts()

		const listSeries = async () => {
			const apiRes = await clientFetch(
				seriesApi.list({ category: filter.category })
			)
			if (apiRes.success === false) {
				alert(`Lỗi lấy danh sách series: ${apiRes.error}`)
				return
			}
			setSeriesList(apiRes.data)
		}
		listSeries()
	}, [filter])

	useEffect(() => {
		setAsyncSeries((prev) => !prev)
		setFilter({
			...filter,
			series: null,
			category: searchParams.category || null,
			keywords: searchParams.keywords || null,
		})
	}, [searchParams])

	return (
		<div className='mt-20' suppressHydrationWarning={true}>
			<FilterProduct
				filter={filter}
				setFilter={setFilter}
				seriesList={seriesList}
				asyncSeries={asyncSeries}
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

const List12 = [
	{ id: 1 },
	{ id: 2 },
	{ id: 3 },
	{ id: 4 },
	{ id: 5 },
	{ id: 6 },
	{ id: 7 },
	{ id: 8 },
	{ id: 9 },
	{ id: 10 },
	{ id: 11 },
	{ id: 12 },
]
