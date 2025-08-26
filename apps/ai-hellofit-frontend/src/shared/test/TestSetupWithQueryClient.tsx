import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 *@description 테스트용 query client provider 설정
 */
export function TestSetupWithQueryClient({ ui }: { ui: ReactElement }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>;
}

export function renderWithQueryClient(ui: ReactElement, options?: RenderOptions) {
  return render(<TestSetupWithQueryClient ui={ui} />, options);
}
