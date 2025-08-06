"use client";

import clsx from "clsx";
import styles from "./Mypage.module.scss";
import React, { useState } from "react";
import ProfileImageRegisterButton from "@/features/user/_components/mypage/ProfileImageRegisterButton";
import ProfileEditButton from "@/features/user/_components/mypage/ProfileEditButton";
import { Column, Row } from "@my/ui";
import UserInfo from "@/features/user/_components/mypage/UserInfo";
import Tab from "@/shared/tab/Tab";
import Post from "@/features/community/_components/Post";
import PageWrapper from "@/shared/layout/PageWrapper";

type Props = {};
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

        <Post />
        <Post />
        <Post />
        <Post />
      </Column>
    </PageWrapper>
  );
}

export default Mypage;
