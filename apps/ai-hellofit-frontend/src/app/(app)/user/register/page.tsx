"use client";

import { useState } from "react";
import styles from "./UserInfoRegister.module.scss";
import Intro from "@/features/user/_components/register/Intro";
import AgeForm from "@/features/user/_components/register/AgeForm";
import GenderForm from "@/features/user/_components/register/GenderForm";
import HeightForm from "@/features/user/_components/register/HeightForm";
import WeightForm from "@/features/user/_components/register/WeightForm";
import SleepTimeForm from "@/features/user/_components/register/SleepTimeForm";
import DontEatForm from "@/features/user/_components/register/DontEatForm";
import ExerciseTimeForm from "@/features/user/_components/register/ExerciseTimeForm";
import { Button } from "@my/ui";
import { useRouter } from "next/navigation";
import { Header, IconButton } from "@/shared/components";
import { PostUserProfileBody, usePostUserProfileApi, useUserProfileStore } from "@/features/user";
import { userProfileSchema } from "@/features/user/_schemas/userProfile.schema";

const steps = [
  (onMove: () => void) => <Intro onMove={onMove} />,
  (onMove: () => void) => <AgeForm onMove={onMove} />,
  (onMove: () => void) => <GenderForm onMove={onMove} />,
  (onMove: () => void) => <HeightForm onMove={onMove} />,
  (onMove: () => void) => <WeightForm onMove={onMove} />,
  (onMove: () => void) => <SleepTimeForm onMove={onMove} />,
  // (onMove: () => void) => <EatingHabitForm onMove={onMove} />, // TODO 추후 개편
  (onMove: () => void) => <DontEatForm onMove={onMove} />,
  (onMove: () => void) => <ExerciseTimeForm onMove={onMove} />,
];

/**
 *@description 유저 건강 정보 등록 페이지
 */
function UserInfoRegister() {
  const router = useRouter();
  const postUserProfileApi = usePostUserProfileApi();
  const { form } = useUserProfileStore();
  const [step, setStep] = useState(0);

  const onMove = () => {
    if (step === steps.length - 1) {
      const checkForm = userProfileSchema.safeParse(form);

      if (checkForm.success) {
        postUserProfileApi.mutateAsync(form as PostUserProfileBody);
        router.push("/main");
      } else {
        console.error(checkForm.error.format());
      }

      return;
    }
    setStep((prev) => prev + 1);
  };

  const onBack = () => {
    if (step === 0) {
      router.back();
      return;
    }
    setStep((prev) => prev - 1);
  };

  return (
    <section className={styles.flow_wrapper}>
      <Header
        left={
          <Button onClick={onBack} className={styles.back_button}>
            <IconButton iconName="Back" />
          </Button>
        }
      />

      <div className={styles.flow_inner_wrapper}>
        <div className={styles.slide_wrapper}>
          <div className={styles.slide_track} style={{ transform: `translateX(-${step * 100}%)` }}>
            {steps.map((StepComponent, i) => (
              <div className={styles.slide_page} key={i}>
                {StepComponent(onMove)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserInfoRegister;
