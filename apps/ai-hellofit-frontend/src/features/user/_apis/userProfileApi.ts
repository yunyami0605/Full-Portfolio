/**
 *@description 유저 프로필 관련 api 모음
 */

import { apiCall } from "@/libs/apiCall";
import { MutationResponse } from "@/shared/types/api";
import { PostUserProfileBody } from "..";

/**
 *@description 유저 프로필 등록 api
 */
export const postUserProfileApi = (body: PostUserProfileBody) => {
  return apiCall<MutationResponse>({
    url: "/users/profile",
    method: "POST",
    data: body,
  });
};
