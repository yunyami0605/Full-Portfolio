import { apiCall } from "@/libs/apiCall";
import {
  DuplicateNicknameApiResponse,
  LoginApiBody,
  LoginApiResponse,
  PostRefresshTokenApiApiResponse,
  SignupApiBody,
  SignupApiResponse,
} from "..";

/**
 *@description nickname 중복체크
 */
export const checkNicknameDuplicateApi = (nickname: string) => {
  return apiCall<DuplicateNicknameApiResponse>({
    url: "/auth/check-nickname",
    method: "GET",
    params: { nickname },
  });
};

/**
 *@description login api
 */
export const loginApi = (body: LoginApiBody) => {
  return apiCall<LoginApiResponse>({
    url: "/auth/login",
    method: "POST",
    data: body,
  });
};

/**
 *@description signup api
 */
export const signupApi = (body: SignupApiBody) => {
  return apiCall<SignupApiResponse>({
    url: "/auth/signup",
    method: "POST",
    data: body,
  });
};

/**
 *@description refresh token api (rt 토큰 재발급 요청 api)
 */
export const postRefreshTokenApi = () => {
  return apiCall<PostRefresshTokenApiApiResponse>({
    url: "/auth/refresh",
    method: "POST",
  });
};

/**
 *@description xsrf token api (xsrf token 재발급 요청 api)
 */
export const postXsrfTokenApi = () => {
  return apiCall<boolean>({
    url: "/auth/xc",
    method: "POST",
  });
};
