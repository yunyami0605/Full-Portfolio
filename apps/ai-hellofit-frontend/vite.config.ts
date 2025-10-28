import path from "path";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // @ts-expect-error: includePaths is supported by Sass but not in Vite's type
        includePaths: [path.resolve(__dirname, "src")],
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    css: true,
    include: [
      "src/**/*.{test,spec}.{js,jsx,ts,tsx}",
      "src/**/__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}",
      "src/**/_test*/**/*.{test,spec}.{js,jsx,ts,tsx}",
    ],
  },
  esbuild: {
    jsx: "automatic", // React 17+ 자동 JSX 변환
    jsxImportSource: "react",
  },
});
