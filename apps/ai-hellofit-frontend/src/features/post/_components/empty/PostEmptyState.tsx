"use client";

import styles from "./PostEmptyState.module.scss";
import React from "react";
import { Button, Column, Text } from "@my/ui";

type Props = {
  onCreateClick: () => void;
};

/**
 * @description 게시글이 없을 때 표시하는 Empty State 컴포넌트
 */
function PostEmptyState({ onCreateClick }: Props) {
  return (
    <Column className={styles.empty_state}>
      <Text className={styles.empty_message}>게시글이 없습니다</Text>
      <Button onClick={onCreateClick}>게시글 작성하기</Button>
    </Column>
  );
}

export default PostEmptyState;
