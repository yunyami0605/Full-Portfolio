import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getFoodsSearch } from "../_apis/food.api";
import { AxiosResponse } from "axios";
import { GetFoodsSearchResponse } from "../_types/response";
import { GetFoodsSearchQuery } from "../_types/query";
import { serverStateConstants } from "@/shared/constants/serverStateConstants";

/**
 *@description commment 목록 조회 api hook
 */
export const useGetFoodsSearch = (size: number, keyword?: string | null) => {
  return useInfiniteQuery<
    AxiosResponse<GetFoodsSearchResponse>,
    Error,
    InfiniteData<AxiosResponse<GetFoodsSearchResponse>>,
    [string, string, number],
    GetFoodsSearchQuery
  >({
    queryKey: [serverStateConstants.foods.getFoodsSearch, keyword ?? "", size],
    queryFn: ({ pageParam }) => getFoodsSearch(pageParam),

    getNextPageParam: (lastPage) => {
      return lastPage.data.nextCursor
        ? {
            cursorId: lastPage.data.nextCursor,
            size,
            keyword,
          }
        : null;
    },

    initialPageParam: { cursorId: null, size, keyword },
  });
};
