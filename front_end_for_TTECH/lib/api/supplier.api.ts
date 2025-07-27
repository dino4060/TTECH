// src/lib/api/supplier.api.ts
import type { TApi } from "@/types/base.types";
import { HttpMethod } from "@/types/base.types";
import type { TCategoryInList, TCategoryToWrite } from "@/types/supplier.types";
import { RESOURCES } from "../constants/resources";

export const supplierApi = {
  // PUBLIC SUPPLIER CONTROLLER //

  list: (): TApi<TCategoryInList[]> => ({
    route: `${RESOURCES.SUPPLIERS.PUBLIC}/list`,
    method: HttpMethod.GET,
  }),
};

export const adminSupplierApi = {
  // PRIVATE ADMIN SUPPLIER CONTROLLER //

  list: (): TApi<TCategoryInList[]> => ({
    route: `${RESOURCES.SUPPLIERS.PRIVATE_ADMIN}/list`,
    method: HttpMethod.GET,
  }),

  create: (body: TCategoryToWrite): TApi<TCategoryInList> => ({
    route: `${RESOURCES.SUPPLIERS.PRIVATE_ADMIN}`,
    method: HttpMethod.POST,
    body,
  }),

  update: (id: number, body: TCategoryToWrite): TApi<TCategoryInList> => ({
    route: `${RESOURCES.SUPPLIERS.PRIVATE_ADMIN}/${id}`,
    method: HttpMethod.PUT,
    body,
  }),

  delete: (id: number): TApi<void> => ({
    route: `${RESOURCES.SUPPLIERS.PRIVATE_ADMIN}/${id}`,
    method: HttpMethod.DELETE,
  }),
};
