import styles from "./SignupPage.module.scss";
import React from "react";
import Header from "@/shared/layout/Header";
import SignupForm from "@/features/auth/_components/form/SignupForm";

function SignupPage() {
  return (
    <section className={styles.page_layout}>
      <Header back title="회원가입" />

      <SignupForm />
    </section>
  );
}

export default SignupPage;
