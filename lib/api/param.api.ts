import type { TApi } from "@/types/base.types"
import { HttpMethod } from "@/types/base.types"
import { RESOURCES } from "../constants/resources"

export const adminParamAPI = {
	membershipAPI: {
		get: (): TApi<{}[]> => ({
			route: `${RESOURCES.PARAMS.PRIVATE_ADMIN}/memberships`,
			method: HttpMethod.GET,
		}),
		patch: (body = {}): TApi<{}[]> => ({
			route: `${RESOURCES.PARAMS.PRIVATE_ADMIN}/memberships`,
			method: HttpMethod.PATCH,
			body,
		}),
	},
}
