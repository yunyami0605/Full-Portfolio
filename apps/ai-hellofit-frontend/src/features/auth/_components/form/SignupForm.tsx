"use client";

import styles from "./SignupForm.module.scss";
import React, { useCallback, useState } from "react";
import { Button, Checkbox, Row, Text } from "@my/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LabeledInput } from "@/shared/components/input/LabeledInput";
import { ActiveButton } from "@/shared/components";
import { signupSchema, useSignupApi } from "../..";
import { authTokenACookies } from "@/libs/cookie";

/**
 *@description 회원가입 폼
 */
function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const agree = searchParams.get("agreePrivacy") === "true";
  const signupApi = useSignupApi();
  const [serverError, setServerError] = useState<string | null>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
  });

  const onMovePrivacyPage = useCallback(() => {
    router.push("privacy");
  }, []);

  const onSubmit = async () => {
    if (signupApi.isPending) return;
    setServerError(null);

    try {
      const { accessToken, refreshToken } = await signupApi.mutateAsync({
        email: "",
        password: "",
        nickname: "",
        isPrivacyAgree: false,
      });

      authTokenACookies.setTokens(accessToken, refreshToken);

      onSignupSuccess();
    } catch (error: any) {
      console.log(error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.";

      setServerError(message);
    }
  };

  const onSignupSuccess = () => {
    router.push("/user/register");
  };

  return (
    <section className={styles.signup_wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form_wrapper}>
        <LabeledInput
          id={"email"}
          label={"이메일"}
          placeholder="이메일"
          classNameWrapper={styles.input_margin}
          required
        />

        <LabeledInput
          id={"password"}
          label={"비밀번호"}
          placeholder="비밀번호"
          classNameWrapper={styles.input_margin}
          required
        />

        <LabeledInput
          id={"password_check"}
          label={"비밀번호 확인"}
          placeholder="비밀번호 확인"
          classNameWrapper={styles.input_margin}
          required
        />

        <LabeledInput
          id={"nickname"}
          label={"닉네임"}
          placeholder="닉네임"
          className={styles.nickname_input}
          required
        />

        <Row className={styles.privacy_agree_wrapper}>
          <Button onClick={onMovePrivacyPage} className={styles.button} type="submit">
            <Checkbox checked={agree} className={styles.checkbox} />

            <Text>개인정보 처리방침 동의</Text>
          </Button>
        </Row>
      </form>

      <ActiveButton name={"완료"} activeType="disabled" type={"button"} />
    </section>
  );
}

export default SignupForm;
