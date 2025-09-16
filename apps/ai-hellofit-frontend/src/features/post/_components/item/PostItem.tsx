import styles from "./PostItem.module.scss";
import React from "react";
import { Button, Column, Row, Text } from "@my/ui";
import { PostItem } from "../../_types/data";
import Image from "next/image";
import PostInfo from "../info/PostInfo";
import { getRelativeTime } from "@/libs/time";

type Props = PostItem & {
  onClick: (id: string) => void;
};

/**
 *@description 게시글 항목 (목록)
 */
function Post(props: Props) {
  return (
    <Button className={styles.post_container_button} onClick={() => props.onClick(props.id)}>
      <Column className={styles.post_wrapper}>
        <Column justify="between" className={styles.post_inner_wrapper}>
          {/* 작성자 정보 뷰 */}
          <Row className={styles.post_author_info}>
            <div className={styles.dummy_profile_image}></div>

            <Text className={styles.author_name_txt}>hit_tester</Text>

            <Text className={styles.date_txt}>{getRelativeTime(props.createdAt)}</Text>
          </Row>

          {/* helper 버튼 */}
        </Column>

        <div className={styles.image_wrapper}>
          {/* 게시글 이미지 */}
          {props.images[0] ? (
            <Image
              className={styles.dummy_post_image}
              src={props.images[0] ?? ""}
              alt="게시글 이미지"
              width={80}
              height={80}
            />
          ) : (
            <div className={styles.dummy_post_image}></div>
          )}
        </div>

        {/* 게시글 좋아요, 댓글수, 조회수 정보 뷰 */}
        <PostInfo {...props} />

        <Text className={styles.post_title}>{props.title}</Text>
      </Column>
    </Button>
  );
}

export default Post;
