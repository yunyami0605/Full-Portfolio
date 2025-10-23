import { useMutation } from "@tanstack/react-query";
import { postDietsLogsMeApi } from "../_apis/diet.api";
import { PostDietsLogsMeBody } from "../types/body";

/**
 *@description 유저 자신 식단 로그 생성 훅
 */
export function usePostDietsLogsMe() {
  return useMutation({
    mutationFn: (body: PostDietsLogsMeBody) => postDietsLogsMeApi(body),
  });
}
