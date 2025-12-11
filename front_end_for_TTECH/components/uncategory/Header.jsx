"use client"
import { UserAuth } from "@/context/AuthContext"
import { categoryApi } from "@/lib/api/category.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { motion } from "framer-motion"
import Image from "next/image"
import {
	usePathname,
	useRouter,
	useSearchParams,
} from "next/navigation"
import { useEffect, useState } from "react"
import { CiUser } from "react-icons/ci"
import Cart from "../cart/Cart"
import CategoryPhone from "./CategoryPhone"
import SearchBar from "./SearchBar"

const Header = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { user } = UserAuth()
	const [categoryList, setCategoryList] = useState([])
	const [onCategoryId, setOnCategoryId] = useState("")

	useEffect(() => {
		const listCategories = async () => {
			const apiRes = await clientFetch(categoryApi.list())
			if (apiRes.success === false) {
				alert(`Lỗi lấy ngành hàng cho Header: ${apiRes.error}`)
				return
			}
			setCategoryList(apiRes.data)
		}

		listCategories()
	}, [])

	useEffect(() => {
		if (pathname === "/products") {
			setOnCategoryId("all")
		}

		const params = new URLSearchParams(
			searchParams.toString()
		)

		if (Number(params.get("category"))) {
			setOnCategoryId(Number(params.get("category")))
		}
	}, [searchParams, pathname])

	const onClickCategory = (category) => {
		const params = new URLSearchParams(
			searchParams.toString()
		)
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
									onCategoryId === "all"
										? "rgb(239, 68, 68)"
										: "rgb(0, 0, 0, 0.8)",
							}}
							onClick={() => router.push("/products")}
							className='text-[1.3rem] font-[300] capitalize mx-2 text-black/80 cursor-pointer whitespace-nowrap	'
						>
							All
						</motion.li>

						{categoryList?.map((category, i) => (
							<motion.li
								key={i}
								className='text-[1.3rem] font-[300] capitalize mx-2 text-black/80 cursor-pointer whitespace-nowrap'
								whileHover={{ color: "rgb(239, 68, 68)" }}
								animate={{
									color:
										onCategoryId === category.id
											? "rgb(239, 68, 68)"
											: "rgb(0, 0, 0, 0.8)",
								}}
								onClick={() => onClickCategory(category)}
							>
								{category.name}
							</motion.li>
						))}
					</ul>

					<motion.div className='grow-[1] '>
						<SearchBar />
					</motion.div>

					<motion.div className='p-2 '>
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
