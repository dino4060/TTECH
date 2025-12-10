"use client"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { CiMinimize1, CiSearch } from "react-icons/ci"
import useDebounce from "../../hooks/useDebounce"
import { clientFetch } from "@/lib/http/fetch.client"
import { productApi } from "@/lib/api/product.api"

const SearchBar = () => {
	const [showSearchPage, setShowSearchPage] = useState(false)
	const [shortProducts, setShortProducts] = useState([])
	const [keywords, setKeywords] = useState("")
	const router = useRouter()
	const searchParams = useSearchParams()
	const keywordsDeb = useDebounce(keywords, 500)

	useEffect(() => {
		const params = new URLSearchParams(
			searchParams.toString()
		)
		setKeywords(params.get("keywords"))
	}, [searchParams])

	useEffect(() => {
		const searchShortProducts = async () => {
			const apiRes = await clientFetch(
				productApi.list({
					keywords: keywordsDeb,
				})
			)
			if (apiRes.success === false) {
				alert(`Lỗi lấy danh sách sản phẩm: ${apiRes.error}`)
				return
			}
			setShortProducts(apiRes.data.items)
		}

		searchShortProducts()
	}, [keywordsDeb])

	const onPressEnterKey = (e) => {
		const navigateSearchPage = (keywords) => {
			const params = new URLSearchParams(
				searchParams.toString()
			)
			params.set("keywords", keywords)
			router.push(`products/?${params.toString()}`)
		}

		if (e.key === "Enter") {
			navigateSearchPage(keywords)
			setShowSearchPage(false)
		}
	}

	useEffect(() => {
		const handleKeyPress = (event) => {
			if (event.key === "Escape") {
				setShowSearchPage(false)
			}
		}

		window.addEventListener("keydown", handleKeyPress)

		return () => {
			window.removeEventListener("keydown", handleKeyPress)
		}
	}, [])

	return (
		<div>
			<AnimatePresence>
				{showSearchPage && (
					<motion.div
						initial={{
							y: "-100%",
							scaleY: 0,
							opacity: 0,
						}}
						animate={{ y: 0, scaleY: 1, opacity: 1 }}
						exit={{ y: "-100%", scaleY: 0, opacity: 0 }}
						className=' absolute h-[100vh] z-[51] inset-0 backdrop-blur-2xl text-black origin-top'
						transition={{ type: "tween" }}
					>
						<div className='absolute z-[51] inset-x-0 top-0 bottom-0 md:bottom-[90px] bg-[#efeff1]'>
							<motion.div
								whileInView={{ scaleY: [0, 1] }}
								transition={{ delay: 0.1 }}
								className='flex flex-col w-[60%] mt-[10%] mx-auto items-center origin-top'
							>
								<div className='flex items-center gap-2 justify-between  w-full'>
									<motion.form
										onSubmit={(e) => e.preventDefault()}
										className='flex items-center w-full gap-2 justify-start'
									>
										<CiSearch size={20} />
										<motion.input
											autoFocus
											placeholder='Tìm Kiếm'
											value={keywords}
											onKeyPress={onPressEnterKey}
											onChange={(e) => {
												setKeywords(e.target.value)
											}}
											type='text'
											className='outline-none bg-[#efeff1] w-full text-[2rem] font-semibold '
										/>
									</motion.form>

									<motion.div
										whileHover={{ scale: 1.1 }}
										onClick={() => setShowSearchPage(false)}
									>
										<CiMinimize1 size={20} />
									</motion.div>
								</div>

								<div className='w-full mt-10flex flex-col justify-start items-start'>
									{shortProducts?.slice(0, 6)?.map((x, i) => (
										<motion.h1
											key={i}
											className='text-black text-[2rem] font-[700] cursor-pointer'
											whileHover={{ color: "#dc2626" }}
											onClick={() => {
												router.push("/products/" + x?.id)
												setShowSearchPage(false)
											}}
										>
											{x?.name}
										</motion.h1>
									))}
								</div>
							</motion.div>
						</div>

						<motion.div
							whileInView={{ opacity: [0, 1] }}
							onClick={() => setShowSearchPage(false)}
							className='absolute inset-0 bg-black/50 backdrop-blur-3xl'
						></motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			<div className='items-center w-full flex justify-end'>
				<motion.div
					whileHover={{ scale: 1.1, color: "#dc2626" }}
					onClick={() => {
						setShowSearchPage((pre) => !pre)
					}}
					className='cursor-pointer'
				>
					<CiSearch size={22} />
				</motion.div>
			</div>
		</div>
	)
}

export default SearchBar
