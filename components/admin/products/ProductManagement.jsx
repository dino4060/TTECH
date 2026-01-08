"use client"
import useDebounce from "@/hooks/useDebounce"
import { adminCategoryApi } from "@/lib/api/category.api"
import { adminProductApi } from "@/lib/api/product.api"
import { adminSeriesApi } from "@/lib/api/series.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { useEffect, useState } from "react"
import ProductAction from "./ProductAction"
import ProductManagementForm from "./ProductUpdateForm"
import ProductRenderList from "./ProductRenderList"

const ProductManagement = () => {
	const [currentProductChoose, setCurrentProductChoose] =
		useState({})
	const [filter, setFilter] = useState({
		pageNumber: 1,
		pageSize: 999_999,
	})
	const [trigger, setTrigger] = useState(false)
	const [list, setList] = useState([])
	const [series, setSeries] = useState([])
	const [category, setCategory] = useState([])

	const getData = async () => {
		const { success, data: categories } = await clientFetch(
			adminCategoryApi.list()
		)
		setCategory(success ? categories : [])

		const { data: series } = await clientFetch(
			adminSeriesApi.list()
		)
		setSeries(success ? series : [])
	}

	useEffect(() => {
		getData()
	}, [])

	const filterDebounce = useDebounce(filter, 1000)

	const getProduct = async () => {
		const {
			success,
			data: { items: products },
		} = await clientFetch(adminProductApi.list())
		setList(success ? products : [])
	}

	useEffect(() => {
		getProduct()
	}, [filterDebounce, trigger])

	return (
		<>
			<div className='container mx-auto mt-14 p-6 bg-white rounded-3xl'>
				<ProductAction
					filter={filter}
					category={category}
					series={series}
					setFilter={setFilter}
					setTrigger={setTrigger}
					setCurrentProductChoose={setCurrentProductChoose}
				/>
				<div className='flex gap-3 mt-4 flex-1'>
					<ProductRenderList
						filter={filterDebounce}
						list={list}
						setCurrentProductChoose={setCurrentProductChoose}
						currentProductChoose={currentProductChoose}
					/>

					<ProductManagementForm
						setTrigger={setTrigger}
						currentProductChoose={currentProductChoose}
						category={category}
						setCategory={setCategory}
						series={series}
						setSeries={setSeries}
					/>
				</div>
			</div>
		</>
	)
}

export default ProductManagement
