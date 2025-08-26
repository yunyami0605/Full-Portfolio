import { apiCall } from "@/libs/apiCall";
import { PostResponse, PostsResponse } from "../_types/response";
import { CreatePostBody } from "../_types/body";
import { MutationResponse } from "@/shared/types/api";

/**
 *@description posts api (게시글 목록 조회)
 */
export const getPostsApi = () => {
  return apiCall<PostsResponse>({
    url: "/posts",
    method: "GET",
  });
};

/**
 *@description post api (게시글 조회)
 */
export const getPostOneApi = (id: string) => {
  return apiCall<PostResponse>({
    url: `/posts/${id}`,
    method: "GET",
  });
};

/**
 *@description 게시글 등록 api
 */
export const createPostApi = (data: CreatePostBody) => {
  return apiCall<MutationResponse>({
    url: "/posts",
    method: "POST",
    data,
  });
};

/**
 *@description 게시글 부분 수정 api
 */
export const patchPostApi = (id: string, data: Partial<CreatePostBody>) => {
  return apiCall<MutationResponse>({
    url: `/posts/${id}`,
    method: "PATCH",
    data,
  });
};

/**
 *@description 게시글 삭제 api
 */
export const deletePostApi = (id: string) => {
  return apiCall<MutationResponse>({
    url: `/posts/${id}`,
    method: "DELETE",
  });
};
