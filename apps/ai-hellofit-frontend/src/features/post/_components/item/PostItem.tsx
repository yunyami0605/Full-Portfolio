import styles from "./PostItem.module.scss";
import React from "react";
import { Button, Column, Row, Text } from "@my/ui";
import { PostItem } from "../../_types/data";
import { getRelativeTime } from "@/libs/time";
import { IconButton } from "@/shared/components";

type Props = PostItem & {
  onClick: (id: string) => void;
};

/**
 *@description 게시글 항목 (목록)
 */
function Post(props: Props) {
  return (
    <Button className={styles.post_container_button} onClick={() => props.onClick(props.id)}>
      <Row justify="between" className={styles.post_wrapper}>
        <Column justify="between" className={styles.post_inner_wrapper}>
          {/* 작성자 정보 뷰 */}
          <Column justify="between" className={styles.post_author_info_wrapper}>
            <Row className={styles.post_author_info}>
              <div className={styles.dummy_profile_image}></div>

              <Text className={styles.author_name_txt}>hit_tester</Text>
            </Row>

            <Text className={styles.post_title}>{props.title}</Text>
          </Column>

          {/* 게시글 좋아요, 댓글수, 조회수 정보 뷰 */}
          <Row className={styles.subinfo_wrapper}>
            <Row className={styles.count_wrapper}>
              <IconButton disabled iconName={"Heart"} size={10} />

              <Text>{props.likeCount}</Text>
            </Row>

            <Row className={styles.count_wrapper}>
              <IconButton disabled iconName={"Comment"} size={10} />

              <Text>{props.commentCount}</Text>
            </Row>

            <Row className={styles.count_wrapper}>
              <IconButton disabled iconName={"Read"} size={10} />

              <Text>{props.viewCount}</Text>
            </Row>

            <Row className={styles.count_wrapper}>
              <Text>{getRelativeTime(props.createdAt)}</Text>
            </Row>
          </Row>
        </Column>

        {/* 게시글 이미지 */}
        <div className={styles.dummy_post_image}></div>
      </Row>
    </Button>
  );
}

export default Post;
