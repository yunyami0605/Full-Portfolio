import { Column } from "@my/ui";
import React from "react";
import clsx from "clsx";
import styles from "./LoginPage.module.scss";
import LoginForm from "@/features/auth/_components/form/LoginForm";

/**
 *@description email login 페이지
 */
function LoginPage() {
  return (
    <section className={styles.page_layout}>
      <Column as="section" className={clsx(styles.email_login_title)}>
        <p>나만의</p>
        <p>AI 트레이너 밀착 관리</p>
      </Column>

      <LoginForm />
    </section>
  );
}

export default LoginPage;
