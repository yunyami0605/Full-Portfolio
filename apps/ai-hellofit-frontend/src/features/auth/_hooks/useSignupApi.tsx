import { useMutation } from "@tanstack/react-query";
import { SignupApiBody } from "../_types/body";
import { signupApi } from "../_apis/signupApi";

/**
 *@description signup api hook
 */
export function useSignupApi() {
  return useMutation({
    mutationFn: (body: SignupApiBody) => signupApi(body),
  });
}
