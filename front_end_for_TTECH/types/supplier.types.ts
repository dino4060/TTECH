// types/supplier.types.ts
import type { TBase } from "./base.types";

// MAIN TYPES //

export type TSupplier = TBase & {
  name: string;
};

// SIDE TYPES //

export type TSupplierInList = Pick<TSupplier, 'id' | 'name'>

export type TSupplierToWrite = Pick<TSupplier, 'name'>
