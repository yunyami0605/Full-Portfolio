import { Column } from "@my/ui";
import React from "react";
import styles from "./SocialLoginPage.module.scss";
import SocialLoginForm from "@/features/auth/_components/form/SocialLoginForm";
import { PageWrapper } from "@/shared/components";

/**
 *@description 소셜 login 페이지 (초기화면)
 */
function SocialLoginPage() {
  return (
    <PageWrapper withHeader={false} className={styles.between}>
      <Column as="section" className={styles.email_login_title}>
        <p>나만의</p>
        <p>AI 트레이너 밀착 관리</p>
      </Column>

      <SocialLoginForm />
    </PageWrapper>
  );
}

export default SocialLoginPage;
