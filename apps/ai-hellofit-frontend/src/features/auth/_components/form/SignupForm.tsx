"use client";

import styles from "./SignupForm.module.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Checkbox, Row, Text } from "@my/ui";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LabeledInput } from "@/shared/components/input/LabeledInput";
import { ActiveButton } from "@/shared/components";
import {
  authConstant,
  signupSchema,
  useAuthSignupStore,
  useCheckNicknameDuplicateApi,
  useSignupApi,
} from "../..";
import { debounce } from "lodash";
import { useAccessTokenStore } from "../../_stores/accessToken.store";
import { isAxiosError } from "@/libs/typeGuard";
import { ErrorResponse } from "@/shared/types/api";

/**
 *@description 회원가입 폼
 *@TODO 중복 닉네임 확인
 */
function SignupForm() {
  const router = useRouter();
  const { form, setForm } = useAuthSignupStore();
  const { setToken } = useAccessTokenStore();

  // 회원가입 체크 api 호출
  const signupApi = useSignupApi();

  // 중복 닉네임 체크 api 호출
  const checkNicknameDuplicateApi = useCheckNicknameDuplicateApi(form.nickname);

  type FormServerError = {
    email: string | null;
    nickname: string | null;
    common: string | null;
  };

  const initServerError = {
    email: null,
    nickname: null,
    common: null,
  };

  const [serverError, setServerError] = useState<FormServerError>(initServerError);
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
    defaultValues: form,
  });

  // input props (ex. onchange)
  const [passwordConfirmRegister, passwordRegister, nicknameRegister] = [
    register("passwordConfirm"),
    register("password"),
    register("nickname"),
  ];

  // 개인 정보 처리 방침 페이지 이동
  const onMovePrivacyPage = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.preventDefault();
      router.push("privacy");
    },
    [router],
  );

  // 회원가입 이벤트
  const onSubmit = async () => {
    if (signupApi.isPending) return;
    setServerError(initServerError);

    try {
      const response = await signupApi.mutateAsync({
        ...form,
      });

      if (response.status === 201) {
        setToken(response.data.access);

        router.push("/user/register");
      }
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.";

        switch (message) {
          case "이미 가입된 이메일입니다.":
            setServerError((prev) => ({ ...prev, email: message }));
            break;

          case "이미 사용중인 닉네임입니다.":
            setServerError((prev) => ({ ...prev, nickname: message }));
            break;

          default:
            setServerError((prev) => ({ ...prev, common: "잘못된 접근입니다." }));
            break;
        }
      }
    }
  };

  // 닉네임 중복 확인
  const debouncedCheckNickname = useMemo(
    () =>
      debounce(async (nickname: string) => {
        if (!nickname) return;

        try {
          const { data } = await checkNicknameDuplicateApi.refetch();

          if (data?.data.isDuplicate) {
            // 중복된 닉네임일 경우
            setServerError((prev) => ({
              ...prev,
              nickname: authConstant.error.signup.duplicateNickname,
            }));
          } else {
            // 중복이 아닐 경우
            setServerError((prev) => ({ ...prev, nickname: null }));
          }
        } catch {
          setServerError((prev) => ({ ...prev, common: null }));
        }
      }, 500),
    [checkNicknameDuplicateApi],
  );

  // 기본적으로 작성 완료 되었는지
  const submitButtonActive =
    Object.values(form).every((item) => {
      return item && item !== "";
    }) && form.password === form.passwordConfirm;

  useEffect(() => {
    const subscription = watch((value) => {
      setForm(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, setForm]);

  return (
    <section className={styles.signup_wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <section className={styles.form_wrapper}>
          <LabeledInput
            id={"email"}
            label={"이메일"}
            placeholder="이메일"
            classNameWrapper={styles.input_margin}
            {...register("email")}
            required
            error={serverError["email"] ?? errors.email?.message}
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
            error={errors.password?.message}
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
            error={errors.passwordConfirm?.message}
          />

          <LabeledInput
            id={"nickname"}
            label={"닉네임"}
            placeholder="닉네임"
            className={styles.nickname_input}
            {...register("nickname")}
            required
            onChange={(e) => {
              nicknameRegister.onChange(e);
              debouncedCheckNickname(e.target.value);
            }}
            error={serverError["nickname"] ?? errors.nickname?.message}
          />

          <Row className={styles.privacy_agree_wrapper}>
            <Button onClick={(e) => onMovePrivacyPage(e)} className={styles.button}>
              <Checkbox checked={form.isPrivacyAgree} className={styles.checkbox} />

              <Text>개인정보 처리방침 동의</Text>
            </Button>
          </Row>

          <p className={styles.error}>{serverError["common"] ?? ""}</p>
        </section>

        <ActiveButton
          name={signupApi.isPending ? "가입 중" : "완료"}
          activeType={submitButtonActive ? "positive" : "disabled"}
          type={"submit"}
        />
      </form>
    </section>
  );
}

export default SignupForm;
