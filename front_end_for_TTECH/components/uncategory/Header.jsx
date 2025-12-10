"use client"
import { UserAuth } from "@/context/AuthContext"
import { categoryApi } from "@/lib/api/category.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { CiUser } from "react-icons/ci"
import Cart from "../cart/Cart"
import CategoryPhone from "./CategoryPhone"
import SearchBar from "./SearchBar"
import { useSearch } from "@/context/SearchContext"

const Header = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const { user } = UserAuth()
	const [categories, setCategories] = useState([])
	// const {
	// 	criteria,
	// 	setKeyword,
	// 	setCategory,
	// 	resetCriteria,
	// } = useSearch()

	const [currentCateId, setCurrentCateId] = useState("")

	useEffect(() => {
		const listCategories = async () => {
			const apiRes = await clientFetch(categoryApi.list())

			if (apiRes.success === false) {
				alert(`Lỗi lấy ngành hàng cho Header: ${apiRes.error}`)
			}

			setCategories(apiRes.data)
		}

		listCategories()
	}, [])

	useEffect(() => {
		const params = new URLSearchParams(
			searchParams.toString()
		)

		setCurrentCateId(Number(params.get("category")) || "")
	}, [searchParams])

	const onClickCategory = (category) => {
		const params = new URLSearchParams(
			searchParams.toString()
		)
		// setCategory(category.id)
		params.set("category", category.id)
		router.push(`products/?${params.toString()}`)
	}

	const onClickAccount = () => {
		if (user?.id) {
			router.push("/account")
			return
		}
		router.push("/login")
	}

	const onClickLogo = () => {
		router.push("/")
	}

	return (
		<div className='fixed top-0 z-30 inset-x-0 px-10 h-[50px] bg-white/20 backdrop-blur-md'>
			<div className='mx-3 mt-3'>
				<div className='flex w-full items-center gap-[10px] justify-evenly'>
					<div className='lg:hidden p-2'>
						<CategoryPhone />
					</div>

					<div onClick={onClickLogo} className='shrink-0'>
						<Image
							alt=''
							src={"/images/1x/Asset1.png"}
							width={81.081081}
							height={20}
						/>
					</div>

					<ul className='hidden md:flex overflow-x-scroll flex-nowrap noneScrollBar my-2'>
						<motion.li
							whileHover={{ color: "rgb(239, 68, 68)" }}
							animate={{
								color:
									currentCateId === ""
										? "rgb(239, 68, 68)"
										: "rgb(0, 0, 0, 0.8)",
							}}
							onClick={() => router.push("/products")}
							className='text-[1.3rem] font-[300] capitalize mx-2 text-black/80 cursor-pointer whitespace-nowrap	'
						>
							All
						</motion.li>

						{categories?.map((category, i) => (
							<motion.li
								key={i}
								className='text-[1.3rem] font-[300] capitalize mx-2 text-black/80 cursor-pointer whitespace-nowrap'
								whileHover={{ color: "rgb(239, 68, 68)" }} // whileHover={{ color: "red" }}
								animate={{
									color:
										currentCateId === category.id // isActive
											? "rgb(239, 68, 68)"
											: "rgb(0, 0, 0, 0.8)",
									// criteria.category === category.id // isActive
									// 	? "rgb(239, 68, 68)"
									// 	: "rgb(0, 0, 0, 0.8)",
								}}
								// style={{
								// 	color:
								// 		criteria.category === category.id &&
								// 		"rgb(239, 68, 68)",
								// }}
								onClick={() => onClickCategory(category)}
							>
								{category.name}
							</motion.li>
						))}
					</ul>

					<motion.div className='grow-[1] '>
						<SearchBar />
					</motion.div>

					<motion.div className=' p-2 '>
						<Cart />
					</motion.div>

					<motion.div
						onClick={onClickAccount}
						whileHover={{ color: "#dc2626" }}
						className='md:block cursor-pointer'
					>
						<CiUser size={25} />
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export default Header
