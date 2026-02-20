import { apiCall } from "@/libs/apiCall";
import { GetFoodsSearchQuery } from "../_types/query";
import { GetFoodsSearchResponse } from "../_types/response";

/**
 *@description 음식 검색 api (cursor 방식, 검색 키워드 파라미터는 음식명)
 */
export const getFoodsSearch = (query: GetFoodsSearchQuery) => {
  return apiCall<GetFoodsSearchResponse>({
    url: `/admin/foods/search`,
    method: "GET",
    params: query,
  });
};
