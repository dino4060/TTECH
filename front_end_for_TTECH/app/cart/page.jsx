"use client"

import CartDetail from "@/components/cart/CartDetail"
import OrderBill from "@/components/order/OrderBill"
import { useEffect, useState } from "react"
import { handleCart } from "../api/handleCart"
import { handleDiscount } from "../api/handleDiscount."
import { TTECH_TOKEN } from "@/lib/constants/string"
import clientLocal from "@/lib/storage/local.client"
import { clientFetch } from "@/lib/http/fetch.client"
import { cartApi } from "@/lib/api/cart.api"

const Page = () => {
	const [cart, setCart] = useState([1, 2, 3, 4])

	useEffect(() => {
		const getCart = async () => {
			const { data } = await clientFetch(cartApi.get())
			setCart(data)
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
