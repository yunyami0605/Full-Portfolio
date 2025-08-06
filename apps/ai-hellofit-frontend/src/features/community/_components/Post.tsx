import styles from "./Post.module.scss";
import React from "react";
import { Button, Column, Row, Text } from "@my/ui";
import { FaRegHeart } from "react-icons/fa";

/**
 *@description 게시글
 */
function Post() {
  return (
    <Button className={styles.post_container_button}>
      <Row justify="between" className={styles.post_wrapper}>
        <Column justify="between" className={styles.post_inner_wrapper}>
          <Column justify="between" className={styles.post_author_info_wrapper}>
            <Row className={styles.post_author_info}>
              <div className={styles.dummy_profile_image}></div>
              <Text className={styles.author_name_txt}>hit_tester</Text>
            </Row>

            <Text className={styles.post_title}>멋있는 이야기 대한 내용</Text>
          </Column>

          <Row className={styles.subinfo_wrapper}>
            <Row className={styles.count_wrapper}>
              <FaRegHeart size={10} />

              <Text>120</Text>
            </Row>

            <Row className={styles.count_wrapper}>
              <FaRegHeart size={10} />

              <Text>120</Text>
            </Row>

            <Row className={styles.count_wrapper}>
              <FaRegHeart size={10} />

              <Text>120</Text>
            </Row>

            <Row className={styles.count_wrapper}>
              <FaRegHeart size={10} />

              <Text>120</Text>
            </Row>
          </Row>
        </Column>

        <div className={styles.dummy_post_image}></div>
      </Row>
    </Button>
  );
}

export default Post;
