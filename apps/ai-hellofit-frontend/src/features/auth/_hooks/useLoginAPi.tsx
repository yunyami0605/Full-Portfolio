import { useMutation } from "@tanstack/react-query";
import { LoginApiBody } from "../_types/body";
import { loginApi } from "../_apis/loginApi";

/**
 *@description login api hook
 */
export function useLoginApi() {
  return useMutation({
    mutationFn: (body: LoginApiBody) => loginApi(body),
  });
}
