/**
 * @description 유저 프로필 관련 api 모음
 */
import { apiCall } from "@/libs/apiCall";
import { MutationResponse } from "@/shared/types/api";
import { PostUserProfileBody } from "..";
import type { UserProfileDetail, NicknameDuplicateResponse } from "../_types";

/**
 * @description 유저 프로필 등록
 */
export const postUserProfileApi = (body: PostUserProfileBody) => {
  return apiCall<MutationResponse>({
    url: "/users/profile",
    method: "POST",
    data: body,
  });
};

/**
 * @description 내 유저 프로필 조회
 */
export const getUserProfileApi = () => {
  return apiCall.get<UserProfileDetail>("/users/profile");
};

/**
 * @description 내 유저 프로필 수정(일부 필드만 변경 가능)
 */
export const patchUserProfileApi = (body: Partial<PostUserProfileBody>) => {
  return apiCall.patch<MutationResponse>("/users/profile", body);
};

/**
 * @description 닉네임 중복 검사
 */
export const checkNicknameApi = (nickname: string) => {
  return apiCall.get<NicknameDuplicateResponse>("/auth/check-nickname", {
    params: { nickname },
  });
};

/**
 * @description 유저 닉네임/프로필 이미지 등 계정 필드 수정
 * 서버: PATCH /users/{id} (UpdateUserRequestDto: { nickname?, profileImageKey? })
 */
export const patchUserAccountApi = (params: {
  userId: string;
  nickname?: string;
  profileImageKey?: string;
}) => {
  const { userId, ...data } = params;
  return apiCall.patch<MutationResponse>(`/users/${userId}`, data);
};
