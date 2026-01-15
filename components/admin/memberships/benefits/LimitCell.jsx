import { useEffect, useState } from "react"
import { ModeEnum } from "../../memberships/MembershipUtils"

const LimitCell = ({
	saleUnit,
	onEditSaleUnit,
	action,
}) => {
	const stock = saleUnit.product.stock.available
	const usedCount = saleUnit.usedCount
	const calcAvailable = (saleUnit) => {
		return saleUnit.totalLimit <= 0
			? -1
			: saleUnit.totalLimit - usedCount > stock
			? stock
			: saleUnit.totalLimit - usedCount
	}

	const [limit, setLimit] = useState(saleUnit.totalLimit)
	const [available, setAvailable] = useState(
		calcAvailable(saleUnit)
	)

	useEffect(() => {
		setLimit(saleUnit.totalLimit)
		setAvailable(calcAvailable(saleUnit))
	}, [saleUnit, usedCount, stock])

	// Change limit => Change available
	useEffect(() => {
		// limit > 0
		if (limit && limit > 0) {
			setAvailable(limit > stock ? stock : limit)
			onEditSaleUnit({ ...saleUnit, totalLimit: limit })
		}
		// limit is falsy
		else {
			setLimit(0)
			setAvailable(-1)
			onEditSaleUnit({ ...saleUnit, totalLimit: 0 })
		}
	}, [limit])

	const onChangeLimit = (e) => {
		setLimit(parseInt(e.target.value))
	}

	const onPreventScroll = (e) => e.target.blur()

	return (
		<td className='font-normal px-4 py-2 flex-1 shrink-0'>
			<div className='flex flex-col justify-between items-center text-center gap-2'>
				<div className='flex justify-between items-center w-full'>
					<span>Hạn mức</span>
					<div className='relative'>
						<input
							type='number'
							value={limit === 0 ? "" : limit}
							onChange={onChangeLimit}
							onWheel={onPreventScroll}
							className='w-[100px] text-right outline-none border border-black/50 rounded-lg pr-[5px]'
							disabled={action === ModeEnum.EDIT}
						/>
					</div>
				</div>

				<div className='flex justify-between items-center w-full'>
					<span>Tồn kho</span>
					<span>{saleUnit.product.stock.available}</span>
				</div>

				<div className='flex justify-between items-center w-full'>
					<span>Khả dụng</span>
					<span>
						{available === -1 ? "Không giới hạn" : available}
					</span>
				</div>
			</div>
		</td>
	)
}

export default LimitCell

// "use client"
// import { useMemo } from "react"

// const LimitCell = ({ saleUnit, onEditSaleUnit }) => {
// 	const stock = saleUnit.product.stock.available
// 	const usedCount = saleUnit.usedCount

// 	const available = useMemo(() => {
// 		const limit = saleUnit.totalLimit
// 		return limit <= 0
// 			? -1
// 			: limit - usedCount > stock
// 			? stock
// 			: limit - usedCount
// 	}, [saleUnit.totalLimit, usedCount, stock])

// 	const onChangeLimit = (e) => {
// 		const newLimit = parseInt(e.target.value) || 0
// 		onEditSaleUnit({ ...saleUnit, totalLimit: newLimit })
// 	}

// 	const onPreventScroll = (e) => e.target.blur()

// 	return (
// 		<td className='font-normal px-4 py-2 flex-1 shrink-0'>
// 			<div className='flex flex-col justify-between items-center text-center gap-2'>
// 				<div className='flex justify-between items-center w-full'>
// 					<span>Hạn mức</span>
// 					<div className='relative'>
// 						<input
// 							type='number'
// 							value={
// 								saleUnit.totalLimit === 0 ? "" : saleUnit.totalLimit
// 							}
// 							onChange={onChangeLimit}
// 							onWheel={onPreventScroll}
// 							className='w-[100px] text-right outline-none border border-black/50 rounded-lg pr-[5px]'
// 						/>
// 					</div>
// 				</div>

// 				<div className='flex justify-between items-center w-full'>
// 					<span>Tồn kho</span>
// 					<span>{stock}</span>
// 				</div>

// 				<div className='flex justify-between items-center w-full'>
// 					<span>Khả dụng</span>
// 					<span>
// 						{available === -1 ? "Không giới hạn" : available}
// 					</span>
// 				</div>
// 			</div>
// 		</td>
// 	)
// }

// export default LimitCell
