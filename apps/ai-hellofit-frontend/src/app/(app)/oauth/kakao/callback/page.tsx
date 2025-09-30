"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { isAxiosError } from "axios";
import { usePostSocialLogin } from "@/features/auth/_hooks/mutation";
import { AxiosErrorResponse } from "@/shared/types/api";

export default function KakaoCallbackPage() {
  const params = useSearchParams();
  const code = params.get("code");
  const router = useRouter();
  const { mutateAsync: mustateSocialLogin } = usePostSocialLogin();

  const onSocialLogin = async () => {
    if (!code) return alert("잘못된 접근입니다.");

    try {
      const res = await mustateSocialLogin({
        provider: "KAKAO",
        code,
      });

      if (res.status === 200) {
        router.replace("/main");
      }
    } catch (error) {
      //

      if (isAxiosError<AxiosErrorResponse>(error)) {
        alert(error.message);
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    const code = params.get("code");
    if (code) {
      onSocialLogin();
    }
  }, [params, router]);

  return <p>로그인 처리중...</p>;
}
