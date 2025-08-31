import styles from "./UserInfo.module.scss";
import React from "react";
import { Column, Row, Text } from "@my/ui";

function UserInfo() {
  return (
    <section className={styles.user_info_container}>
      <Text className={styles.user_introduce}>잘 부탁드려요!~</Text>
      <Text className={styles.user_nickname}>토토</Text>

      <Row className={styles.count_wrapper} justify="between">
        <Column className={styles.count_inner_wrapper}>
          <Text className={styles.count_txt}>0</Text>
          <Text className={styles.label}>게시물</Text>
        </Column>

        <Column className={styles.count_inner_wrapper}>
          <Text className={styles.count_txt}>0</Text>
          <Text className={styles.label}>팔로워</Text>
        </Column>

        <Column className={styles.count_inner_wrapper}>
          <Text className={styles.count_txt}>0</Text>
          <Text className={styles.label}>팔로잉</Text>
        </Column>
      </Row>
    </section>
  );
}

export default UserInfo;
