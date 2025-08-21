// types/price.types.ts
import type { TBase } from "./base.types";

// MAIN TYPES //

export type TSkuPrice = TBase & {
  mainPrice: number;
  sidePrice: number;
  discountPercent: number;
}

export type TPrice = TSkuPrice & {
  maxMainPrice: number | null;
  maxSidePrice: number | null;
  maxDiscountPercent: number | null;
}

// SIDE TYPES //

export type TSkuPriceInList = TSkuPrice

export type TPriceInList = TPrice & {
  skuPrices: TSkuPriceInList[];
}