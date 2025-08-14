import { Column } from "@my/ui";
import React from "react";
import clsx from "clsx";
import styles from "./LoginPage.module.scss";
import LoginForm from "@/features/auth/_components/form/LoginForm";
import { PageWrapper } from "@/shared/components";

/**
 *@description email login 페이지
 */
function LoginPage() {
  return (
    <PageWrapper withHeader={false} className={styles.between}>
      <Column as="section" className={clsx(styles.email_login_title)}>
        <p>나만의</p>
        <p>AI 트레이너 밀착 관리</p>
      </Column>

      <LoginForm />
    </PageWrapper>
  );
}

export default LoginPage;
