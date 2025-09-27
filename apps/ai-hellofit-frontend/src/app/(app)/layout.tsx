"use client";

import { usePathname } from "next/navigation";
import { BaseLayout } from "@my/ui";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BottomTab, Header } from "@/shared/components";
import { queryClient } from "@/shared/setups/reactQuery";
import { Loading } from "@/shared/components/loading/Loading";
import { useUiStore } from "@/shared/stores/ui.store";

type HeaderMapValue = { title: string; noHeader?: boolean; back: boolean; tab: boolean };

type HeaderMap = {
  [key: string]: HeaderMapValue;
};
const headerMap = {
  "/signup": { title: "회원가입", back: true, tab: false },
  "/privacy": { title: "개인정보처리방침", back: true, tab: false },
  "/main": { title: "", back: false, noHeader: true, tab: true },
  "/user/register": { title: "", back: false, noHeader: true, tab: false },
  "/diet/recommendation": { title: "추천 식단", back: true, tab: true },
  "/diet/log/register": { title: "식단 기록 등록", back: true, tab: false },
  "/mypage": { title: "", noHeader: true, back: false, tab: true },
  "/login": { title: "", noHeader: true, back: false, tab: false },
  "/social": { title: "", noHeader: true, back: false, tab: false },
  "/post": { title: "", noHeader: true, back: false, tab: true },
  "/post/": { title: "", noHeader: true, back: true, tab: true },
  "/post/:id": { title: "", noHeader: false, back: true, tab: false },
  "/post/register": { title: "", noHeader: false, back: true, tab: false },
} as HeaderMap;

/**
 *@description app 기본 레이아웃
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { loading } = useUiStore();

  // 기본값
  let headerProps: HeaderMapValue = { title: "", noHeader: false, back: true, tab: false };

  if (pathname in headerMap) {
    headerProps = headerMap[pathname as keyof typeof headerMap];
  } else if (pathname.startsWith("/post/")) {
    // /post/:id → 상세 페이지 처리
    headerProps = headerMap["/post/:id"];
  }

  const [_queryClient] = useState(() => queryClient);

  return (
    <QueryClientProvider client={_queryClient}>
      <BaseLayout>
        <Header {...headerProps} />
        {children}

        {headerProps.tab && <BottomTab />}
      </BaseLayout>

      {loading && <Loading />}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
