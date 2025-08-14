"use client";

import styles from "./SignupForm.module.scss";
import { useCallback, useEffect, useState } from "react";
import { Button, Checkbox, Row, Text } from "@my/ui";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LabeledInput } from "@/shared/components/input/LabeledInput";
import { ActiveButton } from "@/shared/components";
import { signupSchema, useAuthSignupStore, useSignupApi } from "../..";
import { authTokenACookies } from "@/libs/cookie";
import _ from "lodash";

/**
 *@description 회원가입 폼
 *@TODO 중복 닉네임 확인
 */
function SignupForm() {
  const router = useRouter();
  const signupApi = useSignupApi();
  const { form, setForm } = useAuthSignupStore();

  const [serverError, setServerError] = useState<string | null>();
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
    defaultValues: form,
  });

  useEffect(() => {
    const subscription = watch((value) => {
      setForm(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, setForm]);

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

  const [passwordConfirmRegister, passwordRegister] = [
    register("passwordConfirm"),
    register("password"),
  ];

  const submitButtonActive = Object.values(form).every((item) => {
    return item && item !== "";
  });

  return (
    <section className={styles.signup_wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form_wrapper}>
        <LabeledInput
          id={"email"}
          label={"이메일"}
          placeholder="이메일"
          classNameWrapper={styles.input_margin}
          {...register("email")}
          required
          error={serverError ?? errors.email?.message}
        />

        <LabeledInput
          type="password"
          id={"password"}
          label={"비밀번호"}
          placeholder="비밀번호"
          classNameWrapper={styles.input_margin}
          required
          {...register("password")}
          onChange={(e) => {
            passwordRegister.onChange(e);
            trigger("password");
          }}
          error={serverError ?? errors.password?.message}
        />

        <LabeledInput
          type="password"
          id={"password_check"}
          label={"비밀번호 확인"}
          placeholder="비밀번호 확인"
          classNameWrapper={styles.input_margin}
          required
          {...register("passwordConfirm")}
          onChange={(e) => {
            passwordConfirmRegister.onChange(e);
            trigger("passwordConfirm");
          }}
          error={serverError ?? errors.passwordConfirm?.message}
        />

        <LabeledInput
          id={"nickname"}
          label={"닉네임"}
          placeholder="닉네임"
          className={styles.nickname_input}
          {...register("nickname")}
          required
          error={serverError ?? errors.nickname?.message}
        />

        <Row className={styles.privacy_agree_wrapper}>
          <Button onClick={onMovePrivacyPage} className={styles.button}>
            <Checkbox checked={form.isPrivacyAgree} className={styles.checkbox} />

            <Text>개인정보 처리방침 동의</Text>
          </Button>
        </Row>
      </form>

      <ActiveButton
        name={signupApi.isPending ? "가입 중" : "완료"}
        activeType={submitButtonActive ? "positive" : "disabled"}
        type={"submit"}
      />
    </section>
  );
}

export default SignupForm;
