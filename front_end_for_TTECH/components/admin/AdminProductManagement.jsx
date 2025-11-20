"use client"

import { useState } from "react"
import ProductAction from "./productManagement/ProductAction"
import ProductManagementForm from "./productManagement/ProductManagementForm"
import ProductRenderList from "./productManagement/ProductRenderList"
import useDebounce from "@/customHook/useDeboune"
import { useEffect } from "react"
import { handleProduct } from "@/app/api/handleProduct"
import { UserAuth } from "@/context/AuthContext"
import { clientFetch } from "@/lib/http/fetch.client"
import { adminCategoryApi } from "@/lib/api/category.api"
import { adminSeriesApi } from "@/lib/api/series.api"
import { adminProductApi } from "@/lib/api/product.api"
import { check } from "@/lib/utils"

const AdminProductManagement = () => {
	const { token, user, logout } = UserAuth()

	const [currentProductChoose, setCurrentProductChoose] =
		useState({})
	const [filter, setFilter] = useState({
		pageNumber: 1,
		pageSize: 999_999,
	})
	const [triggerImage, setTriggerImage] = useState(false)
	const [trigger, setTrigger] = useState(false)
	const [list, setList] = useState([])
	const [series, setSeries] = useState([])
	const [category, setCategory] = useState([])
	const [allImageOfProduct, setAllImageOfProduct] = useState(
		[]
	)

	const getAllImage = async () => {
		try {
			const result = await handleProduct.getAllImageOfProduct(
				currentProductChoose?.productId
			)
			setAllImageOfProduct(result)
		} catch (error) {}
	}

	useEffect(() => {
		getAllImage()
	}, [currentProductChoose, triggerImage])

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
					setList={setList}
					filter={filter}
					setFilter={setFilter}
					setTrigger={setTrigger}
					category={category}
					setCategory={setCategory}
					series={series}
					setSeries={setSeries}
					currentProductChoose={currentProductChoose}
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
						allImageOfProduct={allImageOfProduct}
						setAllImageOfProduct={setAllImageOfProduct}
						triggerImage={triggerImage}
						setTriggerImage={setTriggerImage}
					/>
				</div>
			</div>
		</>
	)
}

export default AdminProductManagement
