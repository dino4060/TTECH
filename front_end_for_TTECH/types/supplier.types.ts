// types/supplier.types.ts
import type { TBase } from "./base.types";

// MAIN TYPES //

export type TSupplier = TBase & {
  name: string;
};

// SIDE TYPES //

export type TCategoryInList = Pick<TSupplier, 'id' | 'name'>

export type TCategoryToWrite = Pick<TSupplier, 'name'>
