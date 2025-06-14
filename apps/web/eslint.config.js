import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tanstackQueryPlugin from "@tanstack/eslint-plugin-query";
import svgJsxPlugin from "eslint-plugin-svg-jsx";
import { baseConfig } from "../../eslint.config.shared.js";

export default [
  // Extend shared configuration
  ...baseConfig,

  // React configuration
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  // TanStack Query plugin configuration
  {
    plugins: {
      "@tanstack/query": tanstackQueryPlugin,
    },
    rules: tanstackQueryPlugin.configs.recommended.rules,
  },
  // SVG JSX plugin configuration
  {
    plugins: {
      "svg-jsx": svgJsxPlugin,
    },
    rules: {
      "svg-jsx/camel-case-dash": "error",
      "svg-jsx/camel-case-colon": "error",
      "svg-jsx/no-style-string": "error",
    },
  },
];
