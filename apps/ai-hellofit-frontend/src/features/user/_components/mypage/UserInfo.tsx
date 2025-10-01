import styles from "./UserInfo.module.scss";
import React from "react";
import { Column, Row, Text } from "@my/ui";
import { useGetAuthInfo } from "@/features/auth/_hooks/query";

/**
 *@description 유저 자신 정보 컴포넌트
 */
function UserInfo() {
  const { data: userData } = useGetAuthInfo();

  return (
    <section className={styles.user_info_container}>
      {/* <Text className={styles.user_introduce}>{userData?.data.}</Text> */}
      <Text className={styles.user_nickname}>{userData?.data.nickname ?? ""}</Text>

      <Row className={styles.count_wrapper} justify="between">
        <Column className={styles.count_inner_wrapper}>
          <Text className={styles.count_txt}>{userData?.data.postCount ?? 0}</Text>
          <Text className={styles.label}>게시물</Text>
        </Column>

        <Column className={styles.count_inner_wrapper}>
          <Text className={styles.count_txt}>{userData?.data.commentCount ?? 0}</Text>
          <Text className={styles.label}>댓글</Text>
        </Column>
      </Row>
    </section>
  );
}

export default UserInfo;
