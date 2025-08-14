import { setupWorker } from "msw/browser";
import { authHandlers } from "./handlers/auth";

export const worker = setupWorker(...authHandlers);

worker.events.on("response:mocked", async ({ request, response, requestId }) => {
  let body: unknown = null;
  try {
    body = await response.clone().json();
  } catch {}
  console.log("[MSW][mocked]", requestId, response.status, request.url, body);
});
