"use client"
import useDebounce from "@/hooks/useDebounce"
import { productApi } from "@/lib/api/product.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { useEffect, useState } from "react"
import { CiShoppingBasket } from "react-icons/ci"

const ProductStats = () => {
	const [list, setList] = useState(DefaultProductList)
	const [size, setSize] = useState(10)
	const [statsType, setStatsType] = useState("bestseller")
	const sizeDeb = useDebounce(size, 500)

	useEffect(() => {
		const listTopProducts = async () => {
			const apiRes = await clientFetch(
				productApi.list({
					statistics: statsType,
					size: sizeDeb,
				})
			)
			if (apiRes.success === false) {
				alert(`Lỗi thống kê sản phẩm: ${apiRes.error}`)
				return
			}
			setList(apiRes.data.items)
		}
		listTopProducts()
	}, [sizeDeb, statsType])

	return (
		<div className='flex-1 h-[630px] box-content p-10 grow bg-white border border-black/20 rounded-2xl'>
			<div className='flex justify-between'>
				<h1 className='text-2xl flex items-center gap-2 font-[700] p-4'>
					<CiShoppingBasket size={22} />{" "}
					{STATS_TYPES.find((s) => s.id === statsType).title}
				</h1>
				<div>
					<select
						className='bg-white border text-[1.1rem] text-black rounded-lg block w-full p-2.5
            focus:outline-none focus:border-2'
						onChange={(e) => setStatsType(e.target.value)}
					>
						{STATS_TYPES.map((s) => (
							<option key={s.id} value={s.id}>
								{s.display}
							</option>
						))}
					</select>
				</div>
			</div>

			<form onSubmit={(e) => e.preventDefault()}>
				<input
					className='w-full py-2 px-4 text-2xl border border-blue-500/50 rounded-3xl '
					placeholder='Nhập vào `top` sản phẩm'
					value={size}
					onChange={(e) => setSize(e.target.value)}
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

const STATS_TYPES = [
	{
		id: "bestseller",
		display: "Best seller",
		title: "Top sản phẩm bán chạy",
	},
	{
		id: "trendy",
		display: "Xem nhiều",
		title: "Top sản phẩm được xem nhiều",
	},
	{
		id: "favorite",
		display: "Trong giỏ hàng",
		title: "Top sản phẩm trong giỏ hàng",
	},
	{
		id: "flop",
		display: "Flop",
		title: "Top sản phẩm doanh số thấp",
	},
]
