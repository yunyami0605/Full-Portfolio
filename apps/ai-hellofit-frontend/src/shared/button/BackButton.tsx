"use client";

import styles from "./BackButton.module.scss";
import React, { useCallback } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Button } from "@my/ui";
import { useRouter } from "next/navigation";

/**
 *@description 페이지 뒤로가기 버튼
 */
function PageBackButton() {
  const router = useRouter();

  const onGoback = useCallback(() => {
    router.back();
  }, []);

  return (
    <Button className={styles.button} onClick={onGoback}>
      <FaChevronLeft />
    </Button>
  );
}

export default PageBackButton;
