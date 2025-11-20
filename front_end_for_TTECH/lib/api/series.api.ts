// src/lib/api/series.api.ts
import type { TApi } from "@/types/base.types";
import { HttpMethod } from "@/types/base.types";
import type { TSeriesInList, TSeriesToWrite } from "@/types/series.types";
import { RESOURCES } from "../constants/resources";

export const seriesApi = {
  // PUBLIC SUPPLIER CONTROLLER //

  list: (): TApi<TSeriesInList[]> => ({
    route: `${RESOURCES.SERIES.PUBLIC}/list`,
    method: HttpMethod.GET,
  }),
};

export const adminSeriesApi = {
  // PRIVATE ADMIN SUPPLIER CONTROLLER //

  list: (): TApi<TSeriesInList[]> => ({
    route: `${RESOURCES.SERIES.PRIVATE_ADMIN}/list`,
    method: HttpMethod.GET,
  }),

  create: (body: TSeriesToWrite): TApi<TSeriesInList> => ({
    route: `${RESOURCES.SERIES.PRIVATE_ADMIN}`,
    method: HttpMethod.POST,
    body,
  }),

  update: (id: number, body: TSeriesToWrite): TApi<TSeriesInList> => ({
    route: `${RESOURCES.SERIES.PRIVATE_ADMIN}/${id}`,
    method: HttpMethod.PUT,
    body,
  }),

  delete: (id: number): TApi<void> => ({
    route: `${RESOURCES.SERIES.PRIVATE_ADMIN}/${id}`,
    method: HttpMethod.DELETE,
  }),
};
