// src/types/auth.types.ts
import type { TCurrentUser } from "./user.types";

// API TYPES //

export type TAuthResult = {
  isAuthenticated: boolean;
  accessToken: string;
  currentUser: TCurrentUser;
};

export type TAuthEmailBody = {
  email: string;
  password: string;
};

export type TAuthGoogleBody = {
  code: string;
};