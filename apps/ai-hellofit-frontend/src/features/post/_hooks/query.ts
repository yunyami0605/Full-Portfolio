import { InfiniteData, useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  createPostApi,
  deletePostApi,
  getPostFormDataApi,
  getPostOneApi,
  getPostsApi,
  patchPostApi,
} from "..";
import { serverStateConstants } from "@/shared/constants/serverStateConstants";
import { CreatePostBody } from "../_types/body";
import { Cursor, CursorQuery } from "@/shared/types/api";
import { GetPostsResponse } from "../_types/response";

/**
 *@description posts api hoook (게시글 목록 조회 훅)
 */
export const useGetPostsApi = (size: number) => {
  return useInfiniteQuery<
    Cursor<GetPostsResponse>,
    Error,
    InfiniteData<Cursor<GetPostsResponse>>,
    [string, number],
    CursorQuery
  >({
    queryKey: [serverStateConstants.post.getPosts, size],
    queryFn: ({ pageParam }) => getPostsApi(pageParam),

    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor
        ? {
            cursorId: lastPage.nextCursor,
            size,
          }
        : null;
    },

    initialPageParam: { cursorId: null, size },
  });
};

/**
 *@description 게시글 조회 훅
 */
export const useGetPostOneApi = (id: string) => {
  return useQuery({
    queryKey: [serverStateConstants.post.getPostOne, id],
    queryFn: () => getPostOneApi(id),
  });
};

/**
 *@description 게시글 등록 훅
 */
export const useCreatePostApi = () => {
  return useMutation({
    mutationFn: (body: CreatePostBody) => createPostApi(body),
  });
};

/**
 *@description 게시글 수정 훅
 */
export const usePatchPostApi = (id: string) => {
  return useMutation({
    mutationFn: (body: Partial<CreatePostBody>) => patchPostApi(id, body),
  });
};

/**
 *@description 게시글 삭제 훅
 */
export const useDeletePostApi = (id: string) => {
  return useMutation({
    mutationFn: () => deletePostApi(id),
  });
};

/**
 *@description 게시글 수정에 필요한 폼데이터 훅
 */
export const useGetPostFormDataApi = (id: string) => {
  return useQuery({
    queryKey: [serverStateConstants.post.getPostFormData, id],
    queryFn: () => getPostFormDataApi(id),
  });
};
