import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // 關閉 no-explicit-any 規則，有any型別不會跳錯誤
      "@typescript-eslint/no-unused-vars": "off",// 關閉 no-explicit-any 規則，沒用到的參數不會跳錯誤
    },
  },
];

export default eslintConfig;
