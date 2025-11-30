"use client"
import { orderApi } from "@/lib/api/order.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { checkKV } from "@/lib/utils/check"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { CiGrid41, CiHome } from "react-icons/ci"

const Page = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const orderId = searchParams.get("orderInfo")

	const fetchMaskPendingOrder = async (id) => {
		if (!id) return

		const res = await clientFetch(
			orderApi.update({ id, status: "PENDING" })
		)

		if (res.success) {
			checkKV("INFO", `Masked the order-${id} as PENDING.`)
		} else {
			alert(res.error)
		}
	}

	// orderId is truthy => mask order as PENDING
	useEffect(() => {
		orderId && fetchMaskPendingOrder(orderId)
	}, [orderId])

	return (
		<div className='w-full h-screen bg-black'>
			<div className='fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'>
				<h1 className='text-[4rem] leading-[4rem] lg:text-[7rem] mx-auto text-blue-200 capitalize w-full lg:leading-[7rem] text-center font-[700]'>
					Tuyệt! Đơn hàng của bạn đã được thanh toán thành công.
				</h1>
				<div className='flex justify-center items-center gap-10'>
					<div className='flex flex-col items-center gap-5'>
						<h2 className='text-4xl text-white text-center mt-20'>
							Về trang chủ
						</h2>
						<CiHome
							onClick={() => router.push("/")}
							size={50}
							className='text-white cursor-pointer p-4 bg-blue-600 rounded-full'
						/>
					</div>

					<div className='flex flex-col items-center gap-5'>
						<h2 className='text-4xl text-white text-center mt-20'>
							Xem đơn hàng
						</h2>
						<CiGrid41
							onClick={() => router.push("/account")}
							size={50}
							className='text-white cursor-pointer p-4 bg-blue-600 rounded-full'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Page
