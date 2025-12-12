import { HttpMethod, TApi } from "@/types/base.types"
import { RESOURCES } from "../constants/resources"

export const adminDashboardApi = {
	overview: (query = {}): TApi<{}[]> => ({
		route: `${RESOURCES.DASHBOARD.PRIVATE_ADMIN}`,
		method: HttpMethod.GET,
		query,
	}),
}
