"use client";

import styles from "./BackButton.module.scss";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Button } from "@my/ui";

/**
 *@description 페이지 뒤로가기 버튼
 */
function PageBackButton() {
  return (
    <Button className={styles.button}>
      <FaChevronLeft />
    </Button>
  );
}

export default PageBackButton;
