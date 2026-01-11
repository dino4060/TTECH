export type TCouponBodyApply = {
	id?: number
	couponCode?: string
	spendAmount: number
	productIDs: number[]
}

export type TCouponDataApply = {
	isApplied: boolean
	promotionType: string
	id: number
	couponCode: string
	discountAmount: number
	message: string
}

export type TCouponDataCustomer = {
	id: number
	promotionType: string
	name: string
	startTime: string
	endTime: string
	status: string

	couponCode: string
	isFixed: boolean
	discountValue: number
	minSpend: number
	maxDiscount: number
	validityDays: number
	totalLimit: number
	limitPerCustomer: number
	usedCount: number
	isApplyAll: boolean

	isClaimed: boolean
}
