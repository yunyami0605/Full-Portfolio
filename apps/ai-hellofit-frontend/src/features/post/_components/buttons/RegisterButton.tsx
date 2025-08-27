"use client";

import styles from "./RegisterButton.module.scss";
import React from "react";
import { IconButton } from "@/shared/components";
import { useRouter } from "next/navigation";

/**
 *@description 글쓰기 버튼
 */
function RegisterButton() {
  const router = useRouter();

  const onMoveRegister = () => {
    router.push("/post/register");
  };

  return (
    <button className={styles.write_button} onClick={onMoveRegister}>
      <IconButton iconName={"Edit"} fill={"#fff"} />
      글쓰기
    </button>
  );
}

export default RegisterButton;
