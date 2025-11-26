"use client"
import { motion } from "framer-motion"

const CampaignRemove = ({}) => {
	// Render form chỉnh sửa
	return (
		<div className='flex justify-center items-center gap-3 min-h-[200px]'>
			<motion.input
				className='border border-red-500 rounded-2xl outline-none
          w-[200px] h-[30px] px-4 text-[1.4rem] text-red-500 placeholder-red-500'
				required
				variants={{
					init: { width: 0 },
					animate: { width: 200 },
				}}
				initial='init'
				exit='init'
				animate='animate'
				placeholder='Nhập vào id để xóa'
				// value={productIdToDelete}
				// onChange={(e) => setProductIdToDelete(e.target.value)}
			/>

			<button
				// onClick={handleDeleteProduct}
				className='py-3 px-5 text-[1.4rem] font-[400] leading-6 text-red-500
          border border-red-500 rounded-xl'
			>
				Xác nhận xóa
			</button>
		</div>
		// <div className='flex flex-col items-center justify-center min-h-[200px] gap-6'>
		// 	<div className='bg-gray-50 border-2 border-gray-300 rounded-lg p-8 max-w-xl'>
		// 		<div className='flex items-center gap-4'>
		// 			<IoDiscOutline className='w-12 h-12 text-gray-600' />
		// 			<h2 className='text-2xl font-bold text-gray-800 pr-3'>
		// 				Đã bật chế độ xóa
		// 			</h2>
		// 		</div>
		// 	</div>
		// </div>
	)
}

export default CampaignRemove
