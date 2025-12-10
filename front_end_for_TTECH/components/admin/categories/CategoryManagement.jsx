"use client"
import { adminCategoryApi } from "@/lib/api/category.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { useEffect, useState } from "react"
import CategoryForm from "./CategoryForm"
import CategoryRenderList from "./CategoryRenderList"

const CategoryManagement = () => {
	const [categoryList, setCategoryList] = useState([])
	const [mode, setMode] = useState("add")
	const [triggerGetData, setTriggerGetData] = useState(false)

	const [currentCategoryClicked, setCurrentCategoryClicked] =
		useState({})

	const getData = async () => {
		const { data } = await clientFetch(
			adminCategoryApi.list()
		)
		if (Array.isArray(data)) setCategoryList(data)
	}

	useEffect(() => {
		getData()
	}, [triggerGetData])

	return (
		<div className='container mx-auto flex mt-10 gap-5'>
			<div className='flex-1'>
				<CategoryRenderList
					categoryList={categoryList}
					setCategoryList={setCategoryList}
					currentCategoryClicked={currentCategoryClicked}
					setCurrentCategoryClicked={setCurrentCategoryClicked}
					setMode={setMode}
				/>
			</div>
			<div className='flex-1 bg-white'>
				<CategoryForm
					currentCategoryClicked={currentCategoryClicked}
					setCurrentCategoryClicked={setCurrentCategoryClicked}
					mode={mode}
					setMode={setMode}
					triggerGetData={triggerGetData}
					setTriggerGetData={setTriggerGetData}
				/>
			</div>
		</div>
	)
}

export default CategoryManagement
