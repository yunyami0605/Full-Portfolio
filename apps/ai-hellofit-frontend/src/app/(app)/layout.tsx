"use client";

import { usePathname } from "next/navigation";
import { BaseLayout } from "@my/ui";
import Header from "@/shared/layout/Header";
import BottomTab from "@/shared/tab/BottomTab";

const headerMap = {
  "/signup": { title: "회원가입", back: true },
  "/privacy": { title: "개인정보처리방침", back: true },
  "/main": { title: "", back: false, noHeader: true },
  "/user/register": { title: "", back: false, noHeader: true },
  "/recommendation": { title: "추천 식단", back: true },
};

/**
 *@description app 기본 레이아웃
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const headerProps = headerMap[pathname as keyof typeof headerMap] ?? { title: "" };

  return (
    <BaseLayout>
      <Header {...headerProps} />
      {children}

      <BottomTab />
    </BaseLayout>
  );
}
