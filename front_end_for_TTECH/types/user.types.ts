// src/type/user.types.ts
import type { TBase } from "./base.types";

// NESTED TYPES //

export const UserStatus = {
  LACK_INFO: 'LACK_INFO',
  LIVE: 'LIVE',
  DEACTIVATED: 'DEACTIVATED',
  SUSPENDED: 'SUSPENDED',
  DELETED: 'DELETED',
} as const;

export type TUserStatus = typeof UserStatus[keyof typeof UserStatus];

export const Gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
} as const;

export type TGender = typeof Gender[keyof typeof Gender];

// MAIN TYPES //

export type TUser = TBase & {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  status: TUserStatus;
};

// SIDE TYPES //

export type TCurrentUser = Pick<TUser,
  'id' | 'name' | 'username' | 'email' | 'phone' | 'isEmailVerified' | 'isPhoneVerified' | 'status'>

export type TUserToCreate = Pick<TUser,
  'name' | 'email' | 'phone' | 'password'>
