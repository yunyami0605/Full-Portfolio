import { Column } from "@my/ui";
import React from "react";
import clsx from "clsx";
import styles from "./LoginTitleView.module.scss";

/**
 *@description login 페이지 title 뷰
 */
function LoginTitleView() {
  return (
    <Column as="section" className={clsx(styles.login_title)}>
      <p>나만의</p>
      <p>AI 트레이너 밀착 관리</p>
    </Column>
  );
}

export default LoginTitleView;
