/**
 *@description 유저 프로필 관련 훅 모음
 */

import { useMutation } from "@tanstack/react-query";
import { PostUserProfileBody } from "../_types";
import { postUserProfileApi } from "..";

/**
 *@description 유저 프로필 등록 훅
 */
export const usePostUserProfileApi = () => {
  return useMutation({
    mutationFn: (body: PostUserProfileBody) => postUserProfileApi(body),
  });
};
