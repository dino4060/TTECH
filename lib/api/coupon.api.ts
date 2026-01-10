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
		route: `${RESOURCES.CAMPAIGNS.PRIVATE}/coupons/preview`,
		method: HttpMethod.POST,
		body,
	}),
}
