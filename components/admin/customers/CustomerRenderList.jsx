import { convertDate } from "@/lib/utils/number"
import { motion } from "framer-motion"

const ColorMap = {
	UPGRADE: "#06b6d4",
	RENEW: "#16a34a",
	DOWNGRADE: "#f97316",
}

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
						Phone
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md bg-white border-blue-500 flex-1 shrink-0 text-center'>
						Đăng ký lúc
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md bg-white border-blue-500 flex-1 shrink-0 text-center'>
						Membership
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md bg-white border-blue-500 flex-1 shrink-0 text-center'>
						Điểm thành viên
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md bg-white border-blue-500 flex-1 shrink-0 text-center'>
						Lịch sử
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md bg-white border-blue-500 flex-1 shrink-0 text-center'>
						Đánh giá lúc
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
							{c.member?.membership?.membershipCode || ""}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{c.member?.points ?? ""}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							<span
								style={{
									backgroundColor: ColorMap[c.member?.status || ""],
								}}
								className='p-2 rounded-xl text-white'
							>
								{c.member?.status || ""}
							</span>
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{c.member?.rankedAt
								? convertDate(c.member.rankedAt)
								: ""}
						</th>
					</motion.tr>
				))}
			</tbody>
		</table>
	)
}

export default CustomerRenderList
