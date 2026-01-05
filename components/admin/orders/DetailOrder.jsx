import Notification from "@/components/uncategory/Notification"
import { adminOrderApi } from "@/lib/api/order.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { convertTo000D } from "@/lib/utils/number2"
import { useEffect, useState } from "react"
import { CiMinimize1 } from "react-icons/ci"

const DetailOrder = ({
	currentOrderClick,
	setCurrentOrderClick,
	setTrigger,
}) => {
	const [data, setData] = useState({
		state: currentOrderClick?.status,
	})
	const [notifications, setNotifications] = useState(false)
	const [orderDetailList, setOrderDetailList] = useState([])

	useEffect(() => {
		getOrderDetailByOrderId()
	}, [])

	const getOrderDetailByOrderId = async () => {
		setOrderDetailList(currentOrderClick.lines)
	}

	const handleValueChange = (e) => {
		const { id, value } = e.target
		if (id === "state") {
			setData((pre) => ({ ...pre, [id]: value }))
		}
	}

	const handleSubmit = async () => {
		await clientFetch(
			adminOrderApi.update({
				id: currentOrderClick.id,
				status: data.state,
			})
		)
		setCurrentOrderClick({})
		setTrigger((pre) => !pre)
	}

	return (
		<div className='container mx-auto'>
			{notifications && (
				<Notification
					notifications={notifications}
					setNotifications={setNotifications}
					notification={{
						text: "Cập nhật thành công",
						style: "success",
					}}
				/>
			)}
			<div className='flex justify-between mt-10'>
				<h1 className='text-4xl capitalize font-[700]'>
					Chi tiết hóa đơn
				</h1>

				<div
					className='mt-10 mr-10 p-2 bg-gradient-to-bl from-blue-400 rounded-xl to-blue-700'
					onClick={() => setCurrentOrderClick({})}
				>
					<CiMinimize1 size={18} className='text-white' />
				</div>
			</div>
			<div className='flex mt-5 h-[500px]'>
				{/* <form
					onSubmit={(e) => e.preventDefault()}
					className='grow-[2] shrink-0 text-2xl'
				>
					<select
						id='state'
						onChange={handleValueChange}
						className='w-full'
					>
						{state.map((x, i) => (
							<option
								value={x}
								key={i}
								selected={x === currentOrderClick.status}
							>
								{x}
							</option>
						))}
					</select>
					<button
						className='bg-blue-500 w-full mt-2 text-white py-1 px-2 rounded-3xl'
						onClick={handleSubmit}
					>
						Xác nhận
					</button>
				</form> */}
				<div className='grow-[5] text-2xl shrink-0 flex flex-wrap'>
					{orderDetailList?.map((x) => (
						<div
							className='flex flex-col items-center gap-4'
							key={x.product.id}
						>
							<div className='w-[200px] h-[200px]'>
								<img
									src={x.product.thumb}
									className='w-full h-full object-cover'
								/>
							</div>
							<h1 className='w-[150px] overflow-ellipsis whitespace-nowrap text-center'>
								{x.product.name.slice(0, 20)}...
							</h1>
							<h1 className='w-[150px] overflow-ellipsis whitespace-nowrap text-center'>
								{convertTo000D(x.mainPrice)}
							</h1>
							<h2 className='px-2 text-white bg-blue-500 font-bold'>
								{x.quantity}
							</h2>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default DetailOrder

const state = [
	"PENDING",
	"completed",
	"cancelled",
	"banked",
]
