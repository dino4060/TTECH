import { AlertCircle } from "lucide-react"
import SaleForm from "./SaleForm"
import { CampTypeUn } from "./CampaignAdd"
import { ActionKeyUn } from "./CampaignAction"

const CampaignEdit = ({
	currentCamp,
	setCurrentCamp,
	setAsyncList,
}) => {
	// Nếu chưa chọn campaign
	if (!currentCamp?.id) {
		return (
			<div className='flex flex-col items-center justify-center min-h-[200px] gap-6'>
				<div className='bg-gray-50 border-2 border-gray-300 rounded-2xl p-8 max-w-xl'>
					<div className='flex items-center gap-4 mb-4'>
						<AlertCircle className='w-12 h-12 text-gray-600' />
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

	// Validate promotionType có tồn tại trong CampTypeUn không
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
					<p className='text-red-700 text-lg leading-relaxed'>
						Loại chiến dịch "{currentCamp.promotionType}" không
						được hỗ trợ.
					</p>
					<div className='mt-4 bg-white rounded-lg p-4'>
						<p className='text-sm text-gray-600'>
							<strong>Campaign ID:</strong> {currentCamp.id}
						</p>
						<p className='text-sm text-gray-600'>
							<strong>Type:</strong> {currentCamp.promotionType}
						</p>
					</div>
				</div>
			</div>
		)
	}

	// Render form chỉnh sửa
	return (
		<SaleForm
			CampType={campType}
			action={ActionKeyUn.EDIT}
			currentCamp={currentCamp}
			setCurrentCamp={setCurrentCamp}
			setAsyncList={setAsyncList}
		/>
	)
}

export default CampaignEdit
