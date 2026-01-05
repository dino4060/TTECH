// types/supplier.types.ts
import type { TBase } from "./base.types";

// MAIN TYPES //

export type TSeries = TBase & {
  name: string;
};

// SIDE TYPES //

export type TSeriesInList = Pick<TSeries, 'id' | 'name'>

export type TSeriesToWrite = Pick<TSeries, 'name'>
