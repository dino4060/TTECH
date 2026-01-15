"use client"
import {
	convertPositiveNumOr,
	convertTo000D,
} from "@/lib/utils/number2"
import { useEffect, useState } from "react"

const LimitForm = ({ benefit }) => {
	const [minSpend, setMinSpend] = useState("")
	const [limitPerCTM, setLimitPerCTM] = useState("")

	useEffect(() => {
		setMinSpend(benefit.minSpend || "")
		setLimitPerCTM(benefit.limitPerCustomer || "")
	}, [benefit])

	const onMinSpendChange = (e) => {
		const v = convertPositiveNumOr(e.target.value, "")
		setMinSpend(v || "")
		benefit.minSpend = v || 0
	}

	const onLimitChange = (e) => {
		const v = convertPositiveNumOr(e.target.value, "")
		setLimitPerCTM(v || "")
		benefit.limitPerCustomer = v || 0
	}

	return (
		<td className='px-4 py-3'>
			<div className='flex flex-col gap-3'>
				{/* Group 1: Min Spend */}
				<div className='flex flex-col gap-1'>
					<div className='flex justify-between items-baseline gap-2 overflow-hidden text-ellipsis whitespace-nowrap'>
						<div className='font-normal'>Chi tiêu tối thiểu</div>
						<div className='font-normal text-blue-500 text-[1.2rem]'>
							{minSpend > 0
								? `Từ ${convertTo000D(minSpend)}`
								: "Không giới hạn"}
						</div>
					</div>
					<div className='flex gap-2'>
						<input
							type='number'
							value={minSpend}
							onChange={onMinSpendChange}
							className='w-full py-2 px-4 border rounded-lg outline-none'
						/>
					</div>
				</div>

				{/* Group 2: Limit Per Customer */}
				<div className='flex flex-col gap-1'>
					<div className='flex justify-between items-baseline gap-2 overflow-hidden text-ellipsis whitespace-nowrap'>
						<div className='font-normal'>Số lượng /khách</div>
						<div className='font-normal text-blue-500 text-[1.2rem]'>
							{limitPerCTM > 0
								? `${limitPerCTM} lần/khách`
								: "Không giới hạn"}
						</div>
					</div>
					<div className='flex gap-2'>
						<input
							type='number'
							value={limitPerCTM}
							onChange={onLimitChange}
							className='w-full py-2 px-4 border rounded-lg outline-none'
						/>
					</div>
				</div>
			</div>
		</td>
	)
}

export default LimitForm
