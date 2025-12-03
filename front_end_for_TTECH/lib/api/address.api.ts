import { HttpMethod, TApi } from "@/types/base.types"
import { RESOURCES } from "../constants/resources"

export const addressApi = {
	getWarehouse: (): TApi<{}> => ({
		route: `${RESOURCES.ADDRESSES.PUBLIC}/warehouse`,
		method: HttpMethod.GET,
	}),
}
