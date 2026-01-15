"use client"
import { useEffect, useState } from "react"
import { BenefitTypeRenderEnum } from "../MembershipUtils"

const IDNameForm = ({ benefit }) => {
	const [name, setName] = useState("")
	const BenefitTypeRender =
		BenefitTypeRenderEnum[benefit.benefitType] || ""

	useEffect(() => {
		setName(benefit.benefitName || "")
	}, [benefit])

	const handleNameChange = (e) => {
		const v = e.target.value
		setName(v || "")
		benefit.benefitName = v || BenefitTypeRender.show
	}

	const getPreview = () => {
		if (!benefit.id) return "Thêm mới"
		return `ID: ${benefit.id}`
	}

	return (
		<td className='px-4 py-2 font-normal shrink-0'>
			<div className='flex gap-2 items-center'>
				<div className='p-3 m-1 shrink-0 bg-blue-50 rounded-xl'>
					<BenefitTypeRender.icon className='w-14 h-14 text-blue-500' />
				</div>

				{/* Name Input Group */}
				<div className='flex-1 min-w-0 flex flex-col gap-1'>
					<div className='flex justify-between items-baseline gap-2'>
						<div className=''>Tên đặc quyền</div>
						<div className='text-[1.2rem] font-medium text-blue-500 whitespace-nowrap overflow-hidden text-ellipsis'>
							{getPreview()}
						</div>
					</div>

					<input
						type='text'
						value={name}
						onChange={handleNameChange}
						placeholder={`Tên mặc định là ${BenefitTypeRender.show}`}
						className='outline-none w-full py-2 px-4 border border-black/10 rounded-lg text-[1.4rem] focus:border-blue-500 transition-all'
					/>
				</div>
			</div>
		</td>
	)
}

export default IDNameForm
