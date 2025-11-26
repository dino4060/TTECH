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
}
