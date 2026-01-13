"use client"
import { UserAuth } from "@/context/AuthContext"
import { AnimatePresence, motion } from "framer-motion"
import { CiLogout } from "react-icons/ci"
import UserDataForm from "../../components/user/UserDataForm"
import UserOrder from "../../components/user/UserOrder"
import { memberApi } from "@/lib/api/member.api"
import { useEffect, useState } from "react"
import { clientFetch } from "@/lib/http/fetch.client"

const Page = () => {
	const { user, logout } = UserAuth()
	const [membership, setMembership] = useState(null)
	const [isHover, setHover] = useState(false)
	const [isAsyncPoints, setAsyncPoints] = useState(false)

	useEffect(() => {
		const fetchMembership = async () => {
			if (!user?.id) return

			const res = await clientFetch(
				memberApi.offerMembership()
			)

			if (res.success === false) {
				console.error("Lỗi lấy thông tin hội viên:", res.error)
				return
			}

			setMembership(res.data)
		}
		fetchMembership()
	}, [user?.id, isAsyncPoints])

	return (
		<div className='container mx-auto'>
			<div className='flex justify-between items-center mx-2'>
				<motion.div className='text-[5rem] font-[300] uppercase h-[60px] leading-[60px]'>
					<motion.div
						initial='offscreen'
						whileInView='onscreen'
						transition={{ staggerChildren: 0.1 }}
						className='font-[600]'
					>
						HY! {user?.name}
					</motion.div>
				</motion.div>

				<div className='flex items-center gap-6'>
					{/* Membership Pill Section */}
					{membership && (
						<div className='relative'>
							<div
								onMouseEnter={() => setHover(true)}
								onMouseLeave={() => setHover(false)}
								className='bg-blue-400 rounded-full p-2 flex items-center gap-4 cursor-pointer shadow-md transition-transform active:scale-95'
							>
								<div className='bg-white px-6 py-1 rounded-full text-blue-400 font-bold text-[1.4rem]'>
									{membership.membershipCode}
								</div>

								<div className='text-white pr-4 font-semibold text-[1.4rem]'>
									{membership.points} điểm
								</div>
							</div>

							{/* Tooltip Benefits Table */}
							<AnimatePresence>
								{isHover && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 10 }}
										className='absolute top-[120%] right-0 bg-white shadow-2xl rounded-2xl p-6 z-[100] border w-[350px]'
									>
										<h4 className='text-[1.6rem] font-bold text-gray-800 mb-4 border-b pb-2'>
											Quyền lợi của bạn
										</h4>
										<div className='flex flex-col gap-3'>
											{membership.benefits?.length > 0 ? (
												membership.benefits.map((b) => (
													<div
														key={b.id}
														className='flex justify-between items-center text-[1.3rem]'
													>
														<div className='flex flex-col'>
															<span className='font-medium text-gray-700'>
																{b.benefitName}
															</span>
															{b.minSpend > 0 && (
																<span className='text-[1.1rem] text-gray-400'>
																	Đơn từ {b.minSpend}đ
																</span>
															)}
															{b.limitPerCustomer > 0 && (
																<span className='text-[1.1rem] text-gray-400'>
																	Dùng {b.limitPerCustomer} lần
																</span>
															)}
														</div>
														<span className='text-blue-500 font-bold'>
															{b.benefitValue}
															{b.benefitUnit === "PERCENT"
																? "%"
																: b.benefitUnit === "FIXED"
																? "K"
																: " tháng"}
														</span>
													</div>
												))
											) : (
												<p className='text-[1.2rem] italic text-gray-400'>
													Chưa có ưu đãi đặc biệt
												</p>
											)}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					)}
				</div>

				<CiLogout
					size={25}
					onClick={() => logout()}
					className='bg-red-500 text-white p-2 rounded-3xl cursor-pointer'
				/>
			</div>

			<UserDataForm />
			<UserOrder setAsyncPoints={setAsyncPoints} />
		</div>
	)
}
export default Page
