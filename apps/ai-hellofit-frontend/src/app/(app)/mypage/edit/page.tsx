"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Text } from "@my/ui";
import styles from "./EditProfile.module.scss";
import { useUserId } from "@/features/user/_hooks/useUserId";
import {
  usePatchUserProfile,
  usePatchUserAccount,
  useCheckNickname,
  useUserProfileQuery,
} from "@/features/user/_hooks/mutation";
import type { AgeGroup, GenderType, PostUserProfileBody } from "@/features/user/_types";
import { ActiveButton } from "@/shared/components/button/ActiveButton";
import { useRouter } from "next/navigation";
import { useGetAuthInfo } from "@/features/auth/_hooks/query";
import { LabeledInput } from "@/shared/components/input/LabeledInput";
import { useUiStore } from "@/shared/stores/ui.store";

type FormValues = {
  nickname: string;
  ageGroup: string;
  gender: GenderType;
  height: number | string;
  weight: number | string;
  sleepMinutes?: number | string;
  exerciseMinutes?: number | string;
};

const FIELD_STYLE: React.CSSProperties = { height: 42 };

const AGE_OPTIONS: Array<{ label: string; value: AgeGroup }> = [
  { label: "10대", value: "AGE_10S" },
  { label: "20대", value: "AGE_20S" },
  { label: "30대", value: "AGE_30S" },
  { label: "40대", value: "AGE_40S" },
  { label: "50대", value: "AGE_50S" },
  { label: "60대", value: "AGE_60S" },
  { label: "70대", value: "AGE_70S" },
  { label: "80대", value: "AGE_80S" },
  { label: "90대", value: "AGE_90S" },
];

const GENDER_OPTIONS: Array<{ label: string; value: GenderType }> = [
  { label: "남성", value: "MALE" },
  { label: "여성", value: "FEMALE" },
];

export default function EditProfilePage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      nickname: "",
      ageGroup: "AGE_20S",
      gender: "MALE",
      height: "",
      weight: "",
      sleepMinutes: "",
      exerciseMinutes: "",
    },
  });

  const userId = useUserId();
  const { data: profile, isLoading: isLoadingProfile } = useUserProfileQuery();
  const { data: authInfo, isLoading: isLoadingAuth, refetch: refetchAuthInfo } = useGetAuthInfo();
  const patchProfile = usePatchUserProfile();
  const patchAccount = usePatchUserAccount();
  const { showToast } = useUiStore();

  // 닉네임 중복 검사 (디바운스 내장)
  const nicknameValue = watch("nickname") || "";
  const currentNickname = (authInfo?.data.nickname || "").trim();
  const isCurrentNickname = Boolean(
    nicknameValue && currentNickname && nicknameValue.trim() === currentNickname,
  );
  const { data: isDupNickname, isFetching: isCheckingNickname } = useCheckNickname(
    nicknameValue as string,
    Boolean(nicknameValue) && !isCurrentNickname,
  );

  useEffect(() => {
    refetchAuthInfo();
  }, []);

  // 서버 프로필 초기값 반영
  React.useEffect(() => {
    if (!profile) return;
    reset({
      nickname: authInfo?.data.nickname ?? "",
      ageGroup: (profile.ageGroup as unknown as string) ?? "AGE_20S",
      gender: (profile.gender as unknown as GenderType) ?? "MALE",
      height: profile.height ?? "",
      weight: profile.weight ?? "",
      sleepMinutes: profile.sleepMinutes ?? "",
      exerciseMinutes: profile.exerciseMinutes ?? "",
    });
  }, [profile, authInfo, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      // 1) 닉네임 변경(선택)
      if (data.nickname && userId && !isDupNickname && data.nickname.trim() !== currentNickname) {
        await patchAccount.mutateAsync({ userId, nickname: data.nickname });
      }
      // 2) 프로필 값 수정
      const payload: Partial<PostUserProfileBody> = {
        ageGroup: data.ageGroup as AgeGroup,
        gender: data.gender as GenderType,
        height: data.height ? Number(data.height) : undefined,
        weight: data.weight ? Number(data.weight) : undefined,
        sleepMinutes: data.sleepMinutes ? Number(data.sleepMinutes) : undefined,
        exerciseMinutes: data.exerciseMinutes ? Number(data.exerciseMinutes) : undefined,
      };
      const res = await patchProfile.mutateAsync(payload);

      if (res.status === 200) {
        refetchAuthInfo();
        showToast({ type: "success", message: "프로필이 수정되었습니다." });
      }
    } catch (e) {
      showToast({ type: "error", message: "수정에 실패했습니다. 잠시 후 다시 시도해주세요." });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleRow}>
        <Text as="h1" className={styles.title}>
          프로필 수정
        </Text>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.card}>
          <div className={styles.row}>
            <LabeledInput
              id="nickname"
              label="닉네임"
              placeholder="닉네임을 입력하세요"
              style={FIELD_STYLE}
              {...register("nickname", { required: false })}
              error={
                isDupNickname && !isCurrentNickname ? "이미 사용 중인 닉네임입니다." : undefined
              }
              success={
                nicknameValue
                  ? isCurrentNickname
                    ? "현재 닉네임입니다."
                    : isCheckingNickname
                      ? "닉네임 중복 확인 중..."
                      : !isDupNickname
                        ? "사용 가능한 닉네임입니다."
                        : undefined
                  : undefined
              }
            />
          </div>

          <div className={styles.row}>
            <label className={styles.label}>연령대</label>
            <select
              {...register("ageGroup", { required: true })}
              className={styles.select}
              style={FIELD_STYLE}
            >
              {AGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.row}>
            <label className={styles.label}>성별</label>
            <select
              {...register("gender", { required: true })}
              className={styles.select}
              style={FIELD_STYLE}
            >
              {GENDER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.row}>
            <LabeledInput
              id="height"
              label="키(cm)"
              type="number"
              placeholder="예: 175"
              style={FIELD_STYLE}
              required
              {...register("height", { required: "키를 입력하세요." })}
              error={errors.height ? String(errors.height.message) : undefined}
            />
          </div>

          <div className={styles.row}>
            <LabeledInput
              id="weight"
              label="몸무게(kg)"
              type="number"
              placeholder="예: 70"
              style={FIELD_STYLE}
              required
              {...register("weight", { required: "몸무게를 입력하세요." })}
              error={errors.weight ? String(errors.weight.message) : undefined}
            />
          </div>

          <div className={`${styles.row} ${styles.full}`}>
            <LabeledInput
              id="sleepMinutes"
              label="하루 수면(분)"
              type="number"
              placeholder="예: 420"
              style={FIELD_STYLE}
              {...register("sleepMinutes")}
            />
          </div>

          <div className={`${styles.row} ${styles.full}`}>
            <LabeledInput
              id="exerciseMinutes"
              label="하루 운동(분)"
              type="number"
              placeholder="예: 30"
              style={FIELD_STYLE}
              {...register("exerciseMinutes")}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <ActiveButton
            type="submit"
            name="수정"
            activeType={isSubmitting || isLoadingProfile || isLoadingAuth ? "disabled" : "positive"}
          />
          <ActiveButton
            type="button"
            name="취소"
            activeType="negative"
            onClick={() => router.back()}
          />
        </div>
      </form>
    </div>
  );
}
