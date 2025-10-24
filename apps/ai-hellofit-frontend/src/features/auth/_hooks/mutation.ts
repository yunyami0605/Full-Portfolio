import { useMutation } from "@tanstack/react-query";
import { postSocialLogin, postSocialSignupApi, signupApi } from "../_apis/auth.api";
import { SignupApiBody, SocialLoginBody, SocialSignupBody } from "../_types";

/**
 *@description 소셜 로그인 요청 훅
 */
export const usePostSocialLogin = () => {
  return useMutation({
    mutationFn: (body: SocialLoginBody) => postSocialLogin(body),
  });
};

/**
 *@description signup api hook
 */
export function useSignupApi() {
  return useMutation({
    mutationFn: (body: SignupApiBody) => signupApi(body),
  });
}

/**
 *@description post social signup hook
 */
export function usePostSocialSignupApi() {
  return useMutation({
    mutationFn: (body: SocialSignupBody) => postSocialSignupApi(body),
  });
}
