import type { TApi } from "@/types/base.types"
import { HttpMethod } from "@/types/base.types"
import {
	TCouponBodyApply,
	TCouponDataApply,
} from "@/types/coupon.types"
import { RESOURCES } from "../constants/resources"

export const benefitApi = {
	preview: (
		body: TCouponBodyApply
	): TApi<TCouponDataApply> => ({
		route: `${RESOURCES.BENEFITS.PRIVATE}/benefit-previews`,
		method: HttpMethod.POST,
		body,
	}),
}
