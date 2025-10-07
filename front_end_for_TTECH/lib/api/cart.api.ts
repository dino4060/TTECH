import { HttpMethod, TApi } from "@/types/base.types"
import { TCartLineBody } from "@/types/cart.types"
import { RESOURCES } from "../constants/resources"

export const cartApi = {
	get: (): TApi<{}> => ({
		route: `${RESOURCES.CARTS.PRIVATE}`,
		method: HttpMethod.GET,
	}),

	addLine: (body: TCartLineBody): TApi<{}> => ({
		route: `${RESOURCES.CARTS.PRIVATE}/lines`,
		method: HttpMethod.POST,
		body,
	}),

  removeLine: (body): TApi<{}> => ({
		route: `${RESOURCES.CARTS.PRIVATE}/lines`,
		method: HttpMethod.DELETE,
		body,
	}),

	updateQuantity: (body: TCartLineBody) => ({
		route: `${RESOURCES.CARTS.PRIVATE}/lines`,
		method: HttpMethod.PATCH,
		body,
	}),
}
