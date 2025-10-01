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
import { CursorQuery } from "@/shared/types/api";

/**
 *@description [API] 댓글 목록 조회
 */
export const getCommentsApi = (params: GetCommentsQuery) => {
  return apiCall<GetCommentsResponse>({
    url: `/post/${params.postId}/comments`,
    method: "GET",
    params,
  });
};

/**
 *@description [API] 답글 목록 조회
 */
export const getRecommentsApi = (params: GetRecommentsQuery) => {
  return apiCall<GetRecommentsResponse>({
    url: `/comments/${params.commentId}/recomments`,
    method: "GET",
    params,
  });
};

/**
 *@description [API] 댓글/답글 등록
 */
export const postCommentsApi = (body: PostCommentBody, postId?: string) => {
  return apiCall<CommentMutationResponse>({
    url: `/posts/${postId}/comments`,
    method: "POST",
    data: body,
  });
};

/**
 *@description [API] 댓글/답글 수정
 */
export const patchCommentsApi = (body: PatchCommentsBody, commentId?: string | null) => {
  return apiCall<CommentMutationResponse>({
    url: `/comments/${commentId}`,
    method: "PATCH",
    data: body,
  });
};

/**
 *@description [API] 댓글/답글 삭제
 */
export const deleteCommentsApi = (commentId?: string | null) => {
  return apiCall<CommentMutationResponse>({
    url: `/comments/${commentId}`,
    method: "DELETE",
  });
};
/**
 *@description [API] 내 댓글 목록 조회
 */
export const getCommentsMeApi = (params: CursorQuery) => {
  return apiCall<GetCommentsResponse>({
    url: `/comments/me`,
    method: "GET",
    params,
  });
};
