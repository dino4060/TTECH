import { HttpMethod, TApi } from "@/types/base.types"
import {
	TCurrentUser,
	TUserToUpdateBody,
} from "@/types/user.types"
import { RESOURCES } from "../constants/resources"

export const userApi = {
	update: (body: TUserToUpdateBody): TApi<TCurrentUser> => ({
		route: `${RESOURCES.USERS.PRIVATE}`,
		method: HttpMethod.PUT,
		body,
	}),
}
