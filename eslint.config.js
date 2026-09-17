const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    ignores: [
      "node_modules/**",
      "test-results/**",
      "playwright-report/**",
      "allure-results/**",
      "screenshots/**",
      "**/dist/**",
      "auth/**",
    ],
  },

  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: "latest",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
];
