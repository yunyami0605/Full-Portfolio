import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postDietsLogsMeApi, postDietsRecommendationsGenerateDailyApi } from "../_apis/diet.api";
import { PostDietsLogsMeBody } from "../types/body";
import { serverStateConstants } from "@/shared/constants/serverStateConstants";
import dayjs from "dayjs";

/**
 *@description 유저 자신 식단 로그 생성 훅
 */
export function usePostDietsLogsMe() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: PostDietsLogsMeBody) => postDietsLogsMeApi(body),
    onSuccess: (_res, body) => {
      const logDate = dayjs(body.logDate);
      const dateKey = logDate.format("YYYY-MM-DD");
      const monthKey = logDate.format("YYYY-MM");

      // 1) 범위 로그 쿼리 중, logDate를 포함하는 것만 무효화
      qc.invalidateQueries({
        predicate: (q) => {
          const [key, query] = q.queryKey as any[];
          if (key !== serverStateConstants.diet.logs.getDietsLogs) return false;
          const s = dayjs(query?.startDate);
          const e = dayjs(query?.endDate);
          if (!s.isValid() || !e.isValid()) return false;
          const dVal = logDate.valueOf();
          const sVal = s.startOf("day").valueOf();
          const eVal = e.endOf("day").valueOf();
          return dVal >= sVal && dVal <= eVal;
        },
      });

      // 2) 월별 집계 무효화
      qc.invalidateQueries({
        predicate: (q) => {
          const [key, query] = q.queryKey as any[];
          if (key !== serverStateConstants.diet.logs.getDietsMacrosDaily) return false;
          return query?.month === monthKey;
        },
      });

      // 3) 해당 날짜 추천 무효화
      qc.invalidateQueries({
        queryKey: [serverStateConstants.diet.recommendations, dateKey],
      });
    },
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
