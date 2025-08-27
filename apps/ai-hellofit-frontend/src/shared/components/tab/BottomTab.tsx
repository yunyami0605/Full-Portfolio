"use client";

import styles from "./BottomTab.module.scss";
import React from "react";
import { Button, Row, Text } from "@my/ui";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { IconButton } from "../button/IconButton";

/**
 *@description 하단 탭
 */
export function BottomTab() {
  const pathname = usePathname();

  return (
    <Row className={styles.tab_wrapper}>
      <div className={styles.tab_button}>
        <Link href="/main">
          <IconButton
            size={16}
            className={clsx(pathname == "/main" && styles.active)}
            iconName={"Home"}
          />

          <Text className={clsx(pathname == "/main" && styles.active)}>메인</Text>
        </Link>
      </div>

      <div className={styles.tab_button}>
        <Link href="/record">
          <IconButton
            size={16}
            className={clsx(pathname == "/record" && styles.active)}
            iconName={"Calendar"}
          />

          <Text className={clsx(pathname == "/record" && styles.active)}>기록</Text>
        </Link>
      </div>

      <div className={styles.tab_button}>
        <Link href="/post">
          <IconButton
            size={16}
            className={clsx(pathname == "/post" && styles.active)}
            iconName={"Community"}
          />

          <Text className={clsx(pathname == "/post" && styles.active)}>커뮤니티</Text>
        </Link>
      </div>

      <div className={styles.tab_button}>
        <Link href="/mypage">
          <IconButton
            size={16}
            className={clsx(pathname == "/mypage" && styles.active)}
            iconName={"Person"}
          />

          <Text className={clsx(pathname == "/mypage" && styles.active)}>계정</Text>
        </Link>
      </div>
    </Row>
  );
}
