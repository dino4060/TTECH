import { Fragment } from "react"

const VoucherForm = ({ action, campaignType }) => {
	return (
		<Fragment>
			<div className='p-10'>
				<h3 className='text-[2.2rem] font-semibold mb-4'>
					{campaignType}
				</h3>

				<div>Đang phát triển {action}</div>
			</div>
		</Fragment>
	)
}

export default VoucherForm
