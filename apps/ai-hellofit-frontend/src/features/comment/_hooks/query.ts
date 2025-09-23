import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import {
  GetCommentsQuery,
  GetCommentsResponse,
  GetRecommentsQuery,
  GetRecommentsResponse,
} from "../_types";
import { serverStateConstants } from "@/shared/constants/serverStateConstants";
import { getCommentsApi, getRecommentsApi } from "../_apis/comment.api";
import { AxiosResponse } from "axios";
/**
 *@description commment 목록 조회 api hook
 */
export const useGetCommentsApi = (postId: string, size: number, enabled?: boolean) => {
  return useInfiniteQuery<
    AxiosResponse<GetCommentsResponse>,
    Error,
    InfiniteData<AxiosResponse<GetCommentsResponse>>,
    [string, string, number],
    GetCommentsQuery
  >({
    queryKey: [serverStateConstants.comment.getComments, postId, size],
    queryFn: ({ pageParam }) => getCommentsApi(pageParam),

    getNextPageParam: (lastPage) => {
      return lastPage.data.nextCursor
        ? {
            cursorId: lastPage.data.nextCursor,
            size,
            postId,
          }
        : null;
    },

    initialPageParam: { cursorId: null, size, postId },
    enabled,
  });
};

/**
 *@description 답글 목록 조회 api hook
 */
export const useGetRecommentsApi = (commentId: string, size: number, enabled: boolean) => {
  return useInfiniteQuery<
    AxiosResponse<GetRecommentsResponse>,
    Error,
    InfiniteData<AxiosResponse<GetRecommentsResponse>>,
    [string, string, number],
    GetRecommentsQuery
  >({
    queryKey: [serverStateConstants.comment.getRecomments, commentId, size],
    queryFn: ({ pageParam }) => getRecommentsApi(pageParam),

    getNextPageParam: (lastPage) => {
      return lastPage.data.nextCursor
        ? {
            cursorId: lastPage.data.nextCursor,
            size,
            commentId,
          }
        : null;
    },

    initialPageParam: { cursorId: null, size, commentId },
    enabled,
  });
};
