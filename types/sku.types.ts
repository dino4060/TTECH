// types/sku.types.ts
import type { TBase } from "./base.types";
import type { TInventoryInList, TInventoryToWrite } from "./inventory.types";

// NESTED TYPES //

export const SkuStatus = {
  LIVE: 'LIVE',
  DEACTIVATED: 'DEACTIVATED',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
} as const;

export type TSkuStatus = typeof SkuStatus[keyof typeof SkuStatus];

// MAIN TYPES //

export type TSku = TBase & {
  status: TSkuStatus;
  code: string;
  tierOptionIndexes: number[];
  tierOptionValue: string;
  retailPrice: number;
  productionCost: number | null;
}

// SIDE TYPES //

export type TSkuToWrite = Pick<TSku, 'code' | 'retailPrice'> & {
  inventory: TInventoryToWrite;
};

export type TSkuInList = Pick<TSku, 'code' | 'retailPrice' | 'status'> & {
  inventory: TInventoryInList;
};