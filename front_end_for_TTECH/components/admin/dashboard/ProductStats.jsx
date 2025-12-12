"use client"
import useDebounce from "@/hooks/useDebounce"
import { productApi } from "@/lib/api/product.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { useEffect, useState } from "react"
import { CiShoppingBasket } from "react-icons/ci"

const ProductStats = () => {
	const [list, setList] = useState(DefaultProductList)
	const [size, setSize] = useState(20)
	const sizeDeb = useDebounce(size, 500)

	useEffect(() => {
		const getProductTop = async () => {
			const apiRes = await clientFetch(
				productApi.list({
					statistics: "bestseller",
					size: sizeDeb,
				})
			)
			if (apiRes.success === false) {
				alert(`Lỗi thống kê sản phẩm: ${apiRes.error}`)
				return
			}
			setList(apiRes.data.items)
		}
		getProductTop()
	}, [sizeDeb])

	return (
		<div className='h-[630px] box-content p-10 grow bg-white border border-black/20 rounded-2xl'>
			<h1 className='text-2xl flex items-center gap-2 font-[700] p-4'>
				<CiShoppingBasket size={22} /> Sản phẩm bán chạy
			</h1>
			<form onSubmit={(e) => e.preventDefault()}>
				<input
					onChange={(e) => setSize(e.target.value)}
					placeholder='Nhập vào `top` sản phẩm'
					value={size}
					className='w-full py-2 px-4 text-2xl border border-blue-500/50 rounded-3xl '
				/>
			</form>

			<div className='flex mt-4 gap-4'>
				<div className='flex-1 bg-sky-600/10  rounded-full p-2 flex text-2xl items-center justify-center'>
					Ảnh sản phẩm
				</div>
				<div className='flex-1 bg-sky-600/10  rounded-full p-2 flex text-2xl items-center justify-center'>
					Tên sản phẩm
				</div>
				<div className='flex-1 bg-sky-600/10  rounded-full p-2 flex text-2xl items-center justify-center'>
					Doanh số
				</div>
			</div>

			<div className='h-[500px] overflow-y-scroll'>
				{list.map((p) => (
					<div key={p.id} className='flex gap-4 '>
						<div className='flex-1 p-2 flex text-2xl items-center justify-center'>
							<img width={70} height={70} alt='' src={p.thumb} />
						</div>
						<div className='flex-1 p-2 flex text-2xl items-center justify-center text-center'>
							{p.name}
						</div>
						<div className='flex-1 p-2 flex text-2xl items-center justify-center'>
							{p.stock.sold}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default ProductStats

const DefaultProductList = [
	{
		id: 1,
		stock: { sold: 10 },
		name: "Cục Gạch",
		thumb: "loading",
	},
	{
		id: 2,
		stock: { sold: 10 },
		name: "Cục Vàng",
		thumb: "loading",
	},
	{
		id: 3,
		stock: { sold: 10 },
		name: "Cục Cưng",
		thumb: "loading",
	},
	{
		id: 4,
		stock: { sold: 10 },
		name: "Cục Kim Cương",
		thumb: "loading",
	},
]
