"use client"
import { adminSeriesApi } from "@/lib/api/series.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { useEffect, useState } from "react"
import SeriesFrom from "./SeriesForm"
import SeriesRenderList from "./SeriesRenderList"

export const EmptyCurrentSeries = {
	id: "",
	name: "",
	position: "",
	categoryId: "",
	// category: {
	// 	id: "",
	// },
}
const SeriesManagement = () => {
	const [seriesList, setSeriesList] = useState([])
	const [mode, setMode] = useState("add")
	const [asyncList, setAsyncList] = useState(false)
	const [currentSeries, setCurrentSeries] = useState(
		EmptyCurrentSeries
	)

	const getData = async () => {
		const apiRes = await clientFetch(adminSeriesApi.list())
		if (apiRes.success === false) {
			alert(`Lỗi lấy danh sách series: ${apiRes.error}`)
		}
		setSeriesList(apiRes.data)
	}

	useEffect(() => {
		getData()
	}, [asyncList])

	return (
		<div className='container mx-auto flex mt-10 gap-5'>
			<div className='flex-1'>
				<SeriesRenderList
					seriesList={seriesList}
					currentSeries={currentSeries}
					setCurrentSeries={setCurrentSeries}
					setMode={setMode}
				/>
			</div>
			<div className='flex-1 bg-white'>
				<SeriesFrom
					currentSeries={currentSeries}
					setCurrentSeries={setCurrentSeries}
					mode={mode}
					setMode={setMode}
					setAsyncList={setAsyncList}
				/>
			</div>
		</div>
	)
}

export default SeriesManagement
