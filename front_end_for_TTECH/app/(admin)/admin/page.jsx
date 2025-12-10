"use client"
import AdminCampaignManagement from "@/components/admin/AdminCampaignManagement"
import CategoryManagement from "@/components/admin/categories/CategoryManagement"
import CustomerManagement from "@/components/admin/customers/CustomerManagenent"
import AdminProfileManagement from "@/components/admin/AdminProfileManagement"
import SeriesManagement from "@/components/admin/series/SeriesManagement"
import CustomerMessage from "@/components/admin/customers/CustomerMessage"
import { UserAuth } from "@/context/AuthContext"
import { AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import AdminDashboard from "../../../components/admin/AdminDashboard"
import AdminNavigator from "../../../components/admin/AdminNavigator"
import OrderManagement from "../../../components/admin/orders/OrderManagement"
import AdminProductManagement from "../../../components/admin/AdminProductManagement"

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
				{route === "product" && <AdminProductManagement />}
				{route === "order" && <OrderManagement />}
				{route === "customer" && <CustomerManagement />}
				{route === "message" && <CustomerMessage />}
				{route === "marketing" && <AdminCampaignManagement />}
				{route === "series" && <SeriesManagement />}
				{route === "category" && <CategoryManagement />}
				{route === "profile" && <AdminProfileManagement />}
			</AnimatePresence>
		</div>
	)
}

export default Page
