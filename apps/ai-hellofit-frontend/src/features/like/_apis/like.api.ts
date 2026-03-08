import { apiCall } from "@/libs/apiCall";
import type { LikeTargetType } from "../_types/base";

/**
 *@description 좋아요 On/Off 토글 API
 */
export const postLikeToggleApi = (targetType: LikeTargetType, targetId: string) => {
  return apiCall<boolean>({
    url: `/likes/toggle/${targetType}/${targetId}`,
    method: "POST",
  });
};

/**
 *@description 좋아요 개수 조회 API
 */
export const getLikeCountApi = (targetType: LikeTargetType, targetId: string) => {
  return apiCall<number>({
    url: `/likes/${targetType}/${targetId}/count`,
    method: "GET",
  });
};
