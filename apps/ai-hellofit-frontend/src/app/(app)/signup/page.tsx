"use client";

import styles from "./SignupPage.module.scss";
import React from "react";
import SignupForm from "@/features/auth/_components/form/SignupForm";

function SignupPage() {
  return (
    <section className={styles.page_layout}>
      <SignupForm />
    </section>
  );
}

export default SignupPage;
