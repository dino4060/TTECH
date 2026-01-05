// src/lib/api/category.api.ts
import type { TApi } from "@/types/base.types";
import { HttpMethod } from "@/types/base.types";
import type { TCategoryInList, TCategoryToWrite } from "@/types/category.types";
import { RESOURCES } from "../constants/resources";

export const categoryApi = {
  // PUBLIC CATEGORY CONTROLLER //

  list: (): TApi<TCategoryInList[]> => ({
    route: `${RESOURCES.CATEGORIES.PUBLIC}/list`,
    method: HttpMethod.GET,
  }),
};

export const adminCategoryApi = {
  // PRIVATE ADMIN CATEGORY CONTROLLER //

  list: (): TApi<TCategoryInList[]> => ({
    route: `${RESOURCES.CATEGORIES.PRIVATE_ADMIN}/list`,
    method: HttpMethod.GET,
  }),

  create: (body: TCategoryToWrite): TApi<TCategoryInList> => ({
    route: `${RESOURCES.CATEGORIES.PRIVATE_ADMIN}`,
    method: HttpMethod.POST,
    body,
  }),

  update: (id: number, body: TCategoryToWrite): TApi<TCategoryInList> => ({
    route: `${RESOURCES.CATEGORIES.PRIVATE_ADMIN}/${id}`,
    method: HttpMethod.PUT,
    body,
  }),

  delete: (id: number): TApi<void> => ({
    route: `${RESOURCES.CATEGORIES.PRIVATE_ADMIN}/${id}`,
    method: HttpMethod.DELETE,
  }),
};
