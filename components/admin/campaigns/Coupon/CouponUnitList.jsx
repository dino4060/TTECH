import { useEffect, useState } from "react"
import {
	CiCircleCheck,
	CiCircleRemove,
} from "react-icons/ci"
import ProductOptions from "../ProductOptions"
import { convertTo000D } from "@/lib/utils/number2"

const CouponUnitList = ({
	productsConfig,
	setProductsConfig,
	isSubmitted,
}) => {
	const [show, setShow] = useState(false)
	const [newProducts, setNewProducts] = useState(new Set())
	const [appliedProductIds, setAppliedProductIds] = useState(
		new Set()
	)

	// choose new products =>  add new units
	useEffect(() => {
		if (newProducts.size === 0) return

		setProductsConfig((prev) => ({
			...prev,
			units: [
				...Array.from(newProducts).map((p) => ({
					product: p,
				})),
				...prev.units,
			],
		}))

		setAppliedProductIds(
			(prev) =>
				new Set([
					...Array.from(newProducts).map((p) => p.id), // ? use map directly
					...prev,
				])
		)

		setNewProducts(new Set())
	}, [newProducts])

	// submit form => clean appliedProductIds
	useEffect(() => {
		setAppliedProductIds(new Set())
	}, [isSubmitted])

	const handleProductRemove = (productId) => {
		setProductsConfig((prev) => ({
			...prev,
			units: [
				...prev.units.filter((u) => u.product.id !== productId),
			],
		}))

		appliedProductIds.delete(productId)
		setAppliedProductIds(new Set(appliedProductIds))
	}

	const handleProductScopeChange = (value) => {
		setProductsConfig((prev) => ({
			...prev,
			isApplyAll: value === "ALL" ? true : false,
		}))
	}

	return (
		<div>
			<div className='flex justify-between items-center mb-4'>
				<h3 className='text-[2.2rem] font-semibold'>
					Sản phẩm được áp dụng
				</h3>

				<div className='flex gap-3'>
					<button
						className={`self-center px-6 py-2 text-2xl rounded-full border transition-all flex items-center gap-2 ${
							productsConfig.isApplyAll === true
								? "border-blue-500 bg-blue-500 text-white"
								: "border-blue-500 bg-white text-blue-500"
						}`}
						onClick={() => handleProductScopeChange("ALL")}
					>
						{productsConfig.isApplyAll === true && (
							<CiCircleCheck size={20} />
						)}
						Tất cả sản phẩm
					</button>

					<button
						className={`self-center px-6 py-2 text-2xl rounded-full border transition-all flex items-center gap-2 ${
							productsConfig.isApplyAll === false
								? "border-blue-500 bg-blue-500 text-white"
								: "border-blue-500 bg-white text-blue-500"
						}`}
						onClick={() => {
							handleProductScopeChange("SELECTED")
							setShow((prev) => !prev)
						}}
					>
						{productsConfig.isApplyAll === false && (
							<CiCircleCheck size={20} />
						)}
						Chọn sản phẩm
					</button>
				</div>
			</div>

			{productsConfig.isApplyAll === false && (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
					{productsConfig.units.map((u) => (
						<div
							key={u.product.id}
							className='flex gap-2 items-center p-4 bg-[#f8fafc] hover:bg-[#cbd5e1] rounded-[3px]'
						>
							<div className='flex gap-2 flex-1 min-w-0'>
								<div className='w-14 h-14 shrink-0 rounded-xl bg-sky-300'>
									<img
										src={u.product.thumb}
										className='w-full h-full object-cover rounded-xl'
										alt={u.product.name}
									/>
								</div>

								<div className='flex-1 min-w-0 text-left'>
									<div className='text-[1.4rem] whitespace-nowrap overflow-hidden text-ellipsis'>
										{u.product.name}
									</div>
									<div className='text-[1.2rem]'>
										{convertTo000D(u.product.price.mainPrice)}
									</div>
								</div>
							</div>

							<div
								className='cursor-pointer rounded-full text-black/80 hover:text-white hover:bg-red-500/80 p-1 transition-colors'
								onClick={() => handleProductRemove(u.product.id)}
							>
								<CiCircleRemove size={20} />
							</div>
						</div>
					))}
				</div>
			)}

			<ProductOptions
				show={show}
				setShow={setShow}
				setNewProducts={setNewProducts}
				appliedProductIds={appliedProductIds}
				isAsyncUnits={true}
			/>
		</div>
	)
}

export default CouponUnitList
