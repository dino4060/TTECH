"use client"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import {
	BenefitType,
	BenefitTypeRenderEnum,
	BenefitUnit,
	ModeEnum,
} from "../MembershipUtils"
import DealFormCell from "./DealFormCell"

const DEFAULT_LEGACY = [
	{
		id: 1,
		benefitType: BenefitType.GUARANTEE,
		benefitName: "Bảo hành mẫu",
		benefitValue: 6,
		benefitUnit: "MONTHS",
		minSpend: 160,
		validityMonths: 6,
		limitPerCustomer: undefined,
	},
]

const DEFAULT_BENEFIT = (BenefitTypeRender) => ({
	tempId: Date.now(),
	id: undefined,
	benefitType: BenefitTypeRender.key,
	benefitName: undefined,
	benefitValue: "",
	benefitUnit:
		BenefitTypeRender.key === BenefitType.GUARANTEE
			? BenefitUnit.MONTHS
			: BenefitUnit.FIXED,
	minSpend: undefined,
	limitPerCustomer: undefined,
})

const BenefitsForm = ({
	mode,
	benefitsData,
	setBenefitsData,
}) => {
	const [add, setAdd] = useState(false)
	const [manage, setManage] = useState(false)

	useEffect(() => {
		if (mode === ModeEnum.ADD) {
			setBenefitsData([])
			return
		}
		if (mode === ModeEnum.EDIT) {
			setBenefitsData(mbsData.benefits)
			return
		}
	}, [mode])

	const handleAddBenefitType = (BenefitTypeRender) => {
		setBenefitsData((prev) => [
			...prev,
			DEFAULT_BENEFIT(BenefitTypeRender),
		])
		setAdd(false)
	}

	const handleDelete = (id, tempId) => {
		if (!id && !tempId) return

		setBenefitsData((prev) =>
			prev.filter((b) => {
				if (!id) return b.tempId !== tempId
				return b.id !== id
			})
		)
	}

	return (
		<div>
			<div className='flex justify-between items-center'>
				<h3 className='text-[2.2rem] font-semibold'>
					Danh sách đặc quyền
				</h3>

				<div className='flex gap-3'>
					<button
						className={`self-center px-6 py-2 text-2xl rounded-full  transition-all flex items-center gap-2 
							border border-blue-500  ${
								add
									? "bg-blue-500 text-white"
									: "bg-white text-blue-500 hover:bg-blue-500 hover:text-white"
							}
						`}
						onClick={() => setAdd((tf) => !tf)}
					>
						Thêm mới benefit
					</button>

					<button
						className={`self-center px-6 py-2 text-2xl rounded-full transition-all flex items-center gap-2 
						border border-blue-500 hover:bg-blue-500 hover:text-white ${
							manage
								? "bg-blue-500 text-white"
								: "bg-white text-blue-500 hover:bg-blue-500 hover:text-white"
						}
						`}
						onClick={() => setManage((tf) => !tf)}
					>
						Quản lý benefit
					</button>
				</div>
			</div>

			<AnimatePresence>
				{add && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className='overflow-hidden'
					>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 p-1'>
							{Object.values(BenefitTypeRenderEnum).map((BTR) => (
								<motion.div
									key={BTR.key}
									className='p-6 border border-gray-300 rounded-2xl bg-white hover:border-blue-500
                    hover:shadow-md transition-all cursor-pointer'
									whileHover={{ scale: 1.02 }}
									onClick={() => handleAddBenefitType(BTR)}
								>
									<div className='flex items-center gap-4'>
										<div className='p-3 bg-blue-50 rounded-xl'>
											<BTR.icon className='w-8 h-8 text-blue-500' />
										</div>
										<div className='flex-1 min-w-0'>
											<h3 className='text-2xl font-bold text-slate-700'>
												{BTR.show}
											</h3>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<div className='mt-4'>
				<div className='overflow-x-auto'>
					<table className='w-full border-spacing-1 border-separate table-fixed text-xl bg-white relative'>
						<thead class=' text-black uppercase sticky top-2'>
							<tr>
								<th className='w-[40%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white shrink-0 text-center'>
									Đặc quyền
								</th>
								<th className='w-[30%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white shrink-0 text-center'>
									Giá trị
								</th>
								<th className='w-[30%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white shrink-0 text-center'>
									Điều kiện
								</th>
								<th className='w-[120px] py-2 border border-b-4 rounded-md border-blue-500 bg-white shrink-0 text-center'>
									{!manage ? "Trạng thái" : "Quản lý"}
								</th>
							</tr>
						</thead>
						<tbody>
							{benefitsData.length === 0 ? (
								<tr>
									<td
										colSpan={4}
										className='py-10 text-center text-gray-400 text-2xl bg-slate-50 hover:bg-slate-300'
									>
										Chưa có đặc quyền
									</td>
								</tr>
							) : (
								benefitsData.map((b, idx) => (
									<motion.tr
										key={b.id || b.tempId || idx}
										className='cursor-pointer'
										initial={{
											backgroundColor: "#f8fafc",
											padding: 0,
										}}
										whileHover={{
											backgroundColor: "#cbd5e1",
											padding: "10px 0px",
										}}
										transition={{ type: "spring" }}
									>
										<td className='px-4 py-2 font-normal shrink-0 text-center'>
											<div className='flex gap-2 items-center'>
												<div
													className={`p-3 m-1 rounded-xl shrink-0 bg-blue-50`}
												>
													{(() => {
														const IconComponent =
															BenefitTypeRenderEnum[b.benefitType]?.icon ||
															BenefitTypeRenderEnum.COUPON.icon
														return (
															<IconComponent className='w-8 h-8 text-blue-500' />
														)
													})()}
												</div>
												<div className='flex-1 min-w-0 text-left'>
													<div className='text-[1.4rem] whitespace-nowrap overflow-hidden text-ellipsis'>
														{b.benefitName}
													</div>
													<div>{b.id && `ID: ${b.id}`}</div>
												</div>
											</div>
										</td>

										<DealFormCell benefit={b} />

										<td>Develop (LimitCellForm)</td>

										{!manage ? (
											<td className='px-4 py-2 font-normal shrink-0 text-center'>
												<span
													className='p-2 rounded-xl text-white'
													style={{
														backgroundColor: b.isAlive
															? "#06b6d4"
															: "#94a3b8",
													}}
												>
													{b.isAlive ? "ALIVE" : "OFF"}
												</span>
											</td>
										) : (
											<td className='px-4 py-2 font-normal shrink-0 text-center'>
												<span
													className='text-[1.4rem] font-semibold text-red-500 hover:underline'
													onClick={() => handleDelete(b.id, b.tempId)}
												>
													Xóa
												</span>
											</td>
										)}
									</motion.tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default BenefitsForm
