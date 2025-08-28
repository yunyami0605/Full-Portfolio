import { setupServer } from "msw/node";
import { authHandlers } from "../features/auth/_mocks/authMockApi";
import { postHandlers } from "../features/post/_mocks/postMockApi";
import { awsHandlers } from "@/features/aws/_mocks/awsMockApi";

export const server = setupServer(...authHandlers, ...postHandlers, ...awsHandlers);
