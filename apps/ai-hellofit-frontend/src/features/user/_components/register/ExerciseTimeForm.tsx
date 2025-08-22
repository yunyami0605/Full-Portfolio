"use client";

import styles from "./UserInfoForm.module.scss";
import React from "react";
import { Text } from "@my/ui";
import { LabeledInput } from "@/shared/components/input/LabeledInput";
import { ActiveButton } from "@/shared/components";
import { useUserProfileStore } from "../..";
import { useImmer } from "use-immer";

interface Props {
  onMove: () => void;
}

/**
 *@description 운동시간
 */
function ExerciseTimeForm({ onMove }: Props) {
  // exerciseMinutes

  const { setForm } = useUserProfileStore();
  const initTime = { h: 0, m: 0 } as { h?: number; m?: number };
  const [time, setTime] = useImmer(initTime);
  const { h, m } = time;

  const onChangeTime = (_time: string, unit: "h" | "m") => {
    if (_time.trim() === "") {
      setTime((prev) => (prev[unit] = undefined));
      return;
    }

    let numTime = Number(_time);
    if (unit === "h" && numTime > 24) {
      numTime = 24;
    } else if (unit === "m" && numTime > 60) {
      numTime = 60;
    } else if (numTime < 0) {
      numTime = 0;
    }

    setTime((draft) => {
      draft[unit] = numTime;
    });
  };

  const onSkip = () => {
    setTime(initTime);
    onMove();
  };

  const onClickNext = () => {
    if (!h && !m) return;

    const _time = (h ?? 0) * 60 + (m ?? 0);
    if (_time < 0) return;

    setForm({ exerciseMinutes: (h ?? 0) * 60 + (m ?? 0) });
    onMove();
  };

  return (
    <section className={styles.page_layout}>
      <section className={styles.top_wrapper}>
        <section className={styles.register_info}>
          <Text className={styles.title}>하루에 운동 가능한 시간은 얼마나 되나요?</Text>

          <Text className={styles.description}>{"(10분 / 30분 / 1시간 등)"}</Text>
        </section>

        <div className={styles.sleep_time_input_wrapper}>
          <LabeledInput
            type={"number"}
            id={"exercise_time"}
            label="운동시간 (h)"
            placeholder="운동시간 (시간)"
            onChange={(e) => onChangeTime(e.target.value, "h")}
            value={time["h"] ?? ""}
          />

          <LabeledInput
            type={"number"}
            id={"time_min"}
            label="분 (m)"
            placeholder="분"
            onChange={(e) => onChangeTime(e.target.value, "m")}
            value={time["m"] ?? ""}
          />
        </div>
      </section>

      <section className={styles.bottom_wrapper}>
        <ActiveButton name={"건너뛰기"} onClick={onSkip} activeType="skip" type={"button"} />

        <ActiveButton
          onClick={onClickNext}
          name={"다음"}
          activeType={(h || m) && (m ?? 0) + (h ?? 0) * 60 > 0 ? "positive" : "disabled"}
          type={"button"}
        />
      </section>
    </section>
  );
}

export default ExerciseTimeForm;
