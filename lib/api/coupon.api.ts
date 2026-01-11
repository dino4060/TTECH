import type { TApi } from "@/types/base.types"
import { HttpMethod } from "@/types/base.types"
import { RESOURCES } from "../constants/resources"
import {
	TCouponBodyApply,
	TCouponDataApply,
	TCouponDataCustomer,
} from "@/types/coupon.types"

export const couponApi = {
	preview: (
		body: TCouponBodyApply
	): TApi<TCouponDataApply> => ({
		route: `${RESOURCES.CAMPAIGNS.PRIVATE}/coupons/coupon-previews`,
		method: HttpMethod.POST,
		body,
	}),
	previewClaims: (
		body: TCouponBodyApply
	): TApi<Array<TCouponDataApply>> => ({
		route: `${RESOURCES.CAMPAIGNS.PRIVATE}/coupons/coupon-previews/coupon-claims`,
		method: HttpMethod.POST,
		body,
	}),
	claim: (couponId: number): TApi<{}> => ({
		route: `${RESOURCES.CAMPAIGNS.PRIVATE}/coupons/coupon-claims/${couponId}`,
		method: HttpMethod.POST,
	}),
	unclaim: (couponId: number): TApi<{}> => ({
		route: `${RESOURCES.CAMPAIGNS.PRIVATE}/coupons/coupon-claims/${couponId}`,
		method: HttpMethod.DELETE,
	}),
	list: (
		productId: number
	): TApi<Array<TCouponDataCustomer>> => ({
		route: `${RESOURCES.CAMPAIGNS.PRIVATE}/coupons?product-id=${productId}`,
		method: HttpMethod.GET,
	}),
}
