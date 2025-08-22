import { useAccessTokenStore } from "@/features/auth/_stores/accessToken.store";
import axios from "axios";

export const apiCall = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // ex) https://api.example.com
  withCredentials: true, // 쿠키를 쓰면 true
});

apiCall.interceptors.request.use(
  (config) => {
    const token = useAccessTokenStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
