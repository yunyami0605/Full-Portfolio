"use client";

import styles from "./CommentEmptyState.module.scss";
import React from "react";
import { Column, Text } from "@my/ui";

/**
 * @description 댓글이 없을 때 표시하는 Empty State 컴포넌트
 */
function CommentEmptyState() {
  return (
    <Column className={styles.empty_state}>
      <Text className={styles.empty_message}>댓글이 없습니다</Text>
      <Text className={styles.empty_hint}>첫 번째 댓글을 작성해보세요!</Text>
    </Column>
  );
}

export default CommentEmptyState;
