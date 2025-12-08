"use client"
import AdminCampaignManagement from "@/components/admin/AdminCampaignManagement"
import AdminCategoryManagement from "@/components/admin/AdminCategoryManagement"
import AdminCustomerManagement from "@/components/admin/AdminCustomerManagement"
import AdminProfileManagement from "@/components/admin/AdminProfileManagement"
import AdminSupplierManagement from "@/components/admin/AdminSupplierManagement"
import CustomerMessage from "@/components/admin/customerManagement/CustomerMessage"
import { UserAuth } from "@/context/AuthContext"
import { AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import AdminDashboard from "../../../components/admin/AdminDashboard"
import AdminNavigator from "../../../components/admin/AdminNavigator"
import AdminOrderManagement from "../../../components/admin/AdminOrderManagement"
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
				{route === "order" && <AdminOrderManagement />}
				{route === "customer" && <AdminCustomerManagement />}
				{route === "message" && <CustomerMessage />}
				{route === "marketing" && <AdminCampaignManagement />}
				{route === "supplier" && <AdminSupplierManagement />}
				{route === "category" && <AdminCategoryManagement />}
				{route === "profile" && <AdminProfileManagement />}
			</AnimatePresence>
		</div>
	)
}

export default Page
