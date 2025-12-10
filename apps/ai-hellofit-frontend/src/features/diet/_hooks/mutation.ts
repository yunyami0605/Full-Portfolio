import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postDietsLogsMeApi, postDietsRecommendationsGenerateDailyApi } from "../_apis/diet.api";
import { PostDietsLogsMeBody } from "../types/body";
import { serverStateConstants } from "@/shared/constants/serverStateConstants";

/**
 *@description 유저 자신 식단 로그 생성 훅
 */
export function usePostDietsLogsMe() {
  return useMutation({
    mutationFn: (body: PostDietsLogsMeBody) => postDietsLogsMeApi(body),
  });
}

/**
 *@description 오늘~2일치 추천 즉시 생성 훅 (회원가입/프로필 저장 직후)
 */
export function useGenerateDailyRecommendations() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => postDietsRecommendationsGenerateDailyApi(),
    onSuccess: () => {
      // 추천/로그 관련 캐시 무효화
      qc.invalidateQueries({ queryKey: [serverStateConstants.diet.recommendations] });
      qc.invalidateQueries({ queryKey: [serverStateConstants.diet.logs.getDietsLogs] });
    },
  });
}
