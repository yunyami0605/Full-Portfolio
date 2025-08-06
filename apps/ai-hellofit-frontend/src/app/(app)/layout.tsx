"use client";

import { usePathname } from "next/navigation";
import { BaseLayout } from "@my/ui";
import Header from "@/shared/layout/Header";
import BottomTab from "@/shared/tab/BottomTab";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const headerMap = {
  "/signup": { title: "회원가입", back: true, tab: false },
  "/privacy": { title: "개인정보처리방침", back: true, tab: false },
  "/main": { title: "", back: false, noHeader: true, tab: true },
  "/user/register": { title: "", back: false, noHeader: true, tab: false },
  "/recommendation": { title: "추천 식단", back: true, tab: true },
  "/mypage": { title: "", noHeader: true, back: false, tab: true },
};

/**
 *@description app 기본 레이아웃
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const headerProps = headerMap[pathname as keyof typeof headerMap] ?? { title: "" };
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <BaseLayout>
        <Header {...headerProps} />
        {children}

        {headerProps.tab && <BottomTab />}
      </BaseLayout>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
