"use client"
import { adminUserApi } from "@/lib/api/user.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { useEffect, useState } from "react"
import CustomerRenderList from "./CustomerRenderList"

const CustomerManagement = () => {
	const [customerList, setCustomerList] = useState([
		{
			id: "bdf9bc14-719c-481a-8da1-5d0b8446b2e0",
			name: "Hoàng Linh",
			email: "LinhTinhTinh@gmail.com",
			phone: "0856661768",
			role: ["CUSTOMER"],
			createdAt: "0001-01-01T00:00:00",
			updatedAt: "0001-01-01T00:00:00",
		},
	])

	useEffect(() => {
		const getCustomerList = async () => {
			const apiRes = await clientFetch(
				adminUserApi.customerApi.list()
			)
			if (apiRes.success === false) {
				alert(`Lỗi lấy danh sánh khách hàng: ${apiRes.error}`)
				return
			}
			setCustomerList(apiRes.data.items)
		}

		getCustomerList()
	}, [])

	return (
		<div className='container mt-10'>
			<div>
				<CustomerRenderList customerList={customerList} />
			</div>
		</div>
	)
}

export default CustomerManagement
