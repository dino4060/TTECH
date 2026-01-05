// src/lib/api/product.api.ts
import type { TApi, TPage } from "@/types/base.types"
import { HttpMethod } from "@/types/base.types"
import type { TCategoryInList } from "@/types/category.types"
import {
	TProductInList,
	TProductQuery,
	TProductToSell,
	TProductToWrite,
} from "@/types/product.types"
import { RESOURCES } from "../constants/resources"

export const productApi = {
	// PUBLIC HOME //

	list: (query: TProductQuery): TApi<TProductToSell[]> => ({
		route: `${RESOURCES.PRODUCTS.PUBLIC}`,
		method: HttpMethod.GET,
		query,
	}),

	get: (id: number): TApi<TPage<TProductInList>> => ({
		route: `${RESOURCES.PRODUCTS.PUBLIC}/${id}`,
		method: HttpMethod.GET,
	}),
}

export const adminProductApi = {
	// PRIVATE DASHBOARD //

	list: (): TApi<TPage<TProductInList[]>> => ({
		route: `${RESOURCES.PRODUCTS.PRIVATE_ADMIN}/list`,
		method: HttpMethod.GET,
	}),

	create: (body: TProductToWrite): TApi<TProductInList> => ({
		route: `${RESOURCES.PRODUCTS.PRIVATE_ADMIN}`,
		method: HttpMethod.POST,
		body,
	}),

	update: (
		id: number,
		body: TProductToWrite
	): TApi<TCategoryInList> => ({
		route: `${RESOURCES.PRODUCTS.PRIVATE_ADMIN}/${id}`,
		method: HttpMethod.PUT,
		body,
	}),

	delete: (id: number): TApi<void> => ({
		route: `${RESOURCES.PRODUCTS.PRIVATE_ADMIN}/${id}`,
		method: HttpMethod.DELETE,
	}),
}
