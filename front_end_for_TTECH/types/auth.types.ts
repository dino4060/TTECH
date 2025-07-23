// src/types/auth.types.ts
import type { TCurrentUser, TUserToLoginPhone, TUserToCreate } from "./user.types";

// API TYPES //

export type TAuthResult = {
  isAuthenticated: boolean;
  accessToken: string;
  currentUser: TCurrentUser;
};

export type TRegisterBody = TUserToCreate;

export type TLoginPhoneBody = TUserToLoginPhone;