import { Column } from "@my/ui";
import React from "react";
import clsx from "clsx";
import styles from "./SocialLoginPage.module.scss";
import SocialLoginForm from "@/features/auth/_components/form/SocialLoginForm";

/**
 *@description 소셜 login 페이지 (초기화면)
 */
function SocialLoginPage() {
  return (
    <section className={styles.page_layout}>
      <Column as="section" className={clsx(styles.email_login_title)}>
        <p>나만의</p>
        <p>AI 트레이너 밀착 관리</p>
      </Column>

      <SocialLoginForm />
    </section>
  );
}

export default SocialLoginPage;
