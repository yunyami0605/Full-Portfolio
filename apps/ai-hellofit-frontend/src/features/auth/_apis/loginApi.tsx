import { apiCall } from "@/libs/apiCall";
import { LoginApiBody } from "../_types/body";
import { LoginApiResponse } from "../_types/response";

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
