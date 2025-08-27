import { setupServer } from "msw/node";
import { authHandlers } from "../features/auth/_mocks/authMockApi";
import { postHandlers } from "../features/post/_mocks/postMockApi";

export const server = setupServer(...authHandlers, ...postHandlers);
