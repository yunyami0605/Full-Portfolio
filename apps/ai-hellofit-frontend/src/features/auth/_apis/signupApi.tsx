import { apiCall } from "@/libs/apiCall";
import { SignupApiBody } from "../_types/body";
import { SignupApiResponse } from "../_types/response";

/**
 *@description signup api
 */
export async function signupApi(body: SignupApiBody): Promise<SignupApiResponse> {
  try {
    const { data } = await apiCall.post<SignupApiResponse>("/auth/signup", body);
    return data;
  } catch (e: any) {
    const message =
      e?.response?.data?.message ?? e?.message ?? "로그인에 실패했어요. 잠시 후 다시 시도해주세요.";
    throw new Error(message);
  }
}
