"use client"
import { Fragment, useState } from "react"
import CampaignType from "./CampaignType"

const CampaignAdd = ({ currentCamp, setAsyncList }) => {
	const [RenderStep2, setRenderStep2] = useState(null)

	return (
		<Fragment>
			{!RenderStep2 ? (
				<CampaignType
					setRenderStep2={setRenderStep2}
					currentCamp={currentCamp}
					setAsyncList={setAsyncList}
				/>
			) : (
				<RenderStep2 />
			)}
		</Fragment>
	)
}

export default CampaignAdd

const CampaignForms = [
	{
		key: "DAILY_SALE",
		render: (
			campType,
			action,
			onReturn,
			currentCamp,
			setAsyncList
		) => (
			<SaleForm
				campType={campType}
				action={action}
				onReturn={onReturn}
				currentCamp={currentCamp}
				setAsyncList={setAsyncList}
			/>
		),
	},
	{
		key: "FLASH_SALE",
		render: (
			campType,
			action,
			onReturn,
			currentCamp,
			setAsyncList
		) => (
			<SaleForm
				campType={campType}
				action={action}
				onReturn={onReturn}
				currentCamp={currentCamp}
				setAsyncList={setAsyncList}
			/>
		),
	},
	{
		key: "NEW_ARRIVAL_SALE",
		render: (
			campType,
			action,
			onReturn,
			currentCamp,
			setAsyncList
		) => (
			<SaleForm
				campType={campType}
				action={action}
				onReturn={onReturn}
				currentCamp={currentCamp}
				setAsyncList={setAsyncList}
			/>
		),
	},
	{
		key: "VOUCHER",
		CampaignTypes: [
			{
				key: "PUBLIC_VOUCHER",
				name: "Voucher đơn hàng",
				icon: TicketIcon,
				render: (campType, action, onReturn) => (
					<VoucherForm
						campType={campType}
						action={action}
						onReturn={onReturn}
					/>
				),
			},
			{
				key: "CODE_VOUCHER",
				render: (campType, action, onReturn) => (
					<VoucherForm
						campType={campType}
						action={action}
						onReturn={onReturn}
					/>
				),
			},
			{
				key: "REVIEW_VOUCHER",
				render: (campType, action, onReturn) => (
					<VoucherForm
						campType={campType}
						action={action}
						onReturn={onReturn}
					/>
				),
			},
			{
				key: "NEW_CUSTOMER_VOUCHER",
				render: (campType, action, onReturn) => (
					<VoucherForm
						campType={campType}
						action={action}
						onReturn={onReturn}
					/>
				),
			},
			{
				key: "LOYAL_CUSTOMER_VOUCHER",
				render: (campType, action, onReturn) => (
					<VoucherForm
						campType={campType}
						action={action}
						onReturn={onReturn}
					/>
				),
			},
			{
				key: "MESSAGE_VOUCHER",
				render: (campType, action, onReturn) => (
					<VoucherForm
						campType={campType}
						action={action}
						onReturn={onReturn}
					/>
				),
			},
		],
	},
]
