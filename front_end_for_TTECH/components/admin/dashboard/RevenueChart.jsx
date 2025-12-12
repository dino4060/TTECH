"use client"
import { adminDashboardApi } from "@/lib/api/dashboard.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { faker } from "@faker-js/faker"
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from "chart.js"
import { Fragment, useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import { CiWavePulse1 } from "react-icons/ci"

const AdminRevenueChart = () => {
	const [chartType, setChartType] = useState("WEEK")
	const [chartData, setChartData] = useState(DefaultWeekData)

	useEffect(() => {
		if (chartType === "WEEK") {
			const calcWeeklyRevenue = async () => {
				const apiRes = await clientFetch(
					adminDashboardApi.calcRevenueByWeek()
				)
				if (apiRes.success === false) {
					alert(`Lỗi tính doanh thu theo tuần: ${apiRes.error}`)
					return
				}
				const WeekData = {
					labels: apiRes.data.map((day) => day.id),
					datasets: [
						{
							backgroundColor: "#93c5fd",
							label: "Doanh thu theo tuần",
							data: apiRes.data.map((day) => day.revenue * 1000),
						},
					],
				}
				setChartData(WeekData)
			}
			calcWeeklyRevenue()
			return
		}
	}, [chartType])

	return (
		<Fragment>
			<div className='flex justify-between'>
				<div className='text-[1.5rem] font-[700] flex gap-2 items-center'>
					<CiWavePulse1 size={25} /> <h1>Revenue Chart</h1>
				</div>

				<div>
					<select
						id='countries'
						className='bg-white border text-[1.1rem] text-black rounded-lg block w-full p-2.5
            focus:outline-none focus:border-2'
						onChange={(e) => setChartType(e.target.value)}
					>
						<option
							value='YEAR'
							selected={"YEAR" === chartType}
							disabled
						>
							This year
						</option>
						<option
							value='MONTH'
							selected={"MONTH" === chartType}
							disabled
						>
							This month
						</option>
						<option value='WEEK' selected={"WEEK" === chartType}>
							This week
						</option>
					</select>
				</div>
			</div>

			<Line
				options={{
					responsive: true,
					plugins: {
						legend: {
							position: "top",
						},
						title: {
							display: false,
						},
					},
				}}
				data={chartData}
			/>
		</Fragment>
	)
}

export default AdminRevenueChart

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	LineElement,
	PointElement
)

export const DefaultWeekData = {
	labels: getCurrWeekLabels(),
	datasets: [
		{
			backgroundColor: "#93c5fd",
			label: "Doanh thu theo tuần",
			data: getCurrWeekLabels().map(() =>
				faker.number.int({ min: 10, max: 1000 })
			),
		},
	],
}

function getCurrWeekLabels() {
	const WeekLabels = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	]
	const today = new Date()
	const todayIndex = today.getDay()
	if (todayIndex === 0) return WeekLabels
	return WeekLabels.slice(0, todayIndex)
}
