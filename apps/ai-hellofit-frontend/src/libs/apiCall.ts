import axios from "axios";

export const apiCall = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // ex) https://api.example.com
  withCredentials: true, // 쿠키를 쓰면 true
});
