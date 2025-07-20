"use client";
import clsx from "clsx";
import styles from "./AppleRoundedButton.module.scss";
import React from "react";
import { Button } from "@my/ui";
import Image from "next/image";

type Props = {
  onClick: () => void;
  className?: string;
};

/**
 *@description 애플 소셜 로그인 원형 버튼
 */
function AppleRoundedButton({ onClick, className }: Props) {
  return (
    <Button className={clsx(styles.button, className)} onClick={onClick}>
      <Image
        src="/images/ImageAppleButton.png"
        alt={"카카오 소셜 로그인 버튼"}
        width={42}
        height={36}
      />
    </Button>
  );
}

export default AppleRoundedButton;
