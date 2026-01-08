"use client"
import {
	convertPercent,
	convertTo000D,
} from "@/lib/utils/number2"
import { generateRandomCode } from "@/lib/utils/text"
import { Fragment } from "react"
import { IoChevronDown } from "react-icons/io5"

const CouponConfigForm = ({
	couponConfig,
	setCouponConfig,
}) => {
	const handleCouponCodeChange = (value) => {
		const cleaned = value
			.toUpperCase()
			.replace(/[^A-Z0-9]/g, "")
			.slice(0, 20)
		setCouponConfig((prev) => ({
			...prev,
			couponCode: cleaned || undefined,
		}))
	}

	const handleGenerateCode = () => {
		const newCode = generateRandomCode(8)
		setCouponConfig((prev) => ({
			...prev,
			couponCode: newCode,
		}))
	}

	const handleDiscountTypeChange = (value) => {
		setCouponConfig((prev) => ({
			...prev,
			isFixed: value,
			// maxDiscount: undefined,
		}))
	}

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

	const handleMaxDiscountChange = (value) => {
		const numValue = parseInt(value) || ""
		if (numValue < 0) return
		setCouponConfig((prev) => ({
			...prev,
			maxDiscount: numValue || "",
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

	return (
		<div>
			<h3 className='text-[2.2rem] font-semibold mb-4'>
				Cấu hình Coupon
			</h3>

			{/* Input coupon code */}
			<div className='mb-4'>
				<div className='flex justify-between items-center'>
					<h2 className='text-[1.4rem] flex gap-1 mb-2'>
						Mã coupon
						<span className='text-red-500'>*</span>
					</h2>

					<div className='text-[1.4rem] font-medium text-blue-500'>
						{couponConfig.couponCode
							? `Mã coupon là ${couponConfig.couponCode}`
							: "Mã coupon sẽ được tạo tự động"}
					</div>
				</div>

				<div className='flex gap-3 items-center'>
					<input
						className='flex-1 outline-none p-4 text-2xl font-medium border border-black/50 rounded-2xl'
						type='text'
						minLength='2'
						maxLength='20'
						placeholder='Nhập mã coupon từ 2 đến 20 ký tự chữ và số'
						value={couponConfig.couponCode || ""}
						onChange={(e) =>
							handleCouponCodeChange(e.target.value)
						}
					/>

					<button
						type='button'
						className='px-6 py-4 text-xl font-semibold bg-gray-300 text-black/80 rounded-xl hover:bg-gray-400 transition-colors whitespace-nowrap'
						onClick={handleGenerateCode}
					>
						Tạo mã tự động
					</button>
				</div>

				{couponConfig.couponCode &&
					couponConfig.couponCode.length < 2 && (
						<p className='text-red-500 text-[1.2rem] mt-1'>
							Mã coupon phải có ít nhất 2 ký tự
						</p>
					)}
			</div>

			{/* Input group giảm giá */}
			<div className='mb-4'>
				<div className='flex justify-between items-center'>
					<h2 className='text-[1.4rem] flex gap-1 mb-2'>
						Giảm giá cho đơn hàng
						<span className='text-red-500'>*</span>
					</h2>

					<div className='text-[1.4rem] font-medium text-blue-500'>
						{couponConfig.discountValue ? (
							<Fragment>
								Giảm{" "}
								{couponConfig.isFixed
									? convertTo000D(couponConfig.discountValue)
									: convertPercent(couponConfig.discountValue)}{" "}
								cho đơn hàng
							</Fragment>
						) : (
							`Giảm ${convertTo000D(1)} cho đơn hàng`
						)}
					</div>
				</div>

				<div className='flex gap-3 justify-between items-center'>
					<div className='relative flex-[3]'>
						<select
							className='w-full appearance-none outline-none p-4 pr-12 text-2xl font-medium border border-black/50 rounded-2xl'
							value={couponConfig.isFixed ? "VND" : "PERCENT"}
							onChange={(e) => {
								const isFixed =
									e.target.value === "VND" ? true : false
								handleDiscountTypeChange(isFixed)
							}}
						>
							<option value='VND'>Giảm theo số tiền</option>
							<option value='PERCENT'>Giảm theo phần trăm</option>
						</select>

						<div className='absolute inset-y-0 right-4 flex items-center pointer-events-none'>
							<IoChevronDown size={18} className='text-black/60' />
						</div>
					</div>

					<input
						className='flex-[7] outline-none p-4 text-2xl font-medium border border-black/50 rounded-2xl'
						type='number'
						min='1'
						placeholder={
							couponConfig.isFixed ? "Số tiền" : "Phần trăm"
						}
						value={couponConfig.discountValue || ""}
						onChange={(e) =>
							handleDiscountValueChange(e.target.value)
						}
					/>
				</div>
			</div>

			{/* Trần ưu dãi giảm gía */}
			{couponConfig.isFixed === false && (
				<div className='mb-4'>
					<div className='flex justify-between items-center'>
						<h2 className='text-[1.4rem] mb-2'>
							Mức giảm giá tối đa
						</h2>

						<div className='text-[1.4rem] font-medium text-blue-500'>
							{couponConfig.maxDiscount
								? `Giảm giá tối đa ${convertTo000D(
										couponConfig.maxDiscount
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
							value={couponConfig.maxDiscount || ""}
							onChange={(e) =>
								handleMaxDiscountChange(e.target.value)
							}
						/>
					</div>
				</div>
			)}

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
							? `Tặng ${couponConfig.totalLimit} lượt sử dụng`
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
				<div className='flex justify-between items-center mb-2'>
					<h2 className='text-[1.4rem]'>
						Số lượng áp dụng coupon / khách hàng
					</h2>

					<div className='text-[1.4rem] font-medium text-blue-500'>
						{couponConfig.limitPerCustomer === 1
							? "Tặng 1 lượt / khách hàng"
							: "Không giới hạn"}
					</div>
				</div>

				<label className='flex gap-3 items-center cursor-pointer w-fit'>
					<input
						className='w-8 h-8 accent-blue-500 cursor-pointer border-black/50 rounded-lg'
						type='checkbox'
						checked={couponConfig.limitPerCustomer === 1}
						onChange={(e) => {
							const value = e.target.checked ? 1 : undefined
							handleUsagePerCustomerChange(value)
						}}
					/>
					<span className='p-4 text-2xl font-medium select-none'>
						Giới hạn mỗi khách hàng chỉ dùng 1 lần
					</span>
				</label>
			</div>
		</div>
	)
}

export default CouponConfigForm
