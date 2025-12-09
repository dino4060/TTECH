"use client"
import Notification from "@/components/uncategory/Notification"
import { adminCategoryApi } from "@/lib/api/category.api"
import { adminSeriesApi } from "@/lib/api/series.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { normalizePositiveNumber } from "@/lib/utils/normalizer"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { EmptyCurrentSeries } from "./AdminSeries"

const SeriesFrom = ({
	currentSeries,
	setCurrentSeries,
	mode,
	setMode,
	setAsyncList,
}) => {
	const [notifications, setNotifications] = useState(false)
	const [notificationMes, setNotificationMes] = useState({})
	const [categories, setCategories] = useState([])
	const [feedback, setFeedback] = useState({
		id: "",
		name: "",
		position: "",
		categoryId: "",
		shared: "",
	})

	useEffect(() => {
		const listCategories = async () => {
			const apiRes = await clientFetch(adminCategoryApi.list())

			if (apiRes.success === false) {
				alert(`Lỗi lấy danh sách ngành hàng: ${apiRes.error}`)
				return
			}

			setCategories(apiRes.data)
		}

		listCategories()
	}, [])

	useEffect(() => {
		setFeedback({
			id: "",
			name: "",
			position: "",
			categoryId: "",
			shared: "",
		})
	}, [mode, setCurrentSeries])

	const onSubmit = async (e) => {
		let isValid = true
		const newFeedback = {}
		FormField.map((f) => {
			if (!currentSeries[f.key]) {
				newFeedback[f.key] = "Vui lòng nhập " + f.name
				isValid = false
			}
		})
		if (isValid === false) {
			setFeedback(newFeedback)
			return
		}

		if (mode === "add") {
			const newOne = {
				...currentSeries,
				category: {
					id: currentSeries.categoryId,
				},
			}
			const { success, error } = await clientFetch(
				adminSeriesApi.create(newOne)
			)
			if (!success) {
				setFeedback((prev) => ({
					...prev,
					shared: error,
				}))
				return
			}
		} else {
			const newOne = {
				...currentSeries,
				category: {
					id: currentSeries.categoryId,
				},
			}
			const oneId = currentSeries.id
			const { success, error } = await clientFetch(
				adminSeriesApi.update(oneId, newOne)
			)
			if (!success) {
				setFeedback((prev) => ({
					...prev,
					shared: error,
				}))
				return
			}
		}

		setFeedback({
			id: "",
			name: "",
			position: "",
			categoryId: "",
			shared: "",
		})
		setCurrentSeries(EmptyCurrentSeries)
		setNotificationMes({
			text: `Đã ${
				mode === "add" ? "thêm mới" : "cập nhật"
			} thành công`,
			style: "success",
		})
		setNotifications(true)
		setMode("add")
		setAsyncList((prev) => !prev)
	}

	const onDelete = async (e) => {
		const isSure = prompt("Nhập vào 'xóa' để xác nhận xóa")
		if (isSure == "xóa") {
			const { success, error } = await clientFetch(
				adminSeriesApi.delete(currentSeries.id)
			)
			if (!success) {
				setFeedback((prev) => ({
					...prev,
					shared: error,
				}))
				return
			}
			setNotificationMes({
				text: "Đã xóa thành công",
				style: "success",
			})
			setNotifications(true)
			setCurrentSeries(EmptyCurrentSeries)
			setMode("add")
			setAsyncList((prev) => !prev)
		}
	}

	return (
		<div className=''>
			{notifications && (
				<Notification
					notification={{
						text: notificationMes.text,
						style: notificationMes.style,
					}}
					notifications={notifications}
					setNotifications={setNotifications}
				/>
			)}

			<div className='flex gap-2 justify-end'>
				<motion.div
					whileHover={{ scale: 1.1 }}
					onClick={() => {
						setMode("add")
						setCurrentSeries(EmptyCurrentSeries)
					}}
					className='px-4 cursor-pointer py-2 border border-b-4 rounded-md text-xl font-bold border-blue-500 border-b-blue-500 bg-white flex-1 shrink-0 text-center'
				>
					THÊM
				</motion.div>
				<motion.div
					onClick={onDelete}
					whileHover={{ scale: 1.1 }}
					className='px-4 cursor-pointer py-2 border border-b-4 rounded-md text-xl font-bold border-red-500 border-b-red-500 bg-white flex-1 shrink-0 text-center'
				>
					XÓA
				</motion.div>
			</div>
			<div className='p-10'>
				<h2 className='text-xl mb-1 text-black/50'>
					Mã series
				</h2>
				<input
					value={currentSeries.id}
					className='outline-none border border-black/50 text-black/50 p-4 rounded-2xl w-full text-2xl font-[500]'
					placeholder='Mã danh mục'
					disabled
				/>
				<h3 className='text-red-500 text-xl mb-4'>
					{feedback.id}
				</h3>

				<h2 className='text-xl mb-1'>Tên series</h2>
				<input
					onChange={(e) => {
						setFeedback({ ...feedback, name: "" })
						setCurrentSeries((prev) => ({
							...prev,
							name: e.target.value,
						}))
					}}
					value={currentSeries.name}
					className='outline-none border border-black/50 p-4 rounded-2xl w-full text-2xl font-[500]'
					placeholder='Nhập tên series'
				/>
				<h3 className='text-red-500 text-xl mb-4'>
					{feedback["name"]}
				</h3>

				<h2 className='text-xl mb-1'>Vị trí</h2>
				<input
					onChange={(e) => {
						setFeedback({ ...feedback, position: "" })
						setCurrentSeries((prev) => ({
							...prev,
							position: normalizePositiveNumber(e.target.value),
						}))
					}}
					value={currentSeries.position || ""}
					className='outline-none border border-black/50 p-4 rounded-2xl w-full text-2xl font-[500]'
					placeholder='Nhập vị trí series'
				/>
				<h3 className='text-red-500 text-xl mb-4'>
					{feedback["position"]}
				</h3>

				<h2 className='text-xl mb-1'>Thuộc ngành hàng</h2>
				<select
					className='outline-none border border-black/50 p-4 rounded-2xl w-full text-2xl font-[500]'
					value={currentSeries.categoryId}
					onChange={(e) => {
						setFeedback({ ...feedback, categoryId: "" })
						setCurrentSeries((prev) => ({
							...prev,
							categoryId: e.target.value,
						}))
					}}
				>
					<option>Chọn ngành hàng</option>
					{categories.map((c) => (
						<option key={c.id} value={c.id}>
							{c.name}
						</option>
					))}
				</select>
				<h3 className='text-red-500 text-xl mb-4'>
					{feedback["categoryId"]}
				</h3>

				<h3 className='text-red-500 text-xl mt-4'>
					{feedback.shared}
				</h3>
				<button
					onClick={onSubmit}
					className='bg-blue-500 w-full p-4 text-2xl font-semibold text-white rounded-2xl'
				>
					{mode === "add" ? "THÊM" : "SỬA"}
				</button>
			</div>
		</div>
	)
}

export default SeriesFrom

const FormField = [
	{
		key: "name",
		name: "Tên series",
	},
	{
		key: "position",
		name: "Vị trí",
	},
	{
		key: "categoryId",
		name: "Thuộc ngành hàng",
	},
]
