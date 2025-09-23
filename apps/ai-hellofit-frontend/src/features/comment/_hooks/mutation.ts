import { useMutation } from "@tanstack/react-query";
import type { PatchCommentsBody, PostCommentBody } from "../_types/body";
import { deleteCommentsApi, patchCommentsApi, postCommentsApi } from "../_apis/comment.api";

/**
 *@description 댓글/답글 등록 훅
 */
export function usePostCommentApi(postId?: string) {
  return useMutation({
    mutationFn: (body: PostCommentBody) => postCommentsApi(body, postId),
  });
}

/**
 *@description 댓글/답글 수정 훅
 */
export function usePatchCommentApi(commentId?: string | null) {
  return useMutation({
    mutationFn: (body: PatchCommentsBody) => patchCommentsApi(body, commentId),
  });
}

/**
 *@description 댓글/답글 삭제 훅
 */
export function useDeleteCommentApi(commentId?: string | null) {
  return useMutation({
    mutationFn: () => deleteCommentsApi(commentId),
  });
}
