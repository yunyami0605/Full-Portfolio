"use client";

import clsx from "clsx";
import styles from "./ActiveButton.module.scss";
import React from "react";
import { Button, Center, Text } from "@my/ui";

type ActiveButtonType = "positive" | "negative" | "disabled" | "skip";

type Props = {
  name: string;
  onClick?: () => void;
  className?: string;
  classNameText?: string;
  activeType?: ActiveButtonType;
  type: "button" | "submit";
};

/**
 *@description 활성화 버튼
 *@param {boolean} disabled - 버튼 활성화 여부
 *@param {ActiveButtonType} type - disabled | positive | negative 여부
 */
function ActiveButton({
  name,
  className,
  classNameText,
  activeType = "disabled",
  ...props
}: Props) {
  return (
    <Button
      {...props}
      disabled={activeType === "disabled"}
      className={clsx(styles.button, styles[`button--${activeType}`], className)}
    >
      <Center>
        <Text className={clsx(styles["text"], classNameText)}>{name}</Text>
      </Center>
    </Button>
  );
}

export default ActiveButton;
