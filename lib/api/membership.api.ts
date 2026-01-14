import type { TApi } from "@/types/base.types"
import { HttpMethod } from "@/types/base.types"
import { RESOURCES } from "../constants/resources"

export const adminMembershipApi = {
	list: (): TApi<any> => ({
		route: `${RESOURCES.MEMBERSHIPS.PRIVATE_ADMIN}`,
		method: HttpMethod.GET,
	}),
}
