// src/lib/api/auth.api.ts
import { TAuthResult, TLoginGoogleBody, TLoginPhoneBody, TRegisterBody } from "@/types/auth.types";
import { HttpMethod, TApi } from "@/types/base.types";
import { RESOURCES } from "../constants/resources";

export const authApi = {
  // PUBLIC AUTH CONTROLLER //

  register: (body: TRegisterBody): TApi<TAuthResult> => ({
    route: `${RESOURCES.AUTH.PUBLIC}/register`,
    method: HttpMethod.POST,
    body
  }),

  login: (body: TLoginPhoneBody): TApi<TAuthResult> => ({
    route: `${RESOURCES.AUTH.PUBLIC}/login/phone`,
    method: HttpMethod.POST,
    body
  }),

  loginViaGoogle: (body: TLoginGoogleBody): TApi<TAuthResult> => ({
    route: `${RESOURCES.AUTH.PUBLIC}/login/google`,
    method: HttpMethod.POST,
    body
  }),
};