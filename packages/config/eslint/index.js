// yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true, // <-- 핵심!
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "plugin:react-hooks/recommended",
    "prettier", // ✅ 마지막에 추가 (필수)
  ],
  plugins: ["react", "@typescript-eslint", "react-hooks"],
  rules: {
    camelcase: ["error", { properties: "always", ignoreGlobals: true }],
    "react/jsx-pascal-case": "error",
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "react/react-in-jsx-scope": "off", // Next.js는 필요 없음
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
};
