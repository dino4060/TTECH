"use client"
import Notification from "@/components/uncategory/Notification"
import { adminSupplierApi } from "@/lib/api/series.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const SupplierForm = ({
	currentSupplierClicked,
	setCurrentSupplierClicked,
	mode,
	setMode,
	triggerGetData,
	setTriggerGetData,
}) => {
	const [notifications, setNotifications] = useState(false)
	const [notificationContext, setNotificationContext] =
		useState({})
	const [verifyInput, setVerifyInput] = useState({
		id: "",
		name: "",
		common: "",
	})

	useEffect(() => {
		setVerifyInput({
			id: "",
			name: "",
			common: "",
		})
	}, [mode, setCurrentSupplierClicked])

	const handleSubmit = async (e) => {
		if (mode === "add") {
			const newSupplier = { name: currentSupplierClicked.name }
			const { success, error } = await clientFetch(
				adminSupplierApi.create(newSupplier)
			)
			if (!success) {
				setVerifyInput((prev) => ({
					...prev,
					common: error,
				}))
				return
			}
		} else {
			const updatedSupplier = {
				name: currentSupplierClicked.name,
			}
			const updatedId = currentSupplierClicked.id
			const { success, error } = await clientFetch(
				adminSupplierApi.update(updatedId, updatedSupplier)
			)
			if (!success) {
				setVerifyInput((prev) => ({
					...prev,
					common: error,
				}))
				return
			}
		}
		setNotificationContext({
			text: `Đã ${
				mode === "add" ? "thêm mới" : "cập nhật"
			} thành công`,
			style: "success",
		})
		setNotifications(true)
		setTriggerGetData((pre) => !pre)
	}

	const handleDelete = async (e) => {
		const isSure = prompt("Nhập vào 'xóa' để xóa")
		if (isSure == "xóa") {
			const { success, error } = await clientFetch(
				adminSupplierApi.delete(currentSupplierClicked.id)
			)
			if (!success) {
				setVerifyInput((prev) => ({
					...prev,
					common: error,
				}))
				return
			}
			setNotificationContext({
				text: "Đã xóa thành công",
				style: "success",
			})
			setNotifications(true)
			setCurrentSupplierClicked({
				id: "",
				name: "",
			})
			setMode("add")
			setTriggerGetData((pre) => !pre)
		}
	}

	return (
		<div className=''>
			{notifications && (
				<Notification
					notification={{
						text: notificationContext.text,
						style: notificationContext.style,
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
						setCurrentSupplierClicked({
							id: "",
							name: "",
						})
					}}
					className='px-4 cursor-pointer py-2 border border-b-4 rounded-md text-xl font-bold border-blue-500 border-b-blue-500 bg-white flex-1 shrink-0 text-center'
				>
					THÊM
				</motion.div>
				<motion.div
					onClick={handleDelete}
					whileHover={{ scale: 1.1 }}
					className='px-4 cursor-pointer py-2 border border-b-4 rounded-md text-xl font-bold border-red-500 border-b-red-500 bg-white flex-1 shrink-0 text-center'
				>
					XÓA
				</motion.div>
			</div>
			<div className='p-10'>
				<h3 className='text-red-500 text-xl mb-4'>
					{verifyInput.common}
				</h3>
				<h2 className={`text-xl mb-1 text-black/50`}>
					Mã nhà cung cấp
				</h2>
				<input
					value={currentSupplierClicked?.id}
					className='outline-none border border-black/50 text-black/50 p-4 rounded-2xl w-full text-2xl font-[500] mb-4'
					placeholder='Mã danh mục'
					disabled
				/>

				<h2 className={`text-xl mb-1`}>Tên nhà cung cấp</h2>
				<input
					onChange={(e) =>
						setCurrentSupplierClicked((pre) => ({
							...pre,
							name: e.target.value,
						}))
					}
					value={currentSupplierClicked?.name}
					className='outline-none border border-black/50 p-4 rounded-2xl w-full text-2xl font-[500]'
					placeholder='Nhập tên nhà cung cấp'
				/>
				<button
					onClick={handleSubmit}
					className='bg-blue-500 w-full p-4 mt-4 text-2xl font-semibold text-white rounded-2xl'
				>
					{mode === "add" ? "THÊM" : "SỬA"}
				</button>
			</div>
		</div>
	)
}

export default SupplierForm

// mode = [add, edit]
