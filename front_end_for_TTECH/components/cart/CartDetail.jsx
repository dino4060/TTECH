"use client"

import { UserAuth } from "@/context/AuthContext"
import { cartApi } from "@/lib/api/cart.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { convertToVND } from "@/utils/until"
import {
	CiCircleMinus,
	CiCirclePlus,
	CiCircleRemove,
} from "react-icons/ci"

const CartDetail = ({ cart, setCart }) => {
	const { token, user } = UserAuth()

	const onDownQuantity = async (skuId, quantity) => {
		if (quantity === 1) return

		const cartItem = cart.cartItems.find(
			(item) => item.sku.id === skuId
		)
		cartItem.quantity = quantity - 1
		setCart({ ...cart })

		await clientFetch(
			cartApi.updateQuantity({
				skuId,
				quantity: quantity - 1,
			})
		)
	}

	const onUpQuantity = async (skuId, quantity) => {
		if (quantity === 20) return

		const cartItem = cart.cartItems.find(
			(item) => item.sku.id === skuId
		)
		cartItem.quantity = quantity + 1
		setCart({ ...cart })

		await clientFetch(
			cartApi.updateQuantity({
				skuId,
				quantity: quantity + 1,
			})
		)
	}

	const onRemoveLine = async (skuId) => {
		cart.cartItems = cart.cartItems.filter(
			(item) => item.sku.id !== skuId
		)
		setCart({ ...cart })

		await clientFetch(cartApi.removeLine({ skuIds: [skuId] }))
	}

	return (
		<div className='flex flex-row gap-10 flex-wrap justify-center max-h-[600px] overflow-y-scroll customScrollBar'>
			{cart?.cartItems?.map((x) => {
				return (
					<div
						key={x.id}
						className='flex flex-col items-center p-4 rounded-3xl bg-white'
					>
						<div className='w-[200px] h-[200px] rounded-3xl select-none'>
							<img
								src={x?.product?.thumb}
								className='w-full h-full object-cover p-4 rounded-2xl'
							/>
						</div>
						<h2 className='text-[1.6rem] select-none w-[100px] text-center text-ellipsis font-semibold '>
							{x?.product?.name || "Loading..."}
						</h2>

						<h3 className='text-[1.4rem] mt-4 select-none text-black/80 font-semibold '>
							{convertToVND(x?.price?.mainPrice || 0)}
						</h3>

						<div className='inline-flex mt-2 bg-blue-500/80 px-2 py-1 text-white rounded-full items-center text-xl justify-center gap-2'>
							<div
								className='cursor-pointer hover:bg-white hover:text-blue-500/80 hover:rounded-full'
								onClick={() => onDownQuantity(x.sku.id, x.quantity)}
							>
								<CiCircleMinus size={25} />
							</div>
							<h3 className='select-none w-5 text-center'>
								{x?.quantity || 0}
							</h3>
							<div
								className='cursor-pointer hover:bg-white hover:text-blue-500/80 hover:rounded-full'
								onClick={() => onUpQuantity(x.sku.id, x.quantity)}
							>
								<CiCirclePlus size={25} />
							</div>
							<div
								className='cursor-pointer hover:bg-red-500/80 hover:rounded-full'
								onClick={() => onRemoveLine(x.sku.id)}
							>
								<CiCircleRemove size={25} />
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default CartDetail
