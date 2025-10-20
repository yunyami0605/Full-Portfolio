"use client";

import React from "react";
import styles from "./SocialLoginPage.module.scss";
import SocialLoginForm from "@/features/auth/_components/form/SocialLoginForm";
import { PageWrapper } from "@/shared/components";
import LoginTitleView from "@/features/auth/_components/view/LoginTitleView";

/**
 *@description 소셜 login 페이지 (초기화면)
 */
function SocialLoginPage() {
  return (
    <PageWrapper withHeader={false} className={styles.between}>
      <LoginTitleView />

      <SocialLoginForm />
    </PageWrapper>
  );
}

export default SocialLoginPage;
