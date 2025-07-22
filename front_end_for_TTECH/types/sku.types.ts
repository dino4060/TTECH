// types/sku.types.ts
import type { TBase } from "./base.types";
import type { TInventory } from "./inventory.types";

// NESTED TYPES //

export type TSkuStatus = 'LIVE' | 'DEACTIVATED' | 'OUT_OF_STOCK';

// MAIN TYPES //

export type TSku = TBase & {
  status: TSkuStatus;
  code: string;
  tierOptionIndexes: number[];
  tierOptionValue: string;
  retailPrice: number;
  productionCost: number | null;
  inventory: TInventory;
}

// SIDE TYPES //

export type TSkuLean = Pick<TSku,
  'id' | 'code' | 'tierOptionIndexes' | 'tierOptionValue'>;