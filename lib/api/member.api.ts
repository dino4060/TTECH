import type { TApi } from "@/types/base.types"
import { HttpMethod } from "@/types/base.types"
import { RESOURCES } from "../constants/resources"

export const memberApi = {
	offerMembership: (): TApi<any> => ({
		route: `${RESOURCES.MEMBERS.PRIVATE}`,
		method: HttpMethod.GET,
	}),
}
