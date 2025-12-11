"use client"
import { adminAuthApi, authApi } from "@/lib/api/auth.api"
import { clientFetch } from "@/lib/http/fetch.client"
import {
	isValidPhoneNumber,
	isValidUsername,
} from "@/lib/utils/number2"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { UserAuth } from "../../context/AuthContext"
import CircleLoader from "../uncategory/CircleLoader"
import ForgetPassword from "./ForgetPassword"
import PopupRegister from "./PopupRegister"
import { getEnv } from "@/lib/utils/env"

const AdminLoginForm = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [verifyInput, setVerifyInput] = useState({
		phone: "",
		password: "",
	})
	const [data, setData] = useState({
		phone: "",
		password: "",
	})
	const [attempts, setAttempts] = useState(0)
	const [cooldown, setCooldown] = useState(false)

	const { setUser, setToken } = UserAuth()

	useEffect(() => {
		let timer
		if (cooldown) {
			timer = setTimeout(() => {
				setCooldown(false)
				setAttempts(0) // Reset attempts after cooldown
			}, 60000) // 1 minute cooldown
		}
		return () => clearTimeout(timer)
	}, [cooldown])

	const verify = (id, value) => {
		let errorMessage = ""
		if (!value.trim()) {
			errorMessage = `Vui lòng nhập ${id}`
		} else if (id === "username" && !isValidUsername(value)) {
			errorMessage =
				"Username nên ít nhất 4 ký tự và chỉ chứa chữ thường"
		}

		setVerifyInput((prev) => ({
			...prev,
			[id]: errorMessage,
		}))

		return errorMessage === ""
	}

	const handleInputChange = (e) => {
		const { value, id } = e.target
		verify(id, value)
		setData((prev) => ({ ...prev, [id]: value }))
	}

	const handleLogin = async () => {
		if (cooldown) return

		const isValid =
			verify("username", data.username) &&
			verify("password", data.password)
		if (!isValid) return

		setLoading(true)
		const {
			success,
			data: result,
			error,
		} = await clientFetch(adminAuthApi.loginUsername(data))

		if (success && result.isAuthenticated) {
			setUser(result.currentUser)
			setToken(result.accessToken)
			router.push("/admin")
		} else {
			setVerifyInput((prev) => ({
				...prev,
				password: error || "Incorrect login information",
			}))
			setAttempts((prev) => prev + 1)
			attempts + 1 >= 3 && setCooldown(true)
		}

		setLoading(false)
	}

	return (
		<div className='p-[30px] md:w-[500px] mx-auto'>
			<div className='flex gap-4 justify-center'>
				<h1 className='text-[3rem] pt-[10px] font-[700] capitalize tracking-wide'>
					Admin Login
				</h1>
				<div className='relative w-[120px]'>
					<Image
						src={"/images/1x/Asset1.png"}
						fill
						alt='logo'
						style={{ objectFit: "contain" }}
					/>
				</div>
			</div>

			<div className='flex flex-col mt-2 gap-2'>
				{["username", "password"].map((x, i) => (
					<div key={i}>
						<motion.input
							required
							type={x === "password" ? "password" : "text"}
							id={x}
							whileFocus={{
								scale: 1.05,
								borderColor: "#3b82f6",
							}}
							value={data[x]}
							onChange={handleInputChange}
							placeholder={
								x === "username" ? "Username" : "Password"
							}
							className='w-full border-b-2 outline-none text-[2.5rem] font-[600] px-2'
						/>
						<h3 className='text-red-500 text-xl mt-2'>
							{verifyInput[x]}
						</h3>
					</div>
				))}

				<motion.button
					onClick={handleLogin}
					disabled={cooldown}
					initial={{
						backgroundColor: "#60a5fa",
						color: "white",
					}}
					whileHover={{ backgroundColor: "#2563eb" }}
					transition={{ type: "spring" }}
					className={`w-full flex items-center justify-center uppercase font-[600] mt-2 p-3 rounded-3xl text-[1.8rem] ${
						cooldown ? "bg-gray-400 cursor-not-allowed" : ""
					}`}
				>
					{loading ? (
						<CircleLoader />
					) : cooldown ? (
						"Please wait 1 minute"
					) : (
						"Login"
					)}
				</motion.button>
			</div>
		</div>
	)
}

export default AdminLoginForm
