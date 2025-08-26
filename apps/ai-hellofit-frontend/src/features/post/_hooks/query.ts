import { useMutation, useQuery } from "@tanstack/react-query";
import { createPostApi, deletePostApi, getPostOneApi, getPostsApi, patchPostApi } from "..";
import { serverStateConstants } from "@/shared/constants/serverStateConstants";
import { CreatePostBody } from "../_types/body";

/**
 *@description posts api hoook (게시글 목록 조회 훅)
 */
export const useGetPostsApi = () => {
  return useQuery({
    queryKey: [serverStateConstants.post.getPosts],
    queryFn: () => getPostsApi(),
  });
};

/**
 *@description 게시글 조회 훅
 */
export const useGetPostOneApi = (id: string) => {
  return useQuery({
    queryKey: [serverStateConstants.post.getPostOne],
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
