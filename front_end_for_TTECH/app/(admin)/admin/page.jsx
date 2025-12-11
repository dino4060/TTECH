"use client"
import AccountManagement from "@/components/admin/accounts/AccountManagement"
import CampaignManagement from "@/components/admin/campaigns/CampaignManagement"
import CategoryManagement from "@/components/admin/categories/CategoryManagement"
import CustomerManagement from "@/components/admin/customers/CustomerManagement"
import CustomerMessage from "@/components/admin/customers/CustomerMessage"
import AdminDashboard from "@/components/admin/dashboard/AdminDashboard"
import AdminNavigator from "@/components/admin/dashboard/AdminNavigator"
import OrderManagement from "@/components/admin/orders/OrderManagement"
import ProductManagement from "@/components/admin/products/ProductManagement"
import SeriesManagement from "@/components/admin/series/SeriesManagement"
import { UserAuth } from "@/context/AuthContext"
import { AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Page = () => {
	const [route, setRoute] = useState("dashboard")
	const router = useRouter()
	const { user } = UserAuth()

	useEffect(() => {
		if (!user.roles || !user.roles.includes("ADMIN")) {
			return router.push("/")
		}
	}, [user])

	return (
		<div className='container mx-auto'>
			<AdminNavigator route={route} onRouteChange={setRoute} />

			<AnimatePresence>
				{route === "dashboard" && <AdminDashboard />}
				{route === "product" && <ProductManagement />}
				{route === "order" && <OrderManagement />}
				{route === "customer" && <CustomerManagement />}
				{route === "message" && <CustomerMessage />}
				{route === "marketing" && <CampaignManagement />}
				{route === "series" && <SeriesManagement />}
				{route === "category" && <CategoryManagement />}
				{route === "profile" && <AccountManagement />}
			</AnimatePresence>
		</div>
	)
}

export default Page
