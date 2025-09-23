import { CursorQuery } from "@/shared/types/api";

/**
 *@description 댓글 목록 요청 쿼리
 */
export type GetCommentsQuery = CursorQuery & {
  postId: string;
};

/**
 *@description 답글 목록 요청 쿼리
 */
export type GetRecommentsQuery = CursorQuery & {
  commentId: string;
};
