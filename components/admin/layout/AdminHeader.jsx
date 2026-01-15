"use client"
import AccountManagement from "@/components/admin/accounts/AccountManagement"
import CampaignManagement from "@/components/admin/campaigns/CampaignManagement"
import CategoryManagement from "@/components/admin/categories/CategoryManagement"
import CustomerManagement from "@/components/admin/customers/CustomerManagement"
import CustomerMessage from "@/components/admin/customers/CustomerMessage"
import AdminDashboard from "@/components/admin/dashboard/AdminDashboard"
import OrderManagement from "@/components/admin/orders/OrderManagement"
import ProductManagement from "@/components/admin/products/ProductManagement"
import MembershipManagement from "@/components/admin/memberships/MembershipManagement"
import SeriesManagement from "@/components/admin/series/SeriesManagement"
import Image from "next/image"
import AdminNotification from "./AdminNotification"

const AdminHeader = ({ route, onRouteChange }) => {
	return (
		<div className='mx-4 mt-4'>
			<div className='flex justify-between items-center'>
				<div className='flex items-center gap-2'>
					<Image
						src={"/images/0.5x/Asset_9@0.5x.png"}
						width={30}
						alt=''
						height={30}
						style={{ objectFit: "contain" }}
					/>
					<h1 className='text-[1.7rem] font-[800]'>T-TECH</h1>
				</div>

				<ul className=' flex capitalize text-[1.4rem] gap-5 items-center'>
					{AdminRouteList.map((r) => (
						<li
							key={r.id}
							className='cursor-pointer'
							style={{
								color: r.id === route ? "#db2777" : "black",
							}}
							onClick={() => {
								onRouteChange(r.id)
							}}
						>
							{r.id}
						</li>
					))}
				</ul>

				<div>
					<AdminNotification />
				</div>
			</div>
		</div>
	)
}

export default AdminHeader

export const AdminRouteList = [
	{
		id: "dashboard",
		component: AdminDashboard,
	},
	{
		id: "product",
		component: ProductManagement,
	},
	{
		id: "order",
		component: OrderManagement,
	},
	{
		id: "campagins",
		component: CampaignManagement,
	},
	{
		id: "customer",
		component: CustomerManagement,
	},
	{
		id: "membership",
		component: MembershipManagement,
	},
	// {
	// 	id: "message",
	// 	component: CustomerMessage,
	// },
	{
		id: "category",
		component: CategoryManagement,
	},
	{
		id: "series",
		component: SeriesManagement,
	},
	{
		id: "profile",
		component: AccountManagement,
	},
]
