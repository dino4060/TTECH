import { convertDate } from "@/lib/utils/number"
import { motion } from "framer-motion"

const CustomerRenderList = ({ customerList }) => {
	return (
		<table className='w-full border-spacing-1 border-separate mt-10 table-auto text-xl bg-white relative'>
			<thead className=' text-black uppercase sticky top-2'>
				<tr>
					<th className='px-4 py-2 border border-b-4 rounded-md bg-white border-blue-500 flex-1 shrink-0 text-center'>
						Mã khách hàng
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md bg-white border-blue-500 flex-1 shrink-0 text-center'>
						Tên khách hàng
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md bg-white border-blue-500 flex-1 shrink-0 text-center'>
						Email
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md bg-white border-blue-500 flex-1 shrink-0 text-center'>
						Số điện thoại
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md bg-white border-blue-500 flex-1 shrink-0 text-center'>
						Tạo lúc
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md bg-white border-blue-500 flex-1 shrink-0 text-center'>
						Sửa lúc
					</th>
				</tr>
			</thead>
			<tbody>
				{customerList.map((c) => (
					<motion.tr
						key={c.id}
						initial={{
							backgroundColor: "#f8fafc",
							padding: 0,
						}}
						whileHover={{
							backgroundColor: "#cbd5e1",
							padding: "10px 0px",
						}}
						transition={{ type: "spring" }}
						className='cursor-pointer'
					>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{c.id}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{c.name}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{c.email}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{c.phone}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{convertDate(c.createdAt)}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{convertDate(c.updatedAt)}
						</th>
					</motion.tr>
				))}
			</tbody>
		</table>
	)
}

export default CustomerRenderList
