import { apiCall } from "@/libs/apiCall";
import {
  CommentMutationResponse,
  GetCommentsQuery,
  GetCommentsResponse,
  GetRecommentsQuery,
  GetRecommentsResponse,
  PatchCommentsBody,
  PostCommentBody,
} from "../_types";

/**
 *@description 댓글 목록 조회 api
 */
export const getCommentsApi = (params: GetCommentsQuery) => {
  return apiCall<GetCommentsResponse>({
    url: `/post/${params.postId}/comments`,
    method: "GET",
    params,
  });
};

/**
 *@description 답글 목록 조회 api
 */
export const getRecommentsApi = (params: GetRecommentsQuery) => {
  return apiCall<GetRecommentsResponse>({
    url: `/comments/${params.commentId}/recomments`,
    method: "GET",
    params,
  });
};

/**
 *@description 댓글/답글 등록 api
 */
export const postCommentsApi = (body: PostCommentBody, postId?: string) => {
  return apiCall<CommentMutationResponse>({
    url: `/posts/${postId}/comments`,
    method: "POST",
    data: body,
  });
};

/**
 *@description 댓글/답글 수정 api
 */
export const patchCommentsApi = (body: PatchCommentsBody, commentId?: string | null) => {
  return apiCall<CommentMutationResponse>({
    url: `/comments/${commentId}`,
    method: "PATCH",
    data: body,
  });
};

/**
 *@description 댓글/답글 삭제 api
 */
export const deleteCommentsApi = (commentId?: string | null) => {
  return apiCall<CommentMutationResponse>({
    url: `/comments/${commentId}`,
    method: "DELETE",
  });
};
