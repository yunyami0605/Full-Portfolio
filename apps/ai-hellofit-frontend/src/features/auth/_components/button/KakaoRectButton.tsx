"use client";
import clsx from "clsx";
import styles from "./KakaoRectButton.module.scss";
import React from "react";
import { Button, Text } from "@my/ui";
import Image from "next/image";

type Props = {
  className?: string;
  onClick: () => void;
};

/**
 *@description 카카오 소셜 로그인 사각 버튼
 */
function KakaoRectButton({ onClick, className }: Props) {
  return (
    <Button className={clsx(styles.button, className)} onClick={onClick}>
      <Image
        src="/icons/IconKakaoLoginButton.png"
        alt={"카카오 소셜 로그인 버튼"}
        width={30}
        height={30}
      />

      <Text className={clsx(styles.text)}>카카오로 시작하기</Text>
    </Button>
  );
}

export default KakaoRectButton;
