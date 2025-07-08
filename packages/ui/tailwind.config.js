// packages/ui/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // 이 패키지 안에서 사용하는 컴포넌트 감지
    "../../apps/**/*.{js,ts,jsx,tsx}", // apps에서도 사용하는 경우 purge 방지
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
