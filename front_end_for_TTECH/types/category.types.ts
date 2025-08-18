// types/category.types.ts
import type { TBase } from "./base.types";

// MAIN TYPES //

export type TCategory = TBase & {
  name: string;
  position: number;
};

// SIDE TYPES //

export type TCategoryInList = Pick<TCategory, 'id' | 'name' | 'position'>

export type TCategoryToWrite = Pick<TCategory, 'name' | 'position'>
