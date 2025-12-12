import { HttpMethod, TApi } from "@/types/base.types"
import { RESOURCES } from "../constants/resources"

export const adminDashboardApi = {
	calcRevenue: (query = {}): TApi<{}[]> => ({
		route: `${RESOURCES.DASHBOARD.PRIVATE_ADMIN}/revenue`,
		method: HttpMethod.GET,
		query,
	}),
	calcSales: (query = {}): TApi<{}[]> => ({
		route: `${RESOURCES.DASHBOARD.PRIVATE_ADMIN}/sales`,
		method: HttpMethod.GET,
		query,
	}),
	calcRevenueByWeek: (query = {}): TApi<{}[]> => ({
		route: `${RESOURCES.DASHBOARD.PRIVATE_ADMIN}/revenue/weeks`,
		method: HttpMethod.GET,
		query,
	}),
}
