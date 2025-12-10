"use client";

import styles from "./ProfileEditButton.module.scss";
import React from "react";
import { Button, Text } from "@my/ui";
import { useRouter } from "next/navigation";

/**
 *@description 프로필 수정 버튼
 */
function ProfileEditButton() {
  const router = useRouter();
  return (
    <Button className={styles.edit_button} onClick={() => router.push("/mypage/edit")}>
      <Text>프로필 수정</Text>
    </Button>
  );
}

export default ProfileEditButton;
