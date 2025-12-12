"use client"
import { adminDashboardApi } from "@/lib/api/dashboard.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { useEffect, useState } from "react"
import {
	BiLineChart,
	BiLineChartDown,
} from "react-icons/bi"
import { CiCreditCard1 } from "react-icons/ci"
import {
	convertPercent,
	convertTo000D,
	getCurrentMonth,
	getLastMonth,
} from "../../../lib/utils/number2"

const RevenueFigure = () => {
	const [revenue, setRevenue] = useState(DefaultRevenue)

	useEffect(() => {
		const calcRevenue = async () => {
			const apiRes = await clientFetch(
				adminDashboardApi.overview()
			)
			if (apiRes.success === false) {
				alert(`Lỗi tính số liệu doanh thu: ${apiRes.error}`)
			}
			setRevenue(apiRes.data)
		}

		calcRevenue()
	}, [])

	return (
		<div className='text-white rounded-2xl'>
			<div className='rounded-3xl border border-black/20 px-2 py-10 bg-white text-black'>
				<div className='w-full px-8 top-8'>
					<div className='flex justify-between'>
						<div className=''>
							<h1 className='font-light'>Name</h1>
							<h1 className='font-medium tracking-widest'>
								T-TECH
							</h1>
						</div>
						<div>
							<CiCreditCard1 size={30} />
						</div>
					</div>

					<div className='pt-1'>
						<h1 className='font-light'>
							<span>Doanh thu tháng </span>
							{getCurrentMonth()}
						</h1>
						<div className='flex items-center gap-3'>
							<div className='font-bold text-[2rem] tracking-more-wider'>
								{convertTo000D(revenue.thisMonthRevenue)}
							</div>

							<div className='flex items-center text-[1.2rem] gap-1'>
								{revenue.percentDifference >= 0 ? (
									<BiLineChart size={15} color='green' />
								) : (
									<BiLineChartDown size={15} color='red' />
								)}
								{convertPercent(revenue.percentDifference)}
							</div>
						</div>
					</div>

					<div className='pt-1'>
						<h1 className='font-light'>
							<span>Doanh thu tháng </span>
							{getLastMonth()}
						</h1>
						<div className='font-bold text-[2rem] tracking-more-wider'>
							{convertTo000D(revenue.lastMonthRevenue)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RevenueFigure

const DefaultRevenue = {
	thisMonthRevenue: 0,
	lastMonthRevenue: 0,
	percentDifference: 0,
}
