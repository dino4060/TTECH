"use client"
import { convertTo000D } from "@/lib/utils/number2"
import { Fragment } from "react"

const CouponConfigForm = ({
	couponConfig,
	setCouponConfig,
}) => {
	const handleDiscountValueChange = (value) => {
		const numValue = parseInt(value) || ""
		if (numValue === 0 || numValue < 0) return
		setCouponConfig((prev) => ({
			...prev,
			discountValue: numValue || undefined,
		}))
	}

	const handleMinSpendChange = (value) => {
		const numValue = parseInt(value) || ""
		if (numValue < 0) return
		setCouponConfig((prev) => ({
			...prev,
			minSpend: numValue || "",
		}))
	}

	const handleTotalUsageChange = (value) => {
		const numValue = parseInt(value) || ""
		if (numValue < 0) return
		setCouponConfig((prev) => ({
			...prev,
			totalLimit: numValue || "",
		}))
	}

	const handleUsagePerCustomerChange = (value) => {
		const numValue = parseInt(value) || ""
		if (numValue < 0) return
		setCouponConfig((prev) => ({
			...prev,
			limitPerCustomer: numValue || "",
		}))
	}

	const handleValidityDaysChange = (value) => {
		const numValue = parseInt(value) || ""
		if (numValue < 0) return
		setCouponConfig((prev) => ({
			...prev,
			validityDays: numValue || "",
		}))
	}

	return (
		<div>
			<h3 className='text-[2.2rem] font-semibold mb-4'>
				Cấu hình Coupon
			</h3>

			{/* Input group giảm giá */}
			<div className='mb-4'>
				<div className='flex justify-between items-center'>
					<h2 className='text-[1.4rem] flex gap-1 mb-2'>
						Giảm phí vận chuyển
						<span className='text-red-500'>*</span>
					</h2>

					<div className='text-[1.4rem] font-medium text-blue-500'>
						{couponConfig.discountValue ? (
							<Fragment>
								Giảm {convertTo000D(couponConfig.discountValue)} cho
								phí vận chuyển
							</Fragment>
						) : (
							<Fragment>
								Giảm {convertTo000D(1)} cho phí vận chuyển
							</Fragment>
						)}
					</div>
				</div>

				<div className='flex gap-3 justify-between items-center'>
					<div className='relative flex-[3]'>
						<select
							className='w-full appearance-none outline-none p-4 pr-12 text-2xl font-medium border border-black/50 rounded-2xl'
							value={couponConfig.isFixed ? "VND" : "PERCENT"}
							disabled={true}
						>
							<option value='VND'>Giảm theo số tiền</option>
							<option value='PERCENT'>Giảm theo phần trăm</option>
						</select>

						{/* <div className='absolute inset-y-0 right-4 flex items-center pointer-events-none'>
							<IoChevronDown size={18} className='text-black/60' />
						</div> */}
					</div>

					<input
						className='flex-[7] outline-none p-4 text-2xl font-medium border border-black/50 rounded-2xl'
						type='number'
						min='1'
						placeholder='Nhập một số dương'
						value={couponConfig.discountValue || ""}
						onChange={(e) =>
							handleDiscountValueChange(e.target.value)
						}
					/>
				</div>
			</div>

			{/* Điều kiện đơn hàng tối thiểu */}
			<div className='mb-4'>
				<div className='flex justify-between items-center'>
					<h2 className='text-[1.4rem] mb-2'>
						Điều kiện đơn hàng tối thiểu
					</h2>

					<div className='text-[1.4rem] font-medium text-blue-500'>
						{couponConfig.minSpend
							? `Đơn hàng tối thiểu ${convertTo000D(
									couponConfig.minSpend
							  )}`
							: "Không giới hạn"}
					</div>
				</div>

				<div className='flex gap-3 items-center'>
					<input
						className='w-full outline-none p-4 text-2xl font-medium border border-black/50 rounded-2xl'
						type='number'
						min='0'
						placeholder='Nhập một số dương'
						value={couponConfig.minSpend || ""}
						onChange={(e) => handleMinSpendChange(e.target.value)}
					/>
				</div>
			</div>

			{/* Số lượng áp dụng */}
			<div className='mb-4'>
				<div className='flex justify-between items-center'>
					<h2 className='text-[1.4rem] mb-2'>
						Số lượt áp dụng coupon
					</h2>

					<div className='text-[1.4rem] font-medium text-blue-500'>
						{couponConfig.totalLimit
							? `Tặng ${couponConfig.totalLimit} lượt. Đã dùng ${
									couponConfig.usedCount
							  } lượt. Có sẳn ${
									couponConfig.totalLimit - couponConfig.usedCount
							  } lượt`
							: "Không giới hạn"}
					</div>
				</div>

				<div className='flex gap-3 items-center'>
					<input
						className='w-full outline-none p-4 text-2xl font-medium border border-black/50 rounded-2xl'
						type='number'
						min='0'
						placeholder='Nhập một số dương'
						value={couponConfig.totalLimit || ""}
						onChange={(e) =>
							handleTotalUsageChange(e.target.value)
						}
					/>
				</div>
			</div>

			{/* Số lượng áp dụng / khách hàng */}
			<div className='mb-4'>
				<div className='flex justify-between items-center'>
					<h2 className='text-[1.4rem] mb-2'>
						Số lượng áp dụng coupon / khách hàng
					</h2>

					<div className='text-[1.4rem] font-medium text-blue-500'>
						{couponConfig.limitPerCustomer
							? `Tặng ${couponConfig.limitPerCustomer} lượt / khách hàng`
							: "Không giới hạn"}
					</div>
				</div>

				<div className='flex gap-3 items-center'>
					<input
						className='w-full outline-none p-4 text-2xl font-medium border border-black/50 rounded-2xl'
						type='number'
						min='0'
						placeholder='Nhập một số dương'
						value={couponConfig.limitPerCustomer || ""}
						onChange={(e) =>
							handleUsagePerCustomerChange(e.target.value)
						}
					/>
				</div>
			</div>

			{/* Số ngày hiệu lực nhận coupon */}
			<div className='mb-4'>
				<div className='flex justify-between items-center'>
					<h2 className='text-[1.4rem] mb-2'>
						Số ngày hiệu lực sau khi nhận coupon
					</h2>

					<div className='text-[1.4rem] font-medium text-blue-500'>
						{couponConfig.validityDays
							? `Hiệu lực trong ${couponConfig.validityDays} ngày`
							: "Không giới hạn"}
					</div>
				</div>

				<div className='flex gap-3 items-center'>
					<input
						className='w-full outline-none p-4 text-2xl font-medium border border-black/50 rounded-2xl'
						type='number'
						min='0'
						placeholder='Nhập một số dương'
						value={couponConfig.validityDays || ""}
						onChange={(e) =>
							handleValidityDaysChange(e.target.value)
						}
					/>
				</div>
			</div>
		</div>
	)
}

export default CouponConfigForm
