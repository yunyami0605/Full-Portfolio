import { AxiosError } from "axios";

export type MutationResponse = {
  success: boolean;
};

export type ErrorResponse = {
  code: string;
  message: string;
  field?: string;
};

export type AxiosErrorResponse = AxiosError<ErrorResponse>;
