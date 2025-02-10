import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ["**/*.js"], languageOptions: { sourceType: "script" } },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,

	{
		rules: {
			// 警告レベル
			"no-console": "warn", // console.log()を警告

			// エラーレベル
			"prefer-const": "error", // 再代入されない変数にはconstを推奨
			"no-var": "error", // varの使用を禁止
			eqeqeq: ["error", "always"], // === と !== の使用を強制
		},
	},
	{ ignores: ["node_modules/**", "gulpfile.js"] },
];
