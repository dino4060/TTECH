// src/lib/api/order.api.ts
import type { TApi } from "@/types/base.types"
import { HttpMethod } from "@/types/base.types"
import { RESOURCES } from "../constants/resources"

export const campaignApi = {}

export const adminCampaignApi = {
	list: (query = {}): TApi<{}[]> => ({
		route: `${RESOURCES.CAMPAIGNS.PRIVATE_ADMIN}`,
		method: HttpMethod.GET,
		query,
	}),

	saleApi: {
		get: (id: number): TApi<{}[]> => ({
			route: `${RESOURCES.CAMPAIGNS.PRIVATE_ADMIN}/sales/${id}`,
			method: HttpMethod.GET,
		}),

		create: (body = {}): TApi<{}[]> => ({
			route: `${RESOURCES.CAMPAIGNS.PRIVATE_ADMIN}/sales`,
			method: HttpMethod.POST,
			body,
		}),

		update: (id: number, body = {}): TApi<{}[]> => ({
			route: `${RESOURCES.CAMPAIGNS.PRIVATE_ADMIN}/sales/${id}`,
			method: HttpMethod.PUT,
			body,
		}),

		remove: (id: number): TApi<{}[]> => ({
			route: `${RESOURCES.CAMPAIGNS.PRIVATE_ADMIN}/sales/${id}`,
			method: HttpMethod.DELETE,
		}),
	},

	couponApi: {
		get: (id: number): TApi<{}[]> => ({
			route: `${RESOURCES.CAMPAIGNS.PRIVATE_ADMIN}/coupons/${id}`,
			method: HttpMethod.GET,
		}),

		deactivated: (id: number): TApi<{}[]> => ({
			route: `${RESOURCES.CAMPAIGNS.PRIVATE_ADMIN}/coupons/${id}`,
			method: HttpMethod.DELETE,
		}),

		update: (body = {}): TApi<{}[]> => ({
			route: `${RESOURCES.CAMPAIGNS.PRIVATE_ADMIN}/coupons`,
			method: HttpMethod.PUT,
			body,
		}),

		create: (body = {}): TApi<{}[]> => ({
			route: `${RESOURCES.CAMPAIGNS.PRIVATE_ADMIN}/coupons`,
			method: HttpMethod.POST,
			body,
		}),
	},
}
