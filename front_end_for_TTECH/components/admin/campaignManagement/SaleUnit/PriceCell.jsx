import { convertTokVND } from "@/utils/until"
import { useEffect, useState } from "react"

const PriceCell = ({ saleUnit, onEditSaleUnit }) => {
	const mainPrice = saleUnit.product.price.mainPrice

	const [dealPrice, setDealPrice] = useState(
		saleUnit.product.price.sidePrice || -1
	)
	const [dealPercent, setDealPercent] = useState(
		saleUnit.product.price.dealPercent || 0
	)
	const [changeFF, setChangeFF] = useState("")

	// Change dealPrice => Update dealPercent
	useEffect(() => {
		if (changeFF !== "dealPrice") return

		// dealPrice > 0
		if (dealPrice && dealPrice > 0 && dealPrice < mainPrice) {
			const next = parseInt((1 - dealPrice / mainPrice) * 100)
			setDealPercent(next)
			onEditSaleUnit({
				...saleUnit,
				dealPrice,
				dealPercent: next,
			})
		}
		// dealPrice = 0
		else if (dealPrice === 0) {
			setDealPercent(100)
			onEditSaleUnit({
				...saleUnit,
				dealPrice,
				dealPercent: 100,
			})
		}
		// dealPrice is falsy, but not 0
		else {
			setDealPrice(-1)
			setDealPercent(0)
			onEditSaleUnit({
				...saleUnit,
				dealPrice: -1,
				dealPercent: 0,
			})
		}

		setChangeFF("")
	}, [changeFF])

	// Change dealPercent => Update dealPrice
	useEffect(() => {
		if (changeFF !== "dealPercent") return

		// dealPercent = (0-100]
		if (
			dealPercent &&
			dealPercent > 0 &&
			dealPercent <= 100
		) {
			const next = parseInt(
				mainPrice * (1 - dealPercent / 100)
			)
			setDealPrice(next)
			onEditSaleUnit({
				...saleUnit,
				dealPrice: next,
				dealPercent,
			})
		}
		// dealPercent is falsy
		else {
			setDealPrice(-1)
			setDealPercent(0)
			onEditSaleUnit({
				...saleUnit,
				dealPrice: -1,
				dealPercent: 0,
			})
		}

		setChangeFF("")
	}, [changeFF])

	const onChangeDealPrice = (e) => {
		setDealPrice(parseInt(e.target.value))
		setChangeFF("dealPrice")
	}

	const onChangeDiscountPercent = (e) => {
		setDealPercent(parseInt(e.target.value))
		setChangeFF("dealPercent")
	}

	const onPreventScroll = (e) => e.target.blur()

	return (
		<td className='font-normal px-4 py-2 flex-1 shrink-0'>
			<div className='flex flex-col justify-between items-center text-center gap-2'>
				<div className='flex justify-between items-center w-full'>
					<span>Giá giảm</span>
					<div className='relative'>
						<input
							type='number'
							value={dealPrice !== -1 ? dealPrice : ""}
							onChange={onChangeDealPrice}
							onWheel={onPreventScroll}
							className='w-[100px] text-right outline-none border border-black/50 rounded-lg pr-[18px]'
						/>
						<span className='absolute right-2 top-1/2 transform -translate-y-1/2'>
							k
						</span>
					</div>
				</div>

				<div className='flex justify-between items-center w-full'>
					<span>Phần trăm</span>
					<div className='relative'>
						<input
							type='number'
							value={dealPercent ? dealPercent : ""}
							onChange={onChangeDiscountPercent}
							onWheel={onPreventScroll}
							className='w-[100px] text-right outline-none border border-black/50 rounded-lg pr-[18px]'
						/>
						<span className='absolute right-2 top-1/2 transform -translate-y-1/2'>
							%
						</span>
					</div>
				</div>

				<div className='flex justify-between items-center w-full'>
					<span>Giá gốc</span>
					<span>{convertTokVND(mainPrice, false)}</span>
				</div>
			</div>
		</td>
	)
}

export default PriceCell
