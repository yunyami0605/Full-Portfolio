import styles from "./ActionView.module.scss";
import React from "react";
import { Row, Text } from "@my/ui";
import { IconButton } from "@/shared/components";
import clsx from "clsx";

type Props = {
  likeCount?: number;
  commentCount?: number;
  viewCount?: number;
  size?: "small" | "normal";
  onLike?: () => void;
  onComment?: () => void;
};

/**
 *@description 게시글 정보 컴포넌트 (좋아요, 댓글, 뷰, 상대적인 시간, 수정전 텍스트)
 */
function ActionView({
  likeCount,
  commentCount,
  viewCount,
  onLike,
  onComment,
  size = "small",
}: Props) {
  const iconSize = size === "small" ? 14 : 16;

  return (
    <Row className={styles.subinfo_wrapper}>
      <Row className={clsx(styles.info_wrapper, styles[size])}>
        <IconButton disabled={!onLike} onClick={onLike} iconName={"HeartOutline"} size={iconSize} />

        <Text className={styles[size]}>{likeCount ?? 0}</Text>
      </Row>

      <Row className={clsx(styles.info_wrapper, styles[size])}>
        <IconButton disabled={!onComment} iconName={"Comment"} size={iconSize} />

        <Text className={styles[size]}>{commentCount ?? 0}</Text>
      </Row>

      <Row className={clsx(styles.info_wrapper, styles[size])}>
        <IconButton disabled={!onComment} iconName={"BookOutline"} size={iconSize} />

        <Text className={styles[size]}>{viewCount ?? 0}</Text>
      </Row>
    </Row>
  );
}

export default ActionView;
