// src/lib/api/auth.api.ts
import { HttpMethod, TApi } from "@/types/base.types";
import { TCurrentUser, TUserToUpdateBody } from "@/types/user.types";
import { RESOURCES } from "../constants/resources";

export const userApi = {
  // PRIVATE USER CONTROLLER //

  update: (body: TUserToUpdateBody): TApi<TCurrentUser> => ({
    route: `${RESOURCES.USERS.PRIVATE}/update`,
    method: HttpMethod.PUT,
    body
  })
};