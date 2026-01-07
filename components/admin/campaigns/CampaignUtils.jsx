import {
	CirclePercentIcon,
	MessagesSquareIcon,
	PackagePlusIcon,
	PencilLineIcon,
	TagIcon,
	TicketIcon,
	UserRoundCheckIcon,
	UserRoundPlusIcon,
	ZapIcon,
} from "lucide-react"
import CouponForm from "./Coupon/CouponForm"
import SaleForm from "./Discount/SaleForm"
import { adminCampaignApi } from "@/lib/api/campaign.api"

export const ActionKeyMap = {
	ADD: "ADD",
	EDIT: "EDIT",
	REMOVE: "REMOVE",
	ANALYZE: "ANALYZE",
}

export const CampaignTypeMap = {
	DAILY_SALE: {
		key: "DAILY_SALE",
		name: "Giảm giá hằng ngày",
		icon: CirclePercentIcon,
		renderForm: (
			CampType,
			action,
			onReturn,
			currentCamp,
			setCurrentCamp,
			setAsyncList
		) => (
			<SaleForm
				CampType={CampType}
				action={action}
				onReturn={onReturn}
				currentCamp={currentCamp}
				setCurrentCamp={setCurrentCamp}
				setAsyncList={setAsyncList}
			/>
		),
	},
	FLASH_SALE: {
		key: "FLASH_SALE",
		name: "Flash Sale",
		icon: ZapIcon,
		renderForm: (
			CampType,
			action,
			onReturn,
			currentCamp,
			setCurrentCamp,
			setAsyncList
		) => (
			<SaleForm
				CampType={CampType}
				action={action}
				onReturn={onReturn}
				currentCamp={currentCamp}
				setCurrentCamp={setCurrentCamp}
				setAsyncList={setAsyncList}
			/>
		),
	},
	NEW_ARRIVAL_SALE: {
		key: "NEW_ARRIVAL_SALE",
		name: "Giảm giá hàng mới về",
		icon: PackagePlusIcon,
		renderForm: (
			CampType,
			action,
			onReturn,
			currentCamp,
			setCurrentCamp,
			setAsyncList
		) => (
			<SaleForm
				CampType={CampType}
				action={action}
				onReturn={onReturn}
				currentCamp={currentCamp}
				setCurrentCamp={setCurrentCamp}
				setAsyncList={setAsyncList}
			/>
		),
	},
	PUBLIC_VOUCHER: {
		key: "PUBLIC_VOUCHER",
		name: "Coupon đơn hàng",
		icon: TicketIcon,
		renderForm: (
			CampType,
			action,
			onReturn,
			currentCamp,
			setCurrentCamp,
			setAsyncList
		) => (
			// 	<CouponForm
			<CouponForm
				CampType={CampType}
				action={action}
				onReturn={onReturn}
				currentCamp={currentCamp}
				setCurrentCamp={setCurrentCamp}
				setAsyncList={setAsyncList}
			/>
		),
	},
	CODE_VOUCHER: {
		key: "CODE_VOUCHER",
		name: "Mã Coupon dành riêng",
		icon: TagIcon,
		renderForm: (
			CampType,
			action,
			onReturn,
			currentCamp,
			setCurrentCamp,
			setAsyncList
		) => (
			<CouponForm
				CampType={CampType}
				action={action}
				onReturn={onReturn}
				currentCamp={currentCamp}
				setCurrentCamp={setCurrentCamp}
				setAsyncList={setAsyncList}
			/>
		),
	},
	REVIEW_VOUCHER: {
		key: "REVIEW_VOUCHER",
		name: "Coupon đánh giá",
		icon: PencilLineIcon,
		renderForm: (CampType, action, onReturn) => (
			<CouponForm
				CampType={CampType}
				action={action}
				onReturn={onReturn}
			/>
		),
	},
	NEW_CUSTOMER_VOUCHER: {
		key: "NEW_CUSTOMER_VOUCHER",
		name: "Coupon khách mới",
		icon: UserRoundPlusIcon,
		renderForm: (CampType, action, onReturn) => (
			<CouponForm
				CampType={CampType}
				action={action}
				onReturn={onReturn}
			/>
		),
	},
	LOYAL_CUSTOMER_VOUCHER: {
		key: "LOYAL_CUSTOMER_VOUCHER",
		name: "Coupon khách quen",
		icon: UserRoundCheckIcon,
		renderForm: (CampType, action, onReturn) => (
			<CouponForm
				CampType={CampType}
				action={action}
				onReturn={onReturn}
			/>
		),
	},
	MESSAGE_VOUCHER: {
		key: "MESSAGE_VOUCHER",
		name: "Coupon tin nhắn",
		icon: MessagesSquareIcon,
		renderForm: (CampType, action, onReturn) => (
			<CouponForm
				CampType={CampType}
				action={action}
				onReturn={onReturn}
			/>
		),
	},
}

export const CampaignApiMap = {
	[CampaignTypeMap.DAILY_SALE.key]: adminCampaignApi.saleApi,

	[CampaignTypeMap.PUBLIC_VOUCHER.key]:
		adminCampaignApi.couponApi,
}
