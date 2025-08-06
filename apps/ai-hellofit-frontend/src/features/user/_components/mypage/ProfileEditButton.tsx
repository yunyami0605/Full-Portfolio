"use client";

import styles from "./ProfileEditButton.module.scss";
import React from "react";
import { Button, Text } from "@my/ui";

/**
 *@description 프로필 수정 버튼
 */
function ProfileEditButton() {
  return (
    <Button className={styles.edit_button}>
      <Text>프로필 수정</Text>
    </Button>
  );
}

export default ProfileEditButton;
