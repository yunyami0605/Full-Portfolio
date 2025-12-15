"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePostSocialLogin } from "@/features/auth/_hooks/mutation";

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
      if (res.data.status === "SIGNUP_REQUIRED") {
        router.replace(`/signup?provider=${res.data.provider}&socialId=${res.data.socialId}`);
      } else {
        router.replace("/main");
      }
    } catch (error) {
      router.replace("/login");
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
