"use client";
import clsx from "clsx";
import styles from "./KakaoRoundedButton.module.scss";
import React from "react";
import { Button } from "@my/ui";
import Image from "next/image";

type Props = {
  onClick: () => void;
};

/**
 *@description 카카오 소셜 로그인 원형 버튼
 */
function KakaoRoundedButton({ onClick }: Props) {
  return (
    <Button className={clsx(styles.button)} onClick={onClick}>
      <Image
        src="/images/ImageKakaoButton.png"
        alt={"카카오 소셜 로그인 버튼"}
        width={42}
        height={36}
      />
    </Button>
  );
}

export default KakaoRoundedButton;
