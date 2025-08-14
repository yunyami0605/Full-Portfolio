// 런타임에만 import (서버 번들 최소화)
export async function startBrowserMSW() {
  if (typeof window === "undefined") {
    // Node.js 환경 → 테스트용
    const { server } = await import("./server");
    server.listen({ onUnhandledRequest: "warn" });
    console.log("[MSW] Node server started");
  } else {
    // 브라우저 환경 → 개발용
    const { worker } = await import("./browser");
    await worker.start({
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
      onUnhandledRequest: "bypass",
    });
    console.log("[MSW] Browser worker started");
  }
}
