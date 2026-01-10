import type { TApi } from "@/types/base.types"
import { HttpMethod } from "@/types/base.types"
import { RESOURCES } from "../constants/resources"

export const couponApi = {
	preview: (body: {
		id?: number
		couponCode?: string
		spendAmount: number
		productIDs: number[]
	}): TApi<{
		isApplied: boolean
		promotionType: string
		id: number
		couponCode: string
		discountAmount: number
		message: string
	}> => ({
		route: `${RESOURCES.CAMPAIGNS.PRIVATE}/coupons`,
		method: HttpMethod.POST,
		body,
	}),
	list: (
		productId: number
	): TApi<
		Array<{
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
		}>
	> => ({
		route: `${RESOURCES.CAMPAIGNS.PRIVATE}/coupons?product-id=${productId}`,
		method: HttpMethod.GET,
	}),
	claim: (body: { couponId: number }): TApi<{}> => ({
		route: `${RESOURCES.CAMPAIGNS.PRIVATE}/coupons/claim`,
		method: HttpMethod.POST,
		body,
	}),
}
