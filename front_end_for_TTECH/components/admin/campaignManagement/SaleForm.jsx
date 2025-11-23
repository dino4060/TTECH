import { motion } from "framer-motion"
import { Fragment, useEffect, useState } from "react"
import LimitCell from "./LimitCell"
import PriceCell from "./PriceCell"
import ProductOptions from "./ProductOptions"
import { CiLogout } from "react-icons/ci"

const SaleForm = ({ action, header, onReturn }) => {
	const [show, setShow] = useState(false)
	const [manage, setManage] = useState(false)
	const [saleUnits, setSaleUnits] = useState([])
	const [newProducts, setNewProducts] = useState(new Set())
	const [appliedProductIds, setAppliedProductIds] = useState(
		new Set()
	)

	const onDelete = (productId) => {
		setSaleUnits(
			saleUnits.filter((u) => u.product.id !== productId)
		)

		appliedProductIds.delete(productId)
		setAppliedProductIds(new Set(appliedProductIds))
	}

	useEffect(() => {
		if (newProducts.size == 0) return

		setSaleUnits((prev) => [
			...Array.from(newProducts).map((p) => ({
				product: p,
				isLive: true,
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

	return (
		<Fragment>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className='flex flex-col'
			>
				<div className='flex justify-between items-center mb-4'>
					<h3 className='text-[2.2rem] font-semibold'>
						{header}
					</h3>

					{action === "ADD" && (
						<CiLogout size={18} onClick={() => onReturn()} />
					)}
				</div>

				{campaignForm.map((input) => (
					<div className=' mb-3 w-full' key={input.key}>
						<h2 className={`text-xl mb-1`}>{input.name}</h2>
						<input
							id={input.key}
							type={input.type}
							disabled={input.disabled}
							// value={currentCampaign?.[input.key]}
							placeholder={input.name}
							className={`outline-none w-full border border-black/50 p-4  text-2xl rounded-2xl font-[500] ${
								input.key === "id" && "text-black/50"
							}`}
						/>
					</div>
				))}

				<div className='flex justify-between items-center mb-4 mt-8'>
					<h3 className='text-[2.2rem] font-semibold '>
						{saleUnits.length !== 0
							? "Danh sách sản phẩm áp dụng"
							: "Chưa có sản phẩm áp dụng"}
					</h3>

					<div className='flex gap-2'>
						<button
							className='self-center px-5 py-2 text-white text-2xl bg-blue-500 rounded-full'
							onClick={() => {
								setShow(!show)
							}}
						>
							Chọn sản phẩm
						</button>

						{saleUnits.length > 0 && (
							<button
								className='self-center px-5 py-2 text-white text-2xl bg-blue-500 rounded-full'
								onClick={() => {
									setManage(!manage)
								}}
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
									{!manage ? (
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

										<PriceCell saleUnit={u} />

										<LimitCell saleUnit={u} />

										{!manage ? (
											<td className='px-4 py-2 font-normal shrink-0 text-center'>
												<span
													style={{
														backgroundColor: u.isLive
															? "#06b6d4"
															: "#ef4444",
													}}
													className='p-2 rounded-xl text-white'
												>
													{u.isLive ? "LIVE" : "OFF"}
												</span>
											</td>
										) : (
											<td className='px-4 py-2 font-normal shrink-0 text-center'>
												<span
													className='text-[1.4rem] font-semibold text-red-500'
													onClick={() => onDelete(u.product.id)}
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

				<button className='bg-blue-500 w-full p-4 mt-4 text-2xl font-semibold text-white rounded-2xl'>
					{action === "ADD" ? "THÊM HOÀN TẤT" : "SỬA HOÀN TẤT"}
				</button>
			</motion.div>

			<ProductOptions
				show={show}
				setShow={setShow}
				setNewProducts={setNewProducts}
				appliedProductIds={appliedProductIds}
			/>
		</Fragment>
	)
}

export default SaleForm

const campaignForm = [
	{
		key: "id",
		name: "ID chiến dịch khuyến mãi",
		type: "text",
		disabled: true,
	},
	{
		key: "name",
		name: "Tên chiến dịch khuyến mãi",
		type: "text",
		disabled: true,
	},
	{
		key: "startTime",
		name: "Thời gian bắt đầu",
		type: "datetime-local",
		disabled: true,
	},
	{
		key: "endTime",
		name: "Thời gian kết thúc",
		type: "datetime-local",
		disabled: true,
	},
]
