"use client";

import styles from "./BottomTab.module.scss";
import React from "react";
import { Button, Row, Text } from "@my/ui";
import { MdHomeFilled } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { BsChatLeftHeartFill } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

/**
 *@description 하단 탭
 */
export function BottomTab() {
  const pathname = usePathname();

  return (
    <Row className={styles.tab_wrapper}>
      <Button className={styles.tab_button}>
        <Link href="/main">
          <MdHomeFilled size={16} className={clsx(pathname == "/main" && styles.active)} />

          <Text className={clsx(pathname == "/main" && styles.active)}>메인</Text>
        </Link>
      </Button>

      <Button className={styles.tab_button}>
        <Link href="/record">
          <FaCalendar size={16} className={clsx(pathname == "/record" && styles.active)} />

          <Text className={clsx(pathname == "/record" && styles.active)}>기록</Text>
        </Link>
      </Button>

      <Button className={styles.tab_button}>
        <Link href="/post">
          <BsChatLeftHeartFill size={16} className={clsx(pathname == "/post" && styles.active)} />

          <Text className={clsx(pathname == "/post" && styles.active)}>커뮤니티</Text>
        </Link>
      </Button>

      <Button className={styles.tab_button}>
        <Link href="/mypage">
          <IoPerson size={16} className={clsx(pathname == "/mypage" && styles.active)} />

          <Text className={clsx(pathname == "/mypage" && styles.active)}>계정</Text>
        </Link>
      </Button>
    </Row>
  );
}
