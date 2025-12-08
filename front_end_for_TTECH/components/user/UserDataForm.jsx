"use client"
import { UserAuth } from "@/context/AuthContext"
import { userApi } from "@/lib/api/user.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { checkV } from "@/lib/utils/check"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import {
	isValidEmail,
	isValidPhoneNumber,
} from "../../utils/until"
import CircleLoader from "../uncategory/CircleLoader"
import Notification from "../uncategory/Notification"
import UserAddressForm from "./UserAddressForm"

const UserDataForm = () => {
	const buttonRef = useRef()
	const { user, setUser } = UserAuth()
	const [formData, setFormData] = useState({})
	const [formError, setFormError] = useState({
		name: "",
		email: "",
		phone: "",
		provinceId: "",
		wardId: "",
		street: "",
	})
	const [backendError, setBackendError] = useState("")
	const [isValidForm, setValidForm] = useState(true)
	const [loading, setLoading] = useState(false)
	const [notifications, setNotifications] = useState(false)

	const handleInputChange = (e) => {
		const { id, value } = e.target
		checkV(`id ${id} value ${value}`)
		if (id === "provinceId")
			setFormData((prev) => ({
				...prev,
				[id]: value,
				wardId: "",
				street: "",
			}))
		else if (id === "wardId")
			setFormData((prev) => ({
				...prev,
				[id]: value,
				street: "",
			}))
		else
			setFormData((prev) => ({
				...prev,
				[id]: value,
			}))

		let feedback = ""
		if (id in ["name", "email", "phone"] && !value.trim()) {
			feedback = `Vui lòng nhập ${
				id === "name"
					? "tên"
					: id === "email"
					? "email"
					: id === "phone"
					? "số điện thoại"
					: ""
			}`
		} else if (id === "email" && !isValidEmail(value)) {
			feedback = "Sai định dạng email"
		} else if (id === "phone" && !isValidPhoneNumber(value)) {
			feedback = "Số điện thoại gồm 10 số"
		}

		setFormError((prev) => ({
			...prev,
			[id]: feedback,
		}))
		setBackendError("")
	}

	const handleSubmit = async () => {
		setLoading(true)

		let isValid = true
		const NotEmptyFields = ["name", "email", "phone"]
		NotEmptyFields.map((F) => {
			let feedback = ""
			if (!formData[F] || !formData[F].trim()) {
				feedback = `Vui lòng nhập ${
					F === "name"
						? "tên"
						: F === "email"
						? "email"
						: F === "phone"
						? "số điện thoại"
						: ""
				}`
				isValid = false
			}
			setFormError((prev) => ({
				...prev,
				[F]: feedback,
			}))
		})
		if (isValid === false) {
			setLoading(false)
			return
		}

		const api = await clientFetch(
			userApi.update({ ...formData })
		)

		if (api.success) {
			setUser(api.data)
			setNotifications(true)
			setBackendError("")
		} else {
			setBackendError(api.error)
			setNotifications(false)
		}
		setLoading(false)
	}

	useEffect(() => {
		setFormData(user)
	}, [])

	useEffect(() => {
		setValidForm(
			Object.values(formError).every((e) => e === "")
		)
	}, [formError])

	return (
		<div className='grid grid-cols-1 mt-5'>
			{notifications && (
				<Notification
					notification={{
						text: "Đã cập nhật thông tin",
						style: "success",
					}}
					notifications={notifications}
					setNotifications={setNotifications}
				/>
			)}
			<div className=' text-white'>
				<h1 className='text-[1.8rem] text-left px-4 text-black/80 font-[500] capitalize'>
					Thông tin cá nhân
				</h1>

				<div className='w-full bg-slate-200/50 text-black text-[1.5rem]'>
					<form
						onSubmit={(e) => e.preventDefault()}
						className='grid grid-cols-1 gap-2 px-4'
					>
						{[
							{
								labelName: "Họ và tên",
								type: "text",
								inputName: "name",
							},
							{
								labelName: "Email",
								type: "email",
								inputName: "email",
							},
							{
								labelName: "Số điện thoại",
								type: "tel",
								inputName: "phone",
							},
						].map(({ labelName, type, inputName }) => (
							<div key={inputName}>
								<div className='flex flex-col'>
									<motion.label
										className='text-black/70 text-[1.4rem] font-[600]'
										htmlFor={inputName}
									>
										{labelName}
									</motion.label>
									<motion.input
										id={inputName}
										className='
                      py-1 w-full outline-none border-[1px] border-gray-500/60 px-4 rounded-xl
                      bg-slate-200'
										whileFocus={{
											borderColor: "#2563eb",
											color: "#172554",
										}}
										style={{
											borderColor:
												formError[inputName] == ""
													? "rgb(107 114 128)" // gray-500
													: "rgb(239 68 68)", // red-500
										}}
										type={type}
										value={formData?.[inputName]}
										onChange={handleInputChange}
									/>
								</div>
								<h2 className='error-message text-[1rem] mt-2 text-red-500'>
									{formError[inputName]}
								</h2>
							</div>
						))}

						<UserAddressForm
							formData={formData}
							formError={formError}
							onChange={handleInputChange}
						/>

						{/* thêm các input là selection box cho province */}
						{backendError && (
							<h2 className='error-message text-[1rem] mt-2 text-red-500'>
								{backendError}
							</h2>
						)}

						<motion.button
							ref={buttonRef}
							onClick={handleSubmit}
							disabled={!isValidForm}
							animate={{
								backgroundColor: isValidForm
									? "#0284c7"
									: "#78716c",
							}}
							className='w-full py-2 font-[700] text-white flex items-center justify-center rounded-2xl text-center'
						>
							{loading ? <CircleLoader /> : "Cập nhật thông tin"}
						</motion.button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default UserDataForm
