// types/inventory.types.ts
import type { TBase } from "./base.types";

// MAIN TYPES //

export type TInventory = TBase & {
  stocks: number;
  sales: number;
  total: number;
}

// SIDE TYPES //

export type TInventoryToWrite = Pick<TInventory, 'stocks'>

export type TInventoryInList = TInventory