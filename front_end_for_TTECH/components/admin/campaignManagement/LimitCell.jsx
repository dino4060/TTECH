import { convertTokVND } from "@/utils/until"
import React, { useState, useEffect } from "react"

const LimitCell = ({ x }) => {
	const [limit, setLimit] = useState(0)
	const [available, setAvailable] = useState(-1)

	useEffect(() => {
		if (limit && limit > 0) {
			const stock = x.skus[0].inventory.stocks
			setAvailable(limit > stock ? stock : limit)
		} else {
			setLimit(0)
			setAvailable(-1)
		}
	}, [limit])

	const onChangeLimit = (e) => {
		setLimit(parseInt(e.target.value))
	}

	const onPreventScroll = (e) => e.target.blur()

	return (
		<th className='font-normal px-4 py-2 flex-1 shrink-0'>
			<div className='flex flex-col justify-between items-center text-center gap-2'>
				{/* Limit */}
				<div className='flex justify-between items-center w-full'>
					<span>Hạn mức</span>
					<div className='relative'>
						<input
							type='number'
							value={limit === 0 ? "" : limit}
							onChange={onChangeLimit}
							onWheel={onPreventScroll}
							className='w-[100px] text-right outline-none border border-black/50 rounded-lg pr-[5px]'
						/>
						{/* <span className='absolute right-2 top-1/2 transform -translate-y-1/2'>
						k
					</span> */}
					</div>
				</div>

				{/* Stock */}
				<div className='flex justify-between items-center w-full'>
					<span>Tồn kho</span>
					<span>{x.skus[0].inventory.stocks}</span>
				</div>

				{/* Available */}
				<div className='flex justify-between items-center w-full'>
					<span>Khả dụng</span>
					<span>
						{available === -1 ? "Không giới hạn" : available}
					</span>
				</div>
			</div>
		</th>
	)
}

export default LimitCell
