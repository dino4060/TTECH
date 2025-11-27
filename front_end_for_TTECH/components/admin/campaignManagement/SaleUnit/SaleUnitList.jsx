"use client"
import { motion } from "framer-motion"
import { Fragment, useEffect, useState } from "react"
import ProductOptions from "../ProductOptions"
import LimitCell from "./LimitCell"
import PriceCell from "./PriceCell"

const SaleUnitList = ({
	saleUnits,
	setSaleUnits,
	isAsyncUnits,
}) => {
	const [show, setShow] = useState(false)
	const [remove, setRemove] = useState(false)
	const [newProducts, setNewProducts] = useState(new Set())
	const [appliedProductIds, setAppliedProductIds] = useState(
		new Set()
	)

	// Choose new products =>  Add sale units
	useEffect(() => {
		if (newProducts.size == 0) return

		setSaleUnits((prev) => [
			...Array.from(newProducts).map((p) => ({
				id: 0,
				product: p,
				isOn: true,
				dealPrice: 0,
				dealPercent: 0,
				totalLimit: -1,
				usedCount: 0,
				levelType: "PRODUCT",
			})),
			...prev,
		])

		setAppliedProductIds(
			(prev) =>
				new Set([
					...Array.from(newProducts).map((p) => p.id),
					...prev,
				])
		)

		setNewProducts(new Set())
	}, [newProducts])

	// Clean setAsyncList
	useEffect(() => {
		setAppliedProductIds(new Set())
	}, [isAsyncUnits])

	const onRemoveSaleUnit = (productId) => {
		setSaleUnits(
			saleUnits.filter((u) => u.product.id !== productId)
		)
		appliedProductIds.delete(productId)
		setAppliedProductIds(new Set(appliedProductIds))
	}

	const onEditSaleUnit = (saleUnit) => {
		setSaleUnits(
			saleUnits.map((u) => {
				if (u.product.id !== saleUnit.product.id) return u
				else return saleUnit
			})
		)
	}

	return (
		<Fragment>
			<div className='flex justify-between items-center mb-4 mt-8'>
				<h3 className='text-[2.2rem] font-semibold '>
					{saleUnits.length > 0
						? "Danh sách sản phẩm áp dụng"
						: "Chưa có sản phẩm áp dụng"}
				</h3>

				<div className='flex gap-2'>
					<button
						className='self-center px-5 py-2 text-white text-2xl bg-blue-500 rounded-full'
						onClick={() => setShow(!show)}
					>
						Chọn sản phẩm
					</button>

					{saleUnits.length > 0 && (
						<button
							className='self-center px-5 py-2 text-white text-2xl bg-blue-500 rounded-full'
							onClick={() => setRemove(!remove)}
						>
							Xóa
						</button>
					)}
				</div>
			</div>

			{saleUnits.length !== 0 && (
				<div className='overflow-x-auto'>
					<table className='w-full border-spacing-1 border-separate table-fixed text-xl bg-white relative'>
						<thead class=' text-black uppercase sticky top-2'>
							<tr>
								<th className='w-[40%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white shrink-0 text-center'>
									Tên sản phẩm
								</th>
								<th className='w-[25%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white shrink-0 text-center'>
									Giảm giá
								</th>
								<th className='w-[25%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white shrink-0 text-center'>
									Hạn mức
								</th>
								{!remove ? (
									<th className='w-[10%] py-2 border border-b-4 rounded-md border-blue-500 bg-white shrink-0 text-center'>
										Trạng thái
									</th>
								) : (
									<th className='w-[10%] py-2 border border-b-4 rounded-md border-blue-500 bg-white shrink-0 text-center'></th>
								)}
							</tr>
						</thead>

						<tbody>
							{saleUnits.map((u) => (
								<motion.tr
									key={u.product.id}
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
										<div className='flex gap-2 '>
											<div className='w-14 h-14 shrink-0 rounded-xl bg-sky-300'>
												<img
													src={u.product.thumb}
													className='w-full h-full object-cover rounded-xl'
												/>
											</div>
											<div className='flex-1 min-w-0 text-left'>
												<div className='text-[1.4rem] whitespace-nowrap overflow-hidden text-ellipsis'>
													{u.product.name}
												</div>
												<div>ID: {u.product.id}</div>
											</div>
										</div>
									</td>

									<PriceCell
										saleUnit={u}
										onEditSaleUnit={onEditSaleUnit}
									/>

									<LimitCell
										saleUnit={u}
										onEditSaleUnit={onEditSaleUnit}
									/>

									{!remove ? (
										<td className='px-4 py-2 font-normal shrink-0 text-center'>
											<span
												style={{
													backgroundColor: u.isOn
														? "#06b6d4"
														: "#ef4444",
												}}
												className='p-2 rounded-xl text-white'
											>
												{u.isOn ? "ON" : "OFF"}
											</span>
										</td>
									) : (
										<td className='px-4 py-2 font-normal shrink-0 text-center'>
											<span
												className='text-[1.4rem] font-semibold text-red-500'
												onClick={() => onRemoveSaleUnit(u.product.id)}
											>
												Xóa
											</span>
										</td>
									)}
								</motion.tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			<ProductOptions
				show={show}
				setShow={setShow}
				setNewProducts={setNewProducts}
				appliedProductIds={appliedProductIds}
				isAsyncUnits={isAsyncUnits}
			/>
		</Fragment>
	)
}

export default SaleUnitList
