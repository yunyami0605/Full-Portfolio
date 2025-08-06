"use client";

import clsx from "clsx";
import styles from "./LoginForm.module.scss";
import React from "react";
import { LabeledInput } from "@/shared/input/LabeledInput";
import ActiveButton from "@/shared/button/ActiveButton";
import KakaoRoundedButton from "../button/KakaoRoundedButton";
import AppleRoundedButton from "../button/AppleRoundedButton";
import TextButton from "@/shared/button/TextButton";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "@/app/schemas/loginSchema";
import { Column } from "@my/ui";
import useLoginApi from "../../_hooks/useLoginAPi";

/**
 *@description 이메일 로그인 폼
 */
function LoginForm() {
  const router = useRouter();
  const { mutate: loginMutate } = useLoginApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("로그인 정보:", data);
    // 로그인 처리 로직 여기에 작성

    loginMutate(data);
  };

  const onMoveSignupPagePage = () => router.push("signup");

  console.log(handleSubmit);

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
            error={errors.password?.message}
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
        <TextButton name="이메일 찾기" />
        <TextButton name="비밀번호 찾기" />
      </div>
    </section>
  );
}

export default LoginForm;
