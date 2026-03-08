import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLikeToggleApi } from "../_apis/like.api";
import type { LikeTargetType } from "../_types/base";
import { serverStateConstants } from "@/shared/constants/serverStateConstants";

export type ToggleLikeParams = {
  targetType: LikeTargetType;
  targetId: string;
  /** 댓글 좋아요 시 해당 게시글 ID (캐시 무효화용) */
  postId?: string;
  /** 답글 좋아요 시 부모 댓글 ID (캐시 무효화용) */
  parentId?: string | null;
};

/**
 *@description 좋아요 토글 훅 (게시글/댓글). 성공 시 관련 쿼리 자동 무효화.
 */
export function usePostLikeToggleApi() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: ToggleLikeParams) => {
      const res = await postLikeToggleApi(params.targetType, params.targetId);
      return res.data;
    },
    onSuccess: (_data, params) => {
      if (params.targetType === "POST") {
        // 게시글 좋아요 일경우 무효화
        queryClient.invalidateQueries({ queryKey: [serverStateConstants.post.getPosts] });
        queryClient.invalidateQueries({
          queryKey: [serverStateConstants.post.getPostOne, params.targetId],
        });
        queryClient.invalidateQueries({ queryKey: [serverStateConstants.post.getPostsMe] });
      } else {
        if (params.postId) {
          // 댓글 좋아요 일경우 무효화
          queryClient.invalidateQueries({
            queryKey: [serverStateConstants.comment.getComments, params.postId],
          });
        }
        if (params.parentId) {
          // 답글 좋아요 일경우 무효화
          queryClient.invalidateQueries({
            queryKey: [serverStateConstants.comment.getRecomments, params.parentId],
          });
        }
      }
    },
  });
}
