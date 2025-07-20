import clsx from "clsx";
import styles from "./TextButton.module.scss";
import React from "react";
import { Button, Center, Text } from "@my/ui";

type Props = {
  name: string;
  onClick?: () => void;
  className?: string;
  classNameText?: string;
};

/**
 *@description 텍스트만 보여주는 버튼
 */
function TextButton({ name, className, classNameText, ...props }: Props) {
  return (
    <Button {...props} className={clsx(styles["button"], className)}>
      <Center>
        <Text className={clsx(styles["text"], classNameText)}>{name}</Text>
      </Center>
    </Button>
  );
}

export default TextButton;
