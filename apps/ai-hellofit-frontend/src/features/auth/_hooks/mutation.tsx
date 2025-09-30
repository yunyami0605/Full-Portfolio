import { useMutation } from "@tanstack/react-query";
import { postSocialLogin } from "../_apis/authApi";
import { SocialLoginQuery } from "../_types/query";

/**
 *@description 소셜 로그인 요청 훅
 */
export const usePostSocialLogin = () => {
  return useMutation({
    mutationFn: (query: SocialLoginQuery) => postSocialLogin(query),
  });
};
