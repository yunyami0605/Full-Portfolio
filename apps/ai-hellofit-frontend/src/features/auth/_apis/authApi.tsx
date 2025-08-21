import { apiCall } from "@/libs/apiCall";
import {
  DuplicateNicknameApiResponse,
  LoginApiBody,
  LoginApiResponse,
  SignupApiBody,
  SignupApiResponse,
} from "..";

/**
 *@description nickname 중복체크
 */
export const checkNicknameDuplicateApi = async (nickname: string) => {
  return apiCall<DuplicateNicknameApiResponse>({
    url: "/auth/check-nickname",
    method: "GET",
    params: { nickname },
  });
};

/**
 *@description login api
 */
export async function loginApi(body: LoginApiBody): Promise<LoginApiResponse> {
  try {
    const { data } = await apiCall.post<LoginApiResponse>("/auth/login", body);
    return data;
  } catch (e: any) {
    const message =
      e?.response?.data?.message ?? e?.message ?? "로그인에 실패했어요. 잠시 후 다시 시도해주세요.";
    throw new Error(message);
  }
}

/**
 *@description signup api
 */
export async function signupApi(body: SignupApiBody): Promise<SignupApiResponse> {
  try {
    const { data } = await apiCall.post<SignupApiResponse>("/auth/signup", body);
    return data;
  } catch (e: any) {
    const message =
      e?.response?.data?.message ??
      e?.message ??
      "회원가입에 실패했어요. 잠시 후 다시 시도해주세요.";
    throw new Error(message);
  }
}
