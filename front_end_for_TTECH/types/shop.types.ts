// src/types/shop.types.ts
import type { TBase } from "./base.types";

// NESTED TYPES //

export const BusinessType = {
  INDIVIDUAL: 'INDIVIDUAL',
  HOUSEHOLD: 'HOUSEHOLD',
  ENTERPRISE: 'ENTERPRISE'
} as const;

export type TBusinessType = (typeof BusinessType)[keyof typeof BusinessType];

export const ShopStatus = {
  VERIFYING: 'VERIFYING',
  REVIEWING: 'REVIEWING',
  LIVE: 'LIVE',
  DEACTIVATED: 'DEACTIVATED',
  SUSPENDED: 'SUSPENDED',
  CLOSED: 'CLOSED',
  DELETED: 'DELETED',
} as const;

export type TShopStatus = (typeof ShopStatus)[keyof typeof ShopStatus];

// MAIN TYPES //

export type TShop = TBase & {
  code: string;
  name: string;
  photo: string;
  status: TShopStatus;
  contactEmail: string;
  contactPhone: string;
  businessType: TBusinessType;
};

export type TCurrentShop = Omit<TShop, 'createdAt' | 'updatedAt' | 'isDeleted'>;

// API TYPES //

export type TVerifyShopBody = {
  businessType: TBusinessType;
  name: string;
  contactEmail: string;
  contactPhone: string;
};

export type TVerifyShopResult = {
  isVerified: boolean;
};