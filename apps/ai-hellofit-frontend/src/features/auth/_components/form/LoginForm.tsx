"use client";

import clsx from "clsx";
import styles from "./LoginForm.module.scss";
import React, { useState } from "react";
import KakaoRoundedButton from "../button/KakaoRoundedButton";
import AppleRoundedButton from "../button/AppleRoundedButton";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Column } from "@my/ui";
import { LabeledInput } from "@/shared/components/input/LabeledInput";
import { ActiveButton, TextButton } from "@/shared/components";
import { LoginFormSchema, loginSchema, useLoginApi } from "../..";
import { useAccessTokenStore } from "../../_stores/accessToken.store";
import { isAxiosError } from "@/libs/typeGuard";
import { ErrorResponse } from "@/shared/types/api";

/**
 *@description 이메일 로그인 폼
 */
function LoginForm() {
  const router = useRouter();
  const { mutateAsync: loginMutate, isPending } = useLoginApi();

  const [serverError, setServerError] = useState<string>();
  const { setToken } = useAccessTokenStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "test4@test.com",
      password: "test1234",
    },
  });

  // 로그인 이벤트
  const onSubmit = async (data: LoginFormSchema) => {
    if (isPending) return;
    setServerError(undefined);

    try {
      const response = await loginMutate(data);
      const { access } = response.data;
      setToken(access);

      router.push("/main");
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "로그인에 실패했습니다. 잠시 후 다시 시도해주세요.";

        setServerError(message);
      }
    }
  };

  const onMoveSignupPagePage = () => router.push("/signup");

  return (
    <section className={clsx(styles.wrapper)}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form_wrapper}>
        <Column className={styles.input_wrapper}>
          <LabeledInput
            id="email"
            placeholder="이메일"
            {...register("email")}
            error={errors.email?.message}
          />

          <LabeledInput
            id="password"
            type="password"
            placeholder="비밀번호"
            {...register("password")}
            error={serverError ?? errors.password?.message}
          />
        </Column>

        <ActiveButton name="로그인" activeType="positive" type="submit" />
      </form>

      <div className={styles.social_button_wrapper}>
        <KakaoRoundedButton
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />

        <div className={styles.divider}></div>

        <AppleRoundedButton
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>

      <div className={styles.helper_button_wrapper}>
        <TextButton name="회원가입" onClick={onMoveSignupPagePage} />
        {/* <TextButton name="이메일 찾기" /> */}
        {/* <TextButton name="비밀번호 찾기" /> */}
      </div>
    </section>
  );
}

export default LoginForm;
