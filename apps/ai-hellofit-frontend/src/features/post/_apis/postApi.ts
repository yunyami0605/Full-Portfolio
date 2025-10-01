import { apiCall } from "@/libs/apiCall";
import { GetPostFormDataResponse, GetPostResponse, GetPostsResponse } from "../_types/response";
import { CreatePostBody } from "../_types/body";
import { Cursor, CursorQuery, MutationResponse } from "@/shared/types/api";

/**
 *@description posts api (게시글 목록 조회)
 */
export const getPostsApi = async (params: CursorQuery) => {
  const res = await apiCall<Cursor<GetPostsResponse>>({
    url: "/posts",
    method: "GET",
    params,
  });

  return res.data;
};

/**
 *@description post api (게시글 조회)
 */
export const getPostOneApi = (id: string) => {
  return apiCall<GetPostResponse>({
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
 *@description 게시글 수정 api
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

/**
 *@description 게시글 수정시, 폼데이터 조회 api
 */
export const getPostFormDataApi = (id: string) => {
  return apiCall<GetPostFormDataResponse>({
    url: `/posts/patch/${id}`,
    method: "GET",
  });
};

/**
 *@description [API] 내 게시글 목록 조회
 */
export const getPostsMeApi = async (params: CursorQuery) => {
  const res = await apiCall<Cursor<GetPostsResponse>>({
    url: "/posts/me",
    method: "GET",
    params,
  });

  return res.data;
};
