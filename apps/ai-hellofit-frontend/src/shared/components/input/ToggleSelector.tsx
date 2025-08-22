"use client";

import { Button, Text, Label } from "@my/ui";
import clsx from "clsx";
import styles from "./ToggleSelector.module.scss";

type Props<T = string> = {
  setValue: (value: T) => void;
  firstButtonName: string;
  secondButtonName: string;
  required?: boolean;
  label?: string;
  classNameWrapper?: string;
  firstValue: T;
  secondValue: T;
  value?: T;
};

/**
 *@description 두개 선택 폼 형식 컴포넌트
 *@template T
 *@param firstValue 첫번째 버튼 체크 값
 *@param secondValue 두번째 버튼 체크 값
 *@param value 현재 값
 */
export const ToggleSelector = <T,>({
  setValue,
  required,
  label,
  classNameWrapper,
  firstButtonName,
  secondButtonName,
  firstValue,
  secondValue,
  value,
}: Props<T>) => {
  return (
    <div className={clsx(styles.wrapper, classNameWrapper)}>
      {label && (
        <Label required={required} className={styles.label}>
          {label}
        </Label>
      )}

      <div className={styles.toggle_wrapper}>
        <Button
          className={clsx(
            styles.toggle_button,
            value === firstValue ? styles.toggle_button_checked : styles.toggle_button_unchecked,
          )}
          onClick={() => setValue(firstValue)}
        >
          <Text>{firstButtonName}</Text>
        </Button>

        <Button
          className={clsx(
            styles.toggle_button,
            value === secondValue ? styles.toggle_button_checked : styles.toggle_button_unchecked,
          )}
          onClick={() => setValue(secondValue)}
        >
          <Text>{secondButtonName}</Text>
        </Button>
      </div>
    </div>
  );
};
