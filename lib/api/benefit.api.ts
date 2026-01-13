import type { TApi } from "@/types/base.types"
import { HttpMethod } from "@/types/base.types"
import { RESOURCES } from "../constants/resources"
import {
	TCouponBodyApply,
	TCouponDataApply,
	TCouponDataCustomer,
} from "@/types/coupon.types"

export const benefitApi = {
	preview: (
		body: TCouponBodyApply
	): TApi<TCouponDataApply> => ({
		route: `${RESOURCES.BENEFITS.PRIVATE}/benefit-previews`,
		method: HttpMethod.POST,
		body,
	}),
}
