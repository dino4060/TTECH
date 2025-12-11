"use client"
import AdminHeader, {
	AdminRouteList,
} from "@/components/admin/layout/AdminHeader"
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
			<AdminHeader route={route} onRouteChange={setRoute} />

			<AnimatePresence>
				{AdminRouteList.map(
					(r) =>
						r.route === route && <r.component key={r.route} />
				)}
			</AnimatePresence>
		</div>
	)
}

export default Page
