import {
	CirclePercentIcon,
	MessagesSquareIcon,
	PackagePlusIcon,
	PencilLineIcon,
	TagIcon,
	TicketIcon,
	TruckElectricIcon,
	UserRoundCheckIcon,
	UserRoundPlusIcon,
	ZapIcon,
} from "lucide-react"
import CouponForm from "./Coupon/CouponForm"
import SaleForm from "./Discount/SaleForm"
import { adminCampaignApi } from "@/lib/api/campaign.api"
import CouponCodeForm from "./CouponCode/CouponCodeForm"
import ShippingCouponForm from "./CouponShipping/ShippingCouponForm"

export const ModeEnum = {
	ADD: "ADD",
	EDIT: "EDIT",
	DELETE: "DELETE",
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
	NEW_ARRIVAL_DISCOUNT: {
		key: "NEW_ARRIVAL_DISCOUNT",
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
	ORDER_COUPON: {
		key: "ORDER_COUPON",
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
	COUPON_CODE: {
		key: "COUPON_CODE",
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
			<CouponCodeForm
				CampType={CampType}
				action={action}
				onReturn={onReturn}
				currentCamp={currentCamp}
				setCurrentCamp={setCurrentCamp}
				setAsyncList={setAsyncList}
			/>
		),
	},
	SHIPPING_COUPON: {
		key: "SHIPPING_COUPON",
		name: "Coupon vận chuyển",
		icon: TruckElectricIcon,
		renderForm: (
			CampType,
			action,
			onReturn,
			currentCamp,
			setCurrentCamp,
			setAsyncList
		) => (
			<ShippingCouponForm
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

export const CampaignGroupList = [
	{
		key: "SALE",
		name: "Giảm giá",
		note:
			"Giảm giá sản phẩm giúp tăng sức cạnh tranh với đối thủ",
		CampTypes: [
			CampaignTypeMap.DAILY_SALE,
			CampaignTypeMap.FLASH_SALE,
			CampaignTypeMap.NEW_ARRIVAL_DISCOUNT,
		],
	},
	{
		key: "VOUCHER",
		name: "Coupon",
		note:
			"Trao tặng Coupon thúc đẩy khách hàng chi tiêu nhiều hơn",
		CampTypes: [
			CampaignTypeMap.ORDER_COUPON,
			CampaignTypeMap.COUPON_CODE,
			CampaignTypeMap.SHIPPING_COUPON,
			// CampaignTypeMap.REVIEW_VOUCHER,
			// CampaignTypeMap.NEW_CUSTOMER_VOUCHER,
			// CampaignTypeMap.LOYAL_CUSTOMER_VOUCHER,
			// CampaignTypeMap.MESSAGE_VOUCHER,
		],
	},
]

export const CampaignApiMap = {
	[CampaignTypeMap.DAILY_SALE.key]:
		adminCampaignApi.discountApi,

	[CampaignTypeMap.ORDER_COUPON.key]:
		adminCampaignApi.couponApi,

	[CampaignTypeMap.COUPON_CODE.key]:
		adminCampaignApi.couponApi,

	[CampaignTypeMap.SHIPPING_COUPON.key]:
		adminCampaignApi.couponApi,
}

export const DEFAULT_MEMBERSHIP = {
	id: undefined,
	membershipCode: undefined,
	minPoint: undefined,
	isAlive: undefined,
	benefits: [],
}

export const DEFAULT_CAMPAIGN = (promotionType) => ({
	promotionType,
	id: "",
	name: "",
	startTime: "",
	endTime: "",
})

export const pickCampaign = (data) => {
	const { promotionType, id, name, startTime, endTime } =
		data
	return { promotionType, id, name, startTime, endTime }
}

export const DEFAULT_COUPON_CONFIG = {
	couponCode: undefined,
	isFixed: true,
	discountValue: undefined,
	minSpend: undefined,
	maxDiscount: undefined,
	totalLimit: undefined,
	usedCount: undefined,
	limitPerCustomer: undefined,
	validityDays: undefined,
}

export const pickCouponConfig = (data) => {
	const {
		couponCode,
		isFixed,
		discountValue,
		minSpend,
		maxDiscount,
		totalLimit,
		usedCount,
		limitPerCustomer,
		validityDays,
	} = data
	return {
		couponCode,
		isFixed,
		discountValue,
		minSpend,
		maxDiscount,
		totalLimit,
		usedCount,
		limitPerCustomer,
		validityDays,
	}
}

export const DEFAULT_COUPON_PRODUCTS = {
	isApplyAll: true,
	units: [],
}

export const pickCouponProducts = (data) => {
	const { isApplyAll, units } = data
	return { isApplyAll, units }
}
