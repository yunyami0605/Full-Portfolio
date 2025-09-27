import clsx from "clsx";
import styles from "./ActiveRoundedButton.module.scss";
import React, { useState } from "react";
import { Button } from "@my/ui";

type Props = {
  name: string;
  isActive?: boolean;
  onClick: () => void;
};

/**
 *@description 식단/운동 구분 둥근 버튼
 */
function ActiveRoundedButton({ name, isActive, onClick }: Props) {
  return (
    <Button
      onClick={onClick}
      className={clsx(
        styles.rounded_button,
        isActive && styles.active,
        !isActive && styles.disabled,
      )}
    >
      {name}
    </Button>
  );
}

export default ActiveRoundedButton;
