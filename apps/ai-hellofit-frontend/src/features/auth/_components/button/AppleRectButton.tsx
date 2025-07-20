"use client";
import clsx from "clsx";
import styles from "./AppleRectButton.module.scss";
import React from "react";
import { Button, Text } from "@my/ui";
import Image from "next/image";

type Props = {
  onClick: () => void;
};

/**
 *@description 애플 소셜 로그인 사각 버튼
 */
function AppleRectButton({ onClick }: Props) {
  return (
    <Button className={clsx(styles.button)} onClick={onClick}>
      <Image
        src="/icons/IconAppleLoginButton.png"
        alt={"애플 소셜 로그인 버튼"}
        width={32}
        height={32}
      />

      <Text className={clsx(styles.text)}>Apple로 계속하기</Text>
    </Button>
  );
}

export default AppleRectButton;
