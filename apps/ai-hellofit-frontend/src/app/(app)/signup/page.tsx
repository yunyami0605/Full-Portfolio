"use client";

import React from "react";
import SignupForm from "@/features/auth/_components/form/SignupForm";
import PageWrapper from "@/shared/layout/PageWrapper";

function SignupPage() {
  return (
    <PageWrapper>
      <SignupForm />
    </PageWrapper>
  );
}

export default SignupPage;
