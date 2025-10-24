import { apiCall } from "@/libs/apiCall";
import {
  DuplicateNicknameApiResponse,
  GetAuthInfoResponse,
  LoginApiBody,
  LoginApiResponse,
  PostRefresshTokenApiApiResponse,
  SignupApiBody,
  SignupApiResponse,
  SocialLoginBody,
  SocialSignupBody,
} from "..";

/**
 *@description [API] nickname 중복체크
 */
export const checkNicknameDuplicateApi = (nickname: string) => {
  return apiCall<DuplicateNicknameApiResponse>({
    url: "/auth/check-nickname",
    method: "GET",
    params: { nickname },
  });
};

/**
 *@description [API] 이메일 로그인
 */
export const loginApi = (body: LoginApiBody) => {
  return apiCall<LoginApiResponse>({
    url: "/auth/login",
    method: "POST",
    data: body,
  });
};

/**
 *@description [API] 회원가입
 */
export const signupApi = (body: SignupApiBody) => {
  return apiCall<SignupApiResponse>({
    url: "/auth/signup",
    method: "POST",
    data: body,
  });
};

/**
 *@description [API] 토큰 재발급 by rt
 */
export const postRefreshTokenApi = () => {
  return apiCall<PostRefresshTokenApiApiResponse>({
    url: "/auth/refresh",
    method: "POST",
  });
};

/**
 *@description [API] xsrf token (xsrf token 재발급 요청 api)
 */
export const postXsrfTokenApi = () => {
  return apiCall<boolean>({
    url: "/auth/xc",
    method: "POST",
  });
};

/**
 *@description [API] 소셜 로그인
 */
export const postSocialLogin = (body: SocialLoginBody) => {
  return apiCall<LoginApiResponse>({
    url: "/auth/login/social",
    method: "POST",
    data: body,
  });
};

/**
 *@description [API] 자기 정보 조회
 */
export const getAuthInfo = () => {
  return apiCall<GetAuthInfoResponse>({
    url: "/auth/info/me",
  });
};

/**
 *@description [API] 소셜 회원가입
 */
export const postSocialSignupApi = (body: SocialSignupBody) => {
  return apiCall({
    url: "/auth/social/signup",
    data: body,
    method: "POST",
  });
};
