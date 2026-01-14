"use client"
import {
	calcPartOfPercent,
	calcPercentOfPart,
} from "@/lib/utils/number"
import { convertTokVND } from "@/lib/utils/number2"
import { useEffect, useState } from "react"
import { ModeEnum } from "../MembershipUtils"

const PriceCell = ({
	saleUnit,
	onEditSaleUnit,
	action,
}) => {
	const retailPrice = saleUnit.product.price.retailPrice
	const calcDealPrice = (saleUnit) => {
		return saleUnit.dealPercent ? saleUnit.dealPrice : -1
	}
	const calcDealPercent = (saleUnit) => {
		return saleUnit.dealPercent || 0
	}
	const [dealPrice, setDealPrice] = useState(
		calcDealPrice(saleUnit)
	)
	const [dealPercent, setDealPercent] = useState(
		calcDealPercent(saleUnit)
	)
	const [changeFF, setChangeFF] = useState("")

	useEffect(() => {
		setDealPrice(calcDealPrice(saleUnit))
		setDealPercent(calcDealPercent(saleUnit))
	}, [saleUnit])

	// Change dealPrice => Update dealPercent
	useEffect(() => {
		if (changeFF !== "dealPrice") return

		// dealPrice > 0
		if (
			dealPrice &&
			dealPrice > 0 &&
			dealPrice < retailPrice
		) {
			setDealPercent(calcPercentOfPart(dealPrice, retailPrice))
			onEditSaleUnit({
				...saleUnit,
				dealPrice,
				dealPercent: calcPercentOfPart(dealPrice, retailPrice),
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
			onEditSaleUnit({
				...saleUnit,
				dealPrice: calcPartOfPercent(dealPercent, retailPrice),
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
							disabled={action === ModeEnum.EDIT}
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
							disabled={action === ModeEnum.EDIT}
						/>
						<span className='absolute right-2 top-1/2 transform -translate-y-1/2'>
							%
						</span>
					</div>
				</div>

				<div className='flex justify-between items-center w-full'>
					<span>Giá gốc</span>
					<span>{convertTokVND(retailPrice, false)}</span>
				</div>
			</div>
		</td>
	)
}

export default PriceCell

// "use client"
// import {
// 	calcPartOfPercent,
// 	calcPercentOfPart,
// } from "@/lib/utils/number"
// import { convertTokVND } from "@/utils/until"
// import { useState } from "react"

// const PriceCell = ({ saleUnit, onEditSaleUnit }) => {
// 	const retailPrice = saleUnit.product.price.retailPrice
// 	const [editingField, setEditingField] = useState(null) // 'price' | 'percent' | null
// 	const [tempValue, setTempValue] = useState("")

// 	const dealPrice = saleUnit.dealPrice ?? -1
// 	const dealPercent = saleUnit.dealPercent ?? 0

// 	const handlePriceChange = (e) => {
// 		const value = e.target.value
// 		setTempValue(value)
// 		setEditingField('price')

// 		const newPrice = parseInt(value)

// 		if (!value || isNaN(newPrice)) {
// 			onEditSaleUnit({
// 				...saleUnit,
// 				dealPrice: -1,
// 				dealPercent: 0,
// 			})
// 		} else if (newPrice === 0) {
// 			onEditSaleUnit({
// 				...saleUnit,
// 				dealPrice: 0,
// 				dealPercent: 100,
// 			})
// 		} else if (newPrice > 0 && newPrice < retailPrice) {
// 			onEditSaleUnit({
// 				...saleUnit,
// 				dealPrice: newPrice,
// 				dealPercent: calcPercentOfPart(newPrice, retailPrice),
// 			})
// 		}
// 	}

// 	const handlePercentChange = (e) => {
// 		const value = e.target.value
// 		setTempValue(value)
// 		setEditingField('percent')

// 		const newPercent = parseInt(value)

// 		if (!value || isNaN(newPercent)) {
// 			onEditSaleUnit({
// 				...saleUnit,
// 				dealPrice: -1,
// 				dealPercent: 0,
// 			})
// 		} else if (newPercent > 0 && newPercent <= 100) {
// 			onEditSaleUnit({
// 				...saleUnit,
// 				dealPrice: calcPartOfPercent(newPercent, retailPrice),
// 				dealPercent: newPercent,
// 			})
// 		}
// 	}

// 	const handleBlur = () => {
// 		setEditingField(null)
// 		setTempValue("")
// 	}

// 	const onPreventScroll = (e) => e.target.blur()

// 	// Hiển thị tempValue khi đang edit, không thì hiển thị giá trị từ saleUnit
// 	const displayPrice = editingField === 'price'
// 		? tempValue
// 		: (dealPrice !== -1 ? dealPrice : "")

// 	const displayPercent = editingField === 'percent'
// 		? tempValue
// 		: (dealPercent ? dealPercent : "")

// 	return (
// 		<td className='font-normal px-4 py-2 flex-1 shrink-0'>
// 			<div className='flex flex-col justify-between items-center text-center gap-2'>
// 				<div className='flex justify-between items-center w-full'>
// 					<span>Giá giảm</span>
// 					<div className='relative'>
// 						<input
// 							type='number'
// 							value={displayPrice}
// 							onChange={handlePriceChange}
// 							onBlur={handleBlur}
// 							onWheel={onPreventScroll}
// 							className='w-[100px] text-right outline-none border border-black/50 rounded-lg pr-[18px]'
// 						/>
// 						<span className='absolute right-2 top-1/2 transform -translate-y-1/2'>
// 							k
// 						</span>
// 					</div>
// 				</div>

// 				<div className='flex justify-between items-center w-full'>
// 					<span>Phần trăm</span>
// 					<div className='relative'>
// 						<input
// 							type='number'
// 							value={displayPercent}
// 							onChange={handlePercentChange}
// 							onBlur={handleBlur}
// 							onWheel={onPreventScroll}
// 							className='w-[100px] text-right outline-none border border-black/50 rounded-lg pr-[18px]'
// 						/>
// 						<span className='absolute right-2 top-1/2 transform -translate-y-1/2'>
// 							%
// 						</span>
// 					</div>
// 				</div>

// 				<div className='flex justify-between items-center w-full'>
// 					<span>Giá gốc</span>
// 					<span>{convertTokVND(retailPrice, false)}</span>
// 				</div>
// 			</div>
// 		</td>
// 	)
// }

// export default PriceCell
