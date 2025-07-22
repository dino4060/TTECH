// types/inventory.types.ts
import type { TBase } from "./base.types";

// MAIN TYPES //

export type TInventory = TBase & {
  stocks: number;
  sales: number;
  total: number;
}