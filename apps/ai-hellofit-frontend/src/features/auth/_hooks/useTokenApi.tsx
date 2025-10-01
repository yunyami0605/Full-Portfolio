import { useMutation } from "@tanstack/react-query";
import { postRefreshTokenApi, postXsrfTokenApi } from "../_apis/auth.api";

/**
 *@description post refresh token hook
 */
export const usePostRefreshTokenApi = () => {
  return useMutation({
    mutationFn: () => postRefreshTokenApi(),
  });
};

/**
 *@description post xsrf token hook
 */
export const usePostXsrfTokenApi = () => {
  return useMutation({
    mutationFn: () => postXsrfTokenApi(),
  });
};
