// app/layout.tsx
// eslint-disable-next-line camelcase
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import { Metadata } from "next";
import MswBoot from "@/mocks/MswBoot";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HelloFit - AI 기반 건강 관리 서비스",
  description: "나만의 AI 트레이너가 식단과 운동을 밀착 관리해주는 헬스케어 플랫폼",
  keywords: [
    "건강관리",
    "헬스케어",
    "식단관리",
    "운동관리",
    "AI",
    "피트니스",
    "HelloFit",
    "헬로핏",
  ],
  authors: [{ name: "HelloFit" }],
  openGraph: {
    title: "HelloFit - AI 기반 건강 관리 서비스",
    description: "나만의 AI 트레이너가 식단과 운동을 밀착 관리해주는 헬스케어 플랫폼",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "HelloFit - AI 기반 건강 관리 서비스",
    description: "나만의 AI 트레이너가 식단과 운동을 밀착 관리해주는 헬스케어 플랫폼",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-white text-black">
        <MswBoot />
        {children}
      </body>
    </html>
  );
}
