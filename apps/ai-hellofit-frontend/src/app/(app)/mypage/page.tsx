"use client";

import styles from "./Mypage.module.scss";
import React from "react";
import ProfileImageRegisterButton from "@/features/user/_components/mypage/ProfileImageRegisterButton";
import ProfileEditButton from "@/features/user/_components/mypage/ProfileEditButton";
import { Column, Row } from "@my/ui";
import UserInfo from "@/features/user/_components/mypage/UserInfo";
import { PageWrapper, Tab } from "@/shared/components";

function Mypage() {
  return (
    <PageWrapper withHeader={false}>
      <Row className={styles.top_info_container}>
        <Column align="center">
          <ProfileImageRegisterButton />

          <ProfileEditButton />
        </Column>

        <UserInfo />
      </Row>

      <Column className={styles.bottom_info_container}>
        <Row className={styles.tab_list}>
          <Tab name={"게시글"} isChecked={true} onClick={() => {}} />
          <Tab name={"팔로우"} isChecked={false} onClick={() => {}} />
          <Tab name={"팔로워"} isChecked={false} onClick={() => {}} />
        </Row>
      </Column>
    </PageWrapper>
  );
}

export default Mypage;
