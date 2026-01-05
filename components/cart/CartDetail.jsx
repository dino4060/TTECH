"use client"
import { cartApi } from "@/lib/api/cart.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { convertTo000D } from "@/lib/utils/number2"
import {
	CiCircleMinus,
	CiCirclePlus,
	CiCircleRemove,
} from "react-icons/ci"

const CartDetail = ({ cart, setCart }) => {
	const onDownQuantity = async (productId, quantity) => {
		if (quantity === 1) return

		const cartLine = cart.lines.find(
			(l) => l.product.id === productId
		)
		cartLine.quantity = quantity - 1
		setCart({ ...cart })

		await clientFetch(
			cartApi.updateQuantity({
				productId,
				quantity: quantity - 1,
			})
		)
	}

	const onUpQuantity = async (productId, quantity) => {
		if (quantity === 20) return

		const cartLine = cart.lines.find(
			(l) => l.product.id === productId
		)
		cartLine.quantity = quantity + 1
		setCart({ ...cart })

		await clientFetch(
			cartApi.updateQuantity({
				productId,
				quantity: quantity + 1,
			})
		)
	}

	const onRemoveLine = async (productId) => {
		cart.lines = cart.lines.filter(
			(l) => l.product.id !== productId
		)
		setCart({ ...cart })

		await clientFetch(
			cartApi.removeLine({ productIds: [productId] })
		)
	}

	return (
		<div className='flex flex-row gap-10 flex-wrap justify-center max-h-[600px] overflow-y-scroll customScrollBar'>
			{cart?.lines?.map((l) => {
				return (
					<div
						key={l.id}
						className='flex flex-col items-center p-4 rounded-3xl bg-white'
					>
						<div className='w-[200px] h-[200px] rounded-3xl select-none'>
							<img
								src={l?.product?.thumb}
								className='w-full h-full object-cover p-4 rounded-2xl'
							/>
						</div>
						{/* <h2 className='text-[1.4rem] text-black/80 select-none w-[100px] text-center text-ellipsis font-semibold'>
							{l?.product?.name || "Loading..."}
						</h2> */}
						<h2
							className='text-[1.4rem] text-black/80 font-semibold text-center
              w-[110px] h-[60px] overflow-hidden text-ellipsis line-clamp-3 select-none'
						>
							{l?.product?.name || "Loading..."}
						</h2>

						{l?.product?.price?.dealPercent > 0 ? (
							// Có giảm giá
							<div className='flex gap-3 items-center'>
								<h3 className='text-[1.6rem] mt-4 select-none font-semibold'>
									{convertTo000D(l?.product?.price?.mainPrice || 0)}
								</h3>
								<h2 className='text-xl mt-4 text-gray-400 line-through'>
									{convertTo000D(l?.product?.price?.sidePrice || 0)}
								</h2>
							</div>
						) : (
							// Không giảm giá
							<h3 className='text-[1.6rem] mt-4 select-none font-semibold'>
								{convertTo000D(
									l?.product?.price?.mainPrice || "Loading..."
								)}
							</h3>
						)}

						<div className='inline-flex mt-2 bg-blue-500/80 px-2 py-1 text-white rounded-full items-center text-xl justify-center gap-2'>
							<div
								className='cursor-pointer hover:bg-white hover:text-blue-500/80 hover:rounded-full'
								onClick={() =>
									onDownQuantity(l.product.id, l.quantity)
								}
							>
								<CiCircleMinus size={25} />
							</div>
							<h3 className='select-none w-5 text-center'>
								{l?.quantity || 0}
							</h3>
							<div
								className='cursor-pointer hover:bg-white hover:text-blue-500/80 hover:rounded-full'
								onClick={() =>
									onUpQuantity(l.product.id, l.quantity)
								}
							>
								<CiCirclePlus size={25} />
							</div>
							<div
								className='cursor-pointer hover:bg-red-500/80 hover:rounded-full'
								onClick={() => onRemoveLine(l.product.id)}
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
