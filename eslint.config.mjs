import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended, // ESLint推奨ルールを適用
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: globals.browser,
    },
    rules: {
      // 警告レベル
      "no-console": "warn", // console.log()を警告

      // エラーレベル
      "prefer-const": "error", // 再代入されない変数にはconstを推奨
      "no-var": "error", // varの使用を禁止
      "no-self-compare": "warn", // 自己比較の禁止
      "no-template-curly-in-string": "error", // 通常の文字列でのテンプレート構文を禁止
      "no-useless-concat": "warn", // 不要な文字列連結を禁止
      "no-unused-expressions": "error", // 未使用の式を禁止
      eqeqeq: ["error", "always"], // === と !== の使用を強制
      "default-param-last": "error", // デフォルトパラメータは最後に配置
      "consistent-return": "error", // returnの一貫性を要求
      curly: ["error", "all"], // ブロックの範囲を明示
    },
  },
];
