// src/lib/api/auth.api.ts

import { TAuthResult, TRegisterBody } from "@/types/auth.types";
import { HttpMethod, TApi } from "@/types/base.types";
import { RESOURCES } from "../constants/resources";

export const authApi = {
  // PUBLIC AUTH CONTROLLER //

  register: (body: TRegisterBody): TApi<TAuthResult> => ({
    route: `${RESOURCES.AUTH.PUBLIC}/register`,
    method: HttpMethod.POST,
    body
  }),
};