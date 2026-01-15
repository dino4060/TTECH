import type { TApi } from "@/types/base.types"
import { HttpMethod } from "@/types/base.types"
import { RESOURCES } from "../constants/resources"

export const adminMembershipApi = {
	delete: (id: number) => ({
		route: `${RESOURCES.MEMBERSHIPS.PRIVATE_ADMIN}/${id}`,
		method: HttpMethod.DELETE,
	}),
	patch: (body: any) => ({
		route: `${RESOURCES.MEMBERSHIPS.PRIVATE_ADMIN}`,
		method: HttpMethod.PATCH,
		body: body,
	}),
	update: (body: any) => ({
		route: `${RESOURCES.MEMBERSHIPS.PRIVATE_ADMIN}`,
		method: HttpMethod.PUT,
		body: body,
	}),
	create: (body: any) => ({
		route: `${RESOURCES.MEMBERSHIPS.PRIVATE_ADMIN}`,
		method: HttpMethod.POST,
		body: body,
	}),
	list: (): TApi<any> => ({
		route: `${RESOURCES.MEMBERSHIPS.PRIVATE_ADMIN}`,
		method: HttpMethod.GET,
	}),
}
