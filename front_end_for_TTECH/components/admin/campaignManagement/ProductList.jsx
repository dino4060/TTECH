"use client"

import { motion } from "framer-motion"
import { convertTokVND } from "@/utils/until"
import { IoCopyOutline } from "react-icons/io5"

const ProductList = ({
	currentProductChoose,
	setCurrentProductChoose,
	list,
	setList,
}) => {
	const handleClick = (x) => {
		setCurrentProductChoose(x)
	}
	return (
		<div className='mx-auto p-10 container'>
			<div className='overflow-x-auto'>
				<table className='w-full border-spacing-1 border-separate table-auto text-xl bg-white relative'>
					<thead class=' text-black uppercase sticky top-2'>
						<tr className=''>
							<th className='w-[10%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
								Lựa chọn
							</th>
							<th className='w-[30%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
								Tên sản phẩm
							</th>
							<th className='w-[15%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
								Giá bán chính
							</th>
							<th className='w-[15%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
								Giá bán phụ
							</th>
							<th className='w-[15%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
								% Khuyến mãi
							</th>
							<th className='w-[15%] px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
								Tồn kho
							</th>
						</tr>
					</thead>
					<tbody>
						{list.map((x) => (
							<motion.tr
								onClick={() => handleCurrentClick(x)}
								initial={{
									backgroundColor: "#f8fafc",
									padding: 0,
								}}
								whileHover={{
									backgroundColor: "#cbd5e1",
									padding: "10px 0px",
								}}
								transition={{ type: "spring" }}
								key={x.id}
								className='cursor-pointer'
							>
								<motion.th
									whileTap={{ scale: 0.95 }}
									className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'
									onClick={(event) => {
										event.stopPropagation()
									}}
								>
									<div className='flex justify-center items-center gap-2'>
										<input
											type='checkbox'
											checked={x.isSticked} // hoặc thuộc tính nào đó để track trạng thái
											onChange={() => onStickRow(x.id)}
											className='w-6 h-6 cursor-pointer'
										/>
									</div>
								</motion.th>
								<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
									<div className='flex gap-2 '>
										<div className='w-14 h-14 shrink-0 rounded-xl bg-sky-300'>
											<img
												src={x.thumb}
												className='w-full h-full object-cover rounded-xl'
											/>
										</div>
										<div>
											<div className='text-[1.4rem] whitespace-nowrap overflow-hidden text-ellipsis'>
												{x.name}
											</div>
											<div className='text-left'>{`ID: ${x.id}`}</div>
										</div>
									</div>
								</th>
								<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
									{convertTokVND(x.price.skuPrices[0].mainPrice)}
								</th>
								<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
									{x?.price?.skuPrices[0]?.sidePrice
										? convertTokVND(x.price.skuPrices[0].sidePrice)
										: ""}
								</th>
								<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
									{x?.price?.skuPrices[0]?.dealPercent
										? convertTokVND(x.price.skuPrices[0].dealPercent)
										: ""}
								</th>
								<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
									{x.skus[0].inventory.stocks} PCS
								</th>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
		// <ul className=' customScrollBar divide-y py-2 flex flex-col gap-2 h-[600px] overflow-y-scroll p-24'>
		// 	<motion.li
		// 		variants={variants}
		// 		initial='initial'
		// 		animate='animate'
		// 		className='flex items-start gap-2 p-2 cursor-pointer rounded-2xl'
		// 	>
		// 		<div className='w-[30%] text-[1.4rem] whitespace-nowrap overflow-hidden text-ellipsis'>
		// 			Sản phẩm
		// 		</div>
		// 		<div className='w-[10%] text-[1.4rem] whitespace-nowrap overflow-hidden text-ellipsis text-center'>
		// 			Giá bán chính
		// 		</div>
		// 		<div className='w-[10%] text-[1.4rem] whitespace-nowrap overflow-hidden text-ellipsis text-center'>
		// 			Giá phụ
		// 		</div>
		// 		<div className='w-[10%] text-[1.4rem] whitespace-nowrap overflow-hidden text-ellipsis text-center'>
		// 			% Khuyến mãi
		// 		</div>
		// 		<div className='w-[10%] text-[1.4rem] whitespace-nowrap overflow-hidden text-ellipsis text-center'>
		// 			Tồn kho
		// 		</div>
		// 	</motion.li>

		// 	{list.map((x, i) => (
		// 		<motion.li
		// 			key={i}
		// 			variants={variants}
		// 			initial='initial'
		// 			animate={
		// 				currentProductChoose?.id === x?.id
		// 					? "animate"
		// 					: "initial"
		// 			}
		// 			onClick={() => handleClick(x)}
		// 			className='flex items-start gap-2 p-2 cursor-pointer rounded-2xl'
		// 		>
		// 			<div className='w-[30%] flex items-start gap-2 '>
		// 				<div className='w-12 h-12 shrink-0 rounded-xl bg-sky-300'>
		// 					<img
		// 						src={x?.thumb}
		// 						className='w-full h-full object-cover rounded-xl'
		// 					/>
		// 				</div>
		// 				<div className='text-[1.4rem] whitespace-nowrap overflow-hidden text-ellipsis'>
		// 					{x?.name}
		// 				</div>
		// 			</div>
		// 			<div className='w-[10%] text-[1.4rem] whitespace-nowrap overflow-hidden text-ellipsis text-center'>
		// 				{convertTokVND(x?.price?.skuPrices[0]?.mainPrice | 0)}
		// 			</div>
		// 			<div className='w-[10%] text-[1.4rem] whitespace-nowrap overflow-hidden text-ellipsis text-center'>
		// 				{convertTokVND(x?.price?.skuPrices[0]?.sidePrice | 0)}
		// 			</div>
		// 			<div className='w-[10%] text-[1.4rem] whitespace-nowrap overflow-hidden text-ellipsis text-center'>
		// 				{convertTokVND(
		// 					x?.price?.skuPrices[0]?.dealPercent | 0
		// 				)}
		// 			</div>
		// 			<div className='w-[10%] text-[1.4rem] whitespace-nowrap overflow-hidden text-ellipsis text-center'>
		// 				{x?.skus[0]?.inventory?.stocks} pcs
		// 			</div>
		// 		</motion.li>
		// 	))}
		// </ul>
	)
}

export default ProductList

const variants = {
	initial: {
		opacity: 0.6,
		backgroundColor: "white",
	},
	animate: {
		opacity: 1,
		backgroundColor: "#e0f2fe",
		transition: {
			delay: 0.2,
		},
	},
}
