import clsx from "clsx";
import styles from "./AuthorInfoView.module.scss";
import React from "react";
import { Center, Row, Text } from "@my/ui";
import { getRelativeTime } from "@/libs/time";
import { ImageUrl } from "@/shared/types/base";
import Image from "next/image";
import { IconButton } from "../button/IconButton";

type Props = {
  authorImage: ImageUrl;
  authorName: string;
  date: string;
  onMoreClick?: () => void;
};

/**
 *@description 작성자 정보
 */
export function AuthorInfoView({ authorImage, authorName, date, onMoreClick }: Props) {
  return (
    <Row justify="between" className={styles.author_info_view}>
      <Row className={styles.author_info_view_wrapper}>
        {authorImage && (
          <Center className={styles.author_image_wrapper}>
            <Image className={styles.author_image} src={authorImage} alt="작성자 이미지" fill />
          </Center>
        )}

        {!authorImage && <div className={styles.fallback_image} />}

        <Text className={styles.author_name_}>{authorName}</Text>

        <Text className={styles.date}>{getRelativeTime(date)}</Text>
      </Row>

      {onMoreClick && (
        <button className={styles.more_button} onClick={onMoreClick}>
          <IconButton iconName="More" />
        </button>
      )}
    </Row>
  );
}
