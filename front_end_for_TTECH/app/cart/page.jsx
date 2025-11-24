"use client"
import CartDetail from "@/components/cart/CartDetail"
import OrderBill from "@/components/order/OrderBill"
import { cartApi } from "@/lib/api/cart.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { useEffect, useState } from "react"

const Page = () => {
	const [cart, setCart] = useState([1, 2, 3, 4])

	useEffect(() => {
		const getCart = async () => {
			const { success, data } = await clientFetch(
				cartApi.get()
			)
			success && setCart(data)
		}
		getCart()
	}, [])

	return (
		<div className='mt-20 mx-auto container mb-24'>
			<div className='w-full flex gap-10 justify-center flex-col md:flex-row '>
				<CartDetail cart={cart} setCart={setCart} />
				<OrderBill cart={cart} setCart={setCart} />
			</div>
		</div>
	)
}

export default Page
