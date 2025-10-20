"use client";

import React from "react";
import styles from "./LoginPage.module.scss";
import LoginForm from "@/features/auth/_components/form/LoginForm";
import { PageWrapper } from "@/shared/components";
import LoginTitleView from "@/features/auth/_components/view/LoginTitleView";

/**
 *@description email login 페이지
 */
function LoginPage() {
  return (
    <PageWrapper withHeader={false} className={styles.between}>
      <LoginTitleView />

      <LoginForm />
    </PageWrapper>
  );
}

export default LoginPage;
