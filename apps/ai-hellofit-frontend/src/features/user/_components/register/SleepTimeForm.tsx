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
 *@description 수면시간 폼
 */
function SleepTimeForm({ onMove }: Props) {
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

    setForm({ sleepMinutes: (h ?? 0) * 60 + (m ?? 0) });
    onMove();
  };

  return (
    <section className={styles.page_layout}>
      <section className={styles.top_wrapper}>
        <section className={styles.register_info}>
          <Text className={styles.title}>평소 하루 평균 몇 시간 주무시나요?</Text>

          <Text className={styles.description}>{"회복도 루틴에 중요한 요소예요!"}</Text>
        </section>

        <div className={styles.sleep_time_input_wrapper}>
          <LabeledInput
            type={"number"}
            id={"sleep_time"}
            label="수면시간 (h)"
            placeholder="수면시간 (시간)"
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

export default SleepTimeForm;
