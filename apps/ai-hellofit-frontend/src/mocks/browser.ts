import { setupWorker } from "msw/browser";
import { authHandlers } from "../features/auth/_mocks/authMockApi";
import { postHandlers } from "../features/post/_mocks/postMockApi";

export const worker = setupWorker(...authHandlers, ...postHandlers);

worker.events.on("response:mocked", async ({ request, response, requestId }) => {
  let body: unknown = null;
  try {
    body = await response.clone().json();
  } catch {}
  console.log("[MSW][mocked]", requestId, response.status, request.url, body);
});
