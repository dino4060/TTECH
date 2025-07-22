import { HttpMethod, TApi } from "@/types/base.types";
import { TCategoryInList } from "@/types/category.types";
import { RESOURCES } from "../constants/resources";

export const categoryApi = {
  // PUBLIC //

  // READ //
  getList: (): TApi<TCategoryInList[]> => ({
    route: `${RESOURCES.CATEGORIES.PUBLIC}/list`,
    method: HttpMethod.GET,
  }),
}