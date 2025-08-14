"use client";

import styles from "./SignupForm.module.scss";
import React, { useCallback } from "react";
import { LabeledInput } from "@/shared/input/LabeledInput";
import { Button, Checkbox, Row, Text } from "@my/ui";
import ActiveButton from "@/shared/button/ActiveButton";
import { useRouter, useSearchParams } from "next/navigation";
import useSignupApi from "../../_hooks/useSignupApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 *@description 회원가입 폼
 */
function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const agree = searchParams.get("agreePrivacy") === "true";
  const signupApi = useSignupApi();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupScheme),
    mode: "onSubmit",
  });

  const onMovePrivacyPage = useCallback(() => {
    router.push("privacy");
  }, []);

  const onSignup = () => {
    signupApi.mutateAsync({});
  };

  return (
    <section className={styles.signup_wrapper}>
      <section className={styles.form_wrapper}>
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
          <Button onClick={onMovePrivacyPage} className={styles.button}>
            <Checkbox checked={agree} className={styles.checkbox} />

            <Text>개인정보 처리방침 동의</Text>
          </Button>
        </Row>
      </section>

      <ActiveButton name={"완료"} activeType="disabled" type={"button"} />
    </section>
  );
}

export default SignupForm;
