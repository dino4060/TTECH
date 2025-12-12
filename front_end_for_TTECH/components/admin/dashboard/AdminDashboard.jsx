"use client"
import BestSellProduct from "@/components/product/BestSellProduct"
import SalesFigure from "@/components/admin/dashboard/SalesFigure"
import AdminRevenueChart from "./RevenueChart"
import AdminVisitorChart from "./VisitorChart"
import RevenueFigure from "./RevenueFigure"

const AdminDashboard = () => {
	return (
		<div className=' h-[150vh] mt-10'>
			<div className='flex gap-4'>
				<div className='flex-1 flex flex-col gap-4'>
					<RevenueFigure />
					<SalesFigure />
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
