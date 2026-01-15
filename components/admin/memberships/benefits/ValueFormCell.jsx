"use client"
import { useEffect, useState } from "react"
import {
	BenefitType,
	BenefitUnit,
	BenefitUnitRenderEnum,
} from "../MembershipUtils"
import { convertPositiveNumOr } from "@/lib/utils/number2"

const ValueForm = ({ benefit }) => {
	const [value, setValue] = useState(0)
	const [unit, setUnit] = useState(BenefitUnit.FIXED)

	useEffect(() => {
		setValue(benefit.benefitValue)
		setUnit(benefit.benefitUnit)
	}, [benefit])

	const onValueChange = (e) => {
		const v = convertPositiveNumOr(e.target.value, "")
		setValue(v)
		benefit.benefitValue = v || 1
	}

	const onUnitChange = (e) => {
		const u = e.target.value
		setUnit(u)
		benefit.benefitUnit = u
	}

	return (
		<td className='px-4 py-3'>
			<div className='flex flex-col gap-1'>
				{/* Hàng 1: Label + Preview */}
				<div className='flex justify-between items-baseline gap-2 overflow-hidden text-ellipsis whitespace-nowrap'>
					<div className='font-normal'>
						{benefit.benefitType === BenefitType.GUARANTEE
							? "Bảo hành"
							: "Giảm giá"}
					</div>
					<div className='font-normal text-blue-500 text-[1.2rem]'>
						{benefit.benefitType === BenefitType.GUARANTEE
							? `Tặng ${value || 1}${
									BenefitUnitRenderEnum[unit].symbol
							  }`
							: `Giảm ${value || 1}${
									BenefitUnitRenderEnum[unit].symbol
							  }`}
					</div>
				</div>

				{/* Hàng 2: Input + Unit Combo */}
				<div className='flex gap-2'>
					<input
						type='number'
						value={value}
						onChange={onValueChange}
						className='w-1/2 py-2 px-4 border rounded-lg outline-none' // focus:border-blue-500
					/>
					<select
						value={unit}
						onChange={onUnitChange}
						className='w-1/2 py-2 px-4 border rounded-lg outline-none appearance-none' // focus:border-blue-500
					>
						{benefit.benefitType === BenefitType.GUARANTEE ? (
							<option value={BenefitUnit.MONTHS}>
								{BenefitUnitRenderEnum.MONTHS.show}
							</option>
						) : (
							<>
								<option value={BenefitUnit.FIXED}>
									{BenefitUnitRenderEnum.FIXED.show}
								</option>
								<option value={BenefitUnit.PERCENT}>
									{BenefitUnitRenderEnum.PERCENT.show}
								</option>
							</>
						)}
					</select>
				</div>
			</div>
		</td>
	)
}

export default ValueForm
