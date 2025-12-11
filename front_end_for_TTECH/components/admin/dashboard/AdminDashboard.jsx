"use client"
import BestSellProduct from "@/components/product/BestSellProduct"
import CountingInfo from "@/components/uncategory/CountingInfo"
import AdminRevenueChart from "./AdminRevenueChart"
import AdminVisitorChart from "./AdminVisitorChart"
import CompareRevenue from "./CompareRevenue"

const AdminDashboard = () => {
	return (
		<div className=' h-[150vh] mt-10'>
			<div className='flex gap-4'>
				<div className='flex-1 flex flex-col gap-4'>
					<div className='rounded-2xl'>
						<CompareRevenue />
					</div>
					<CountingInfo />
				</div>

				<div className='bg-white border border-black/20 w-[60%] flex flex-col  shadow-sm p-10 rounded-3xl'>
					<AdminRevenueChart />
				</div>
			</div>
			<div className='flex'>
				<AdminVisitorChart />
				<BestSellProduct />
			</div>
		</div>
	)
}

export default AdminDashboard
