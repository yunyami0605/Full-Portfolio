"use client";

import styles from "./BackButton.module.scss";
import React, { useCallback } from "react";
import { Button } from "@my/ui";
import { useRouter } from "next/navigation";
import { IconButton } from "./IconButton";

interface Props {
  onBack?: () => void;
}

/**
 *@description 페이지 뒤로가기 버튼
 */
export function PageBackButton({ onBack }: Props) {
  const router = useRouter();

  const onGoback = useCallback(() => {
    if (onBack) {
      onBack();
    }
    router.back();
  }, []);

  return (
    <Button className={styles.button} onClick={onGoback}>
      <IconButton iconName="Back" />
    </Button>
  );
}
