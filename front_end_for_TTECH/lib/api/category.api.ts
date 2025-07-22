import { TApi, HttpMethod } from "@/types/base.types";
import { RESOURCES } from "../constants/resources";
import { TCategory } from "@/types/category.types";

export const categoryApi = {
  // PUBLIC //

  // READ //
  getList: (): TApi<TCategory[]> => ({
    route: `${RESOURCES.CATEGORIES.PUBLIC}/list`,
    method: HttpMethod.GET,
  }),
}