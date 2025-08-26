import styles from "./Post.module.scss";
import React from "react";
import { Button, Column, Row, Text } from "@my/ui";
import { FaRegHeart } from "react-icons/fa";
import { IoChatbubbleOutline, IoBookOutline } from "react-icons/io5";
import { PostItem } from "../_types/data";

type Props = PostItem & {
  onClick: (id: string) => void;
};

/**
 *@description 게시글
 */
function Post(props: Props) {
  return (
    <Button className={styles.post_container_button} onClick={() => props.onClick(props.id)}>
      <Row justify="between" className={styles.post_wrapper}>
        <Column justify="between" className={styles.post_inner_wrapper}>
          <Column justify="between" className={styles.post_author_info_wrapper}>
            <Row className={styles.post_author_info}>
              <div className={styles.dummy_profile_image}></div>
              <Text className={styles.author_name_txt}>hit_tester</Text>
            </Row>

            <Text className={styles.post_title}>{props.title}</Text>
          </Column>

          <Row className={styles.subinfo_wrapper}>
            <Row className={styles.count_wrapper}>
              <FaRegHeart size={10} />

              <Text>120</Text>
            </Row>

            <Row className={styles.count_wrapper}>
              <IoChatbubbleOutline size={10} />

              <Text>120</Text>
            </Row>

            <Row className={styles.count_wrapper}>
              <IoBookOutline size={10} />

              <Text>120</Text>
            </Row>

            <Row className={styles.count_wrapper}>
              <Text>2시간 전</Text>
            </Row>
          </Row>
        </Column>

        <div className={styles.dummy_post_image}></div>
      </Row>
    </Button>
  );
}

export default Post;
