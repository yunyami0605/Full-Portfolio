import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  patchUserProfileApi,
  patchUserAccountApi,
  checkNicknameApi,
  getUserProfileApi,
} from "../_apis/userProfileApi";
import type { PostUserProfileBody } from "../_types";

/**
 * 내 프로필 수정(키/몸무게/연령대/성별 등)
 */
export function usePatchUserProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<PostUserProfileBody>) => patchUserProfileApi(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["userProfile", "me"] });
    },
  });
}

/**
 * 내 계정 닉네임/프로필 이미지 수정 (users/{id})
 */
export function usePatchUserAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (params: { userId: string; nickname?: string; profileImageKey?: string }) =>
      patchUserAccountApi(params),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

/**
 * 닉네임 중복 검사 (디바운스 내장)
 */
export function useCheckNickname(nickname: string, enabled = true, delay = 500) {
  const [debounced, setDebounced] = React.useState(nickname);
  React.useEffect(() => {
    const id = setTimeout(() => setDebounced(nickname), delay);
    return () => clearTimeout(id);
  }, [nickname, delay]);

  return useQuery({
    queryKey: ["check-nickname", debounced],
    queryFn: async () => {
      const { data } = await checkNicknameApi(debounced);
      return data.isDuplicate;
    },
    enabled: enabled && Boolean(debounced && debounced.trim().length >= 2),
    staleTime: 30_000,
  });
}

/**
 * 내 프로필 조회 쿼리 (선택적 사용)
 */
export function useUserProfileQuery() {
  return useQuery({
    queryKey: ["userProfile", "me"],
    queryFn: () => getUserProfileApi().then((r) => r.data),
    staleTime: 60_000,
  });
}
