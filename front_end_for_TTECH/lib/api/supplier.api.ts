// src/lib/api/supplier.api.ts
import type { TApi } from "@/types/base.types";
import { HttpMethod } from "@/types/base.types";
import type { TSupplierInList, TSupplierToWrite } from "@/types/supplier.types";
import { RESOURCES } from "../constants/resources";

export const supplierApi = {
  // PUBLIC SUPPLIER CONTROLLER //

  list: (): TApi<TSupplierInList[]> => ({
    route: `${RESOURCES.SUPPLIERS.PUBLIC}/list`,
    method: HttpMethod.GET,
  }),
};

export const adminSupplierApi = {
  // PRIVATE ADMIN SUPPLIER CONTROLLER //

  list: (): TApi<TSupplierInList[]> => ({
    route: `${RESOURCES.SUPPLIERS.PRIVATE_ADMIN}/list`,
    method: HttpMethod.GET,
  }),

  create: (body: TSupplierToWrite): TApi<TSupplierInList> => ({
    route: `${RESOURCES.SUPPLIERS.PRIVATE_ADMIN}`,
    method: HttpMethod.POST,
    body,
  }),

  update: (id: number, body: TSupplierToWrite): TApi<TSupplierInList> => ({
    route: `${RESOURCES.SUPPLIERS.PRIVATE_ADMIN}/${id}`,
    method: HttpMethod.PUT,
    body,
  }),

  delete: (id: number): TApi<void> => ({
    route: `${RESOURCES.SUPPLIERS.PRIVATE_ADMIN}/${id}`,
    method: HttpMethod.DELETE,
  }),
};
