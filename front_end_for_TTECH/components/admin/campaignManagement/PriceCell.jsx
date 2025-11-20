import { convertTokVND } from "@/utils/until"
import { el } from "@faker-js/faker"
import React, { useState, useEffect } from "react"

const PriceCell = ({ saleUnit: x }) => {
	const mainPrice = x.product.price.mainPrice

	const [dealPrice, setDealPrice] = useState(
		x.product.price.sidePrice || -1
	)
	const [discountPercent, setDiscountPercent] = useState(
		x.product.price.dealPercent || 0
	)
	const [changeType, setChangeType] = useState("off")

	// Update discount percentage when deal price changes
	useEffect(() => {
		if (changeType !== "dealPrice") return

		if (dealPrice && dealPrice > 0 && dealPrice < mainPrice) {
			setDiscountPercent(
				parseInt((1 - dealPrice / mainPrice) * 100)
			)
		} else if (dealPrice === 0) {
			setDiscountPercent(100)
		} else {
			setDealPrice(-1)
			setDiscountPercent(0)
		}

		setChangeType("off")
	}, [changeType])

	// Update deal price when discount percentage changes
	useEffect(() => {
		if (changeType !== "discountPercent") return

		if (
			discountPercent &&
			discountPercent > 0 &&
			discountPercent <= 100
		) {
			setDealPrice(
				parseInt(mainPrice * (1 - discountPercent / 100))
			)
		} else {
			setDiscountPercent(0)
			setDealPrice(-1)
		}

		setChangeType("off")
	}, [changeType])

	const onChangeDealPrice = (e) => {
		setDealPrice(parseInt(e.target.value))
		setChangeType("dealPrice")
	}

	const onChangeDiscountPercent = (e) => {
		setDiscountPercent(parseInt(e.target.value))
		setChangeType("discountPercent")
	}

	const onPreventScroll = (e) => e.target.blur()

	return (
		<th className='font-normal px-4 py-2 flex-1 shrink-0'>
			<div className='flex flex-col justify-between items-center text-center gap-2'>
				{/* Row 1: Giá khuyến mãi (Deal Price) */}
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

				{/* Row 2: Phần trăm (Discount Percent) */}
				<div className='flex justify-between items-center w-full'>
					<span>Phần trăm</span>
					<div className='relative'>
						<input
							type='number'
							value={discountPercent ? discountPercent : ""}
							onChange={onChangeDiscountPercent}
							onWheel={onPreventScroll}
							className='w-[100px] text-right outline-none border border-black/50 rounded-lg pr-[18px]'
						/>
						<span className='absolute right-2 top-1/2 transform -translate-y-1/2'>
							%
						</span>
					</div>
				</div>

				{/* Row 3: Giá bán lẻ (Main Price) */}
				<div className='flex justify-between items-center w-full'>
					<span>Giá gốc</span>
					<span>{convertTokVND(mainPrice, false)}</span>
				</div>
			</div>
		</th>
	)
}

export default PriceCell
