// types/product.types.ts
import type { TBase } from "./base.types";
import type { TCategoryBranch, TCategoryBranchLean } from "./category.types";
import type { TProductPrice } from "./price.types";
import type { TShop } from "./shop.types";
import type { TSku } from "./sku.types";

// NESTED TYPES //

export const ProductStatus = {
  DRAFT: 'DRAFT',
  REVIEWING: 'REVIEWING',
  LIVE: 'LIVE',
  DEACTIVATED: 'DEACTIVATED',
  SUSPENDED: 'SUSPENDED',
  DELETED: 'DELETED',
} as const;

export type TProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus];


export type TProductSpecification = {
  name: string;
  value: string;
  link: string | null;
}

export type TProductTierVariation = {
  name: string;
  options: {
    value: string;
    photo: string | null;
  }[];
}

export type TProductMeta = {
  isCodEnabled: boolean;
}

// MAIN TYPES //

export type TProduct = TBase & {
  status: TProductStatus;
  name: string;
  slug: string;
  retailPrice: number;
  thumb: string;
  photos: string[];
  sizeGuidePhoto: string | null;
  video: string | null;
  description: string | null;
  specifications: TProductSpecification[] | null;
  tierVariations: TProductTierVariation[];
  meta: TProductMeta;
  shop: TShop;
  categoryBranch: TCategoryBranch;
  price: TProductPrice;
  skus: TSku[];
}

// SIDE TYPES //

export type TProductOfShopRes = {
  id: number;
  status: TProductStatus;
  name: string;
  slug: string;
  thumb: string;
  photos: string[];
  sizeGuidePhoto: string | null;
  video: string | null;
  retailPrice: number;
  description: string | null;
  specifications: TProductSpecification[] | null;
  tierVariations: TProductTierVariation[];
  meta: TProductMeta;
  skus: TSku[];
  categoryBranch: TCategoryBranch;
};


export type TProductInList = Pick<TProduct,
  'id' | 'name' | 'thumb' | 'meta' | 'price'>;

export type TProductBuyBox = Pick<TProduct,
  'id' | 'name' | 'shop' | 'skus' | 'tierVariations' | 'price'>;

export type TProductShortInfo = Pick<TProductBuyBox,
  'id' | 'name' | 'shop' | 'price'>;

export type TProductSelector = Pick<TProductBuyBox,
  'id' | 'skus' | 'tierVariations'>;

export type TProductBreadcrumb = Pick<TProduct,
  'id' | 'name' | 'categoryBranch'>;

export type TProductMedia = Pick<TProduct,
  'id' | 'thumb' | 'photos' | 'video' | 'sizeGuidePhoto'>;

export type TProductDescription = Pick<TProduct,
  'description' | 'specifications'>;

export type TProductLean = Pick<TProduct,
  'id' | 'name' | 'thumb'>;

export type TProductOfShop = Omit<TProduct,
  'createdAt' | 'updatedAt' | 'isDeleted' | 'shop' | 'price' | 'categoryBranch'
> & {
  categoryBranch: TCategoryBranchLean;
};

// API TYPES //

export type TProductSearchQuery = {
  keyword: string | undefined;
}