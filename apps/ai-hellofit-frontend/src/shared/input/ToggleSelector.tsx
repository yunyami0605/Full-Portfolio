"use client";

import { Button, Text, Label } from "@my/ui";
import clsx from "clsx";
import styles from "./ToggleSelector.module.scss";

type Props = {
  isFirst: boolean;
  setFirst: (isFirst: boolean) => void;
  firstButtonName: string;
  secondButtonName: string;
  required?: boolean;
  label?: string;
  classNameWrapper?: string;
};

/**
 *@description 두개 선택 폼 형식 컴포넌트
 */
export const ToggleSelector = ({
  isFirst,
  setFirst,
  required,
  label,
  classNameWrapper,
  firstButtonName,
  secondButtonName,
}: Props) => {
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
            isFirst ? styles.toggle_button_checked : styles.toggle_button_unchecked,
          )}
          onClick={() => setFirst(true)}
        >
          <Text>{firstButtonName}</Text>
        </Button>

        <Button
          className={clsx(
            styles.toggle_button,
            !isFirst ? styles.toggle_button_checked : styles.toggle_button_unchecked,
          )}
          onClick={() => setFirst(false)}
        >
          <Text>{secondButtonName}</Text>
        </Button>
      </div>
    </div>
  );
};
