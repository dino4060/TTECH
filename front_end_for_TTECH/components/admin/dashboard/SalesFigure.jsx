import { adminDashboardApi } from "@/lib/api/dashboard.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { useEffect, useState } from "react"
import { CiShoppingBasket, CiUser } from "react-icons/ci"

const SalesFigure = () => {
	const [sales, setSales] = useState(DefaultSales)

	useEffect(() => {
		const calcSales = async () => {
			const apiRes = await clientFetch(
				adminDashboardApi.calcSales()
			)
			if (apiRes.success === false) {
				alert(`Lỗi tính số liệu doanh thu: ${apiRes.error}`)
			}
			setSales(apiRes.data)
		}
		calcSales()
	}, [])
	return (
		<div className='flex flex-1 gap-4 '>
			<div className=' bg-gradient-to-tl from-blue-300 to-blue-600 rounded-2xl p-5 flex-col justify-center gap-5 flex flex-1 text-white'>
				<div>
					<CiUser size={30} />
				</div>
				<div>
					<div className='text-[1.1rem] capitalize leading-8 mb-1'>
						Tổng người dùng
					</div>
					<div className='font-[700] text-[2.5rem]'>
						{sales?.users}
					</div>
				</div>
			</div>
			<div className=' rounded-2xl bg-gradient-to-tr from-blue-300 to-blue-600 p-5 flex-col justify-center gap-5 flex flex-1 text-white'>
				<div>
					<CiShoppingBasket size={30} />
				</div>
				<div>
					<div className='text-[1.1rem] capitalize leading-8 mb-1'>
						Tổng đơn hàng
					</div>
					<div className='font-[700] text-[2.5rem]'>
						{sales?.orders}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SalesFigure

const DefaultSales = {
	users: 0,
	orders: 0,
}
