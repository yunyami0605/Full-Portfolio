"use client";

import React from "react";

export default function MswBoot() {
  // Client Component
  React.useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // 개발 환경에서만 MSW 시작
      import("../mocks").then(({ startBrowserMSW }) => startBrowserMSW());
    }
  }, []);
  return null;
}
