// types/product.types.ts
import type { TBase, TId } from "./base.types";
import { TCategoryInList } from "./category.types";
import { TPriceInList } from "./price.types";
import { TSkuInList, TSkuToWrite } from "./sku.types";
import { TSupplierInList } from "./supplier.types";

// NESTED TYPES //

export const ProductStatus = {
  DRAFT: 'DRAFT',
  REVIEWING: 'REVIEWING',
  LIVE: 'LIVE',
  DEACTIVATED: 'DEACTIVATED',
  SUSPENDED: 'SUSPENDED',
  DELETED: 'DELETED',
} as const;

export type TProductStatus = typeof ProductStatus[keyof typeof ProductStatus];

// MAIN TYPES //

export type TProduct = TBase & {
  name: string;
  serialNumber: string;
  retailPrice: number;
  guaranteeMonths: number;
  thumb: string;
  photos?: string[];
  description?: string;
  status: TProductStatus;
};

// SIDE TYPES //

export type TProductToWrite = Omit<TProduct, 'status'> & {
  category: TId;
  supplier: TId;
  skus: TSkuToWrite[];
}

export type TProductInList = TProduct & {
  category: TCategoryInList;
  supplier: TSupplierInList;
  price: TPriceInList;
  skus: TSkuInList[];
};