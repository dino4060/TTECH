// src/types/auth.types.ts
import type { TCurrentUser, TUserToLoginPhone, TUserToCreate, TUserToLoginUsername } from "./user.types";

// API TYPES //

export type TAuthResult = {
  isAuthenticated: boolean;
  accessToken: string;
  currentUser: TCurrentUser;
};

export type TRegisterBody = TUserToCreate;

export type TLoginPhoneBody = TUserToLoginPhone;

export type TLoginUsernameBody = TUserToLoginUsername;

export type TLoginGoogleBody = { code: string };