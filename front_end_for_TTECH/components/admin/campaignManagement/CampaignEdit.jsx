import { AlertCircle } from "lucide-react"
import { IoAlertCircleOutline } from "react-icons/io5"
import { ActionKeyUn as ActionUn } from "./CampaignAction"
import { CampTypeUn } from "./CampaignAdd"
import SaleForm from "./SaleForm"

const CampaignEdit = ({
	currentCamp,
	setCurrentCamp,
	setAsyncList,
}) => {
	// Nếu promotionType là falsy
	if (!currentCamp?.promotionType) {
		return (
			<div className='flex flex-col items-center justify-center min-h-[200px] gap-6'>
				<div className='bg-gray-50 border-2 border-gray-300 rounded-lg p-8 max-w-xl'>
					<div className='flex items-center gap-4 mb-4'>
						<IoAlertCircleOutline className='w-12 h-12 text-gray-600' />
						<h2 className='text-2xl font-bold text-gray-800'>
							Chưa chọn chiến dịch khuyến mãi
						</h2>
					</div>
					<p className='text-gray-700 text-[1.4rem] leading-relaxed'>
						Vui lòng chọn một chiến dịch từ danh sách bên trái.
					</p>
				</div>
			</div>
		)
	}

	// Nếu promotionType ngoài phạm vi
	const campType = CampTypeUn[currentCamp.promotionType]

	if (!campType) {
		return (
			<div className='flex flex-col items-center justify-center min-h-[400px]'>
				<div className='bg-red-50 border-2 border-red-300 rounded-2xl p-8 max-w-md'>
					<div className='flex items-center gap-4 mb-4'>
						<AlertCircle className='w-12 h-12 text-red-600' />
						<h2 className='text-2xl font-bold text-red-800'>
							Loại chiến dịch không hợp lệ
						</h2>
					</div>
					<p className='text-red-700 text-[1.4rem] leading-relaxed'>
						Loại "{currentCamp.promotionType}" không được hỗ trợ.
					</p>
				</div>
			</div>
		)
	}

	// Render form chỉnh sửa
	return (
		<SaleForm
			CampType={campType}
			action={ActionUn.EDIT}
			currentCamp={currentCamp}
			setCurrentCamp={setCurrentCamp}
			setAsyncList={setAsyncList}
		/>
	)
}

export default CampaignEdit
