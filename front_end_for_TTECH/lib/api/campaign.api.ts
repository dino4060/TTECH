// src/lib/api/order.api.ts
import type { TApi } from "@/types/base.types"
import { HttpMethod } from "@/types/base.types"
import { RESOURCES } from "../constants/resources"

export const campaignApi = {}

export const adminCampaignApi = {
	createSale: (body = {}): TApi<{}[]> => ({
		route: `${RESOURCES.CAMPAIGNS.PRIVATE_ADMIN}/sales`,
		method: HttpMethod.POST,
		body,
	}),
}
