// src/lib/api/order.api.ts
import type { TApi } from "@/types/base.types"
import { HttpMethod } from "@/types/base.types"
import { RESOURCES } from "../constants/resources"

export const orderApi = {
	list: (): TApi<{}[]> => ({
		route: `${RESOURCES.ORDERS.PRIVATE}`,
		method: HttpMethod.GET,
	}),

	checkout: (body: any): TApi<{}[]> => ({
		route: `${RESOURCES.ORDERS.PRIVATE}`,
		method: HttpMethod.POST,
		body,
	}),
}

export const adminOrderApi = {
	list: (query = {}): TApi<{}[]> => ({
		route: `${RESOURCES.ORDERS.PRIVATE_ADMIN}`,
		method: HttpMethod.GET,
		query,
	}),
}
