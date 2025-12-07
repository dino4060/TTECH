import type { TApi } from "@/types/base.types"
import { HttpMethod } from "@/types/base.types"
import { RESOURCES } from "../constants/resources"

export const orderApi = {
	list: (): TApi<{}[]> => ({
		route: `${RESOURCES.ORDERS.PRIVATE}`,
		method: HttpMethod.GET,
	}),

	get: (id: number): TApi<{}[]> => ({
		route: `${RESOURCES.ORDERS.PRIVATE}/${id}`,
		method: HttpMethod.GET,
	}),

	checkout: (body: any): TApi<{}[]> => ({
		route: `${RESOURCES.ORDERS.PRIVATE}`,
		method: HttpMethod.POST,
		body,
	}),

	update: (body: any): TApi<{}[]> => ({
		route: `${RESOURCES.ORDERS.PRIVATE}`,
		method: HttpMethod.PATCH,
		body,
	}),

	cancel: (id: number): TApi<{}[]> => ({
		route: `${RESOURCES.ORDERS.PRIVATE}/${id}`,
		method: HttpMethod.DELETE,
	}),
}

export const adminOrderApi = {
	list: (query = {}): TApi<{}[]> => ({
		route: `${RESOURCES.ORDERS.PRIVATE_ADMIN}`,
		method: HttpMethod.GET,
		query,
	}),
}
