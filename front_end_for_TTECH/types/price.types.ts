// types/price.types.ts
import type { TBase } from "./base.types";

// MAIN TYPES //

export type TSkuPrice = TBase & {
  mainPrice: number;
  sidePrice: number | null;
  discountPercent: number;
}

export type TProductPrice = TBase & {
  mainPrice: number;
  sidePrice: number | null;
  discountPercent: number;
  maxMainPrice: number | null;
  maxSidePrice: number | null;
  maxDiscountPercent: number | null;
  skuPrices: TSkuPrice[];
}