import clsx from "clsx";
import styles from "./Tab.module.scss";
import React from "react";
import { Button, Text } from "@my/ui";

type Props = {
  name: string;
  isChecked: boolean;
  onClick: () => void;
};

/**
 *@description tab 공통 컴포넌트
 */
export function Tab({ name, isChecked, onClick }: Props) {
  return (
    <Button className={clsx(styles.tab, isChecked && styles.isChecked)} onClick={onClick}>
      <Text>{name}</Text>
    </Button>
  );
}
