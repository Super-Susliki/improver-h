import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import {
  baseConfig,
  browserConfig,
  testConfig,
} from "../../eslint.config.shared.js";

export default [
  // Extend shared configuration
  ...baseConfig,

  // React-specific configuration
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ...browserConfig.languageOptions,
      ecmaVersion: 2020,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // React hooks rules
      ...reactHooks.configs.recommended.rules,

      // React refresh rules for Vite
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Browser-specific rules
      ...browserConfig.rules,

      // React-specific adjustments
      "@typescript-eslint/no-unsafe-assignment": "warn", // More lenient for React props
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "import/no-default-export": "off", // React components often use default exports
      "prefer-const": "error",
      "no-var": "error",

      // JSX-specific rules
      "no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true, // Allow && expressions in JSX
          allowTernary: true,
        },
      ],
    },
  },

  // Browser config
  browserConfig,

  // Test configuration for React tests
  {
    ...testConfig,
    files: [
      "**/*.test.{ts,tsx}",
      "**/*.spec.{ts,tsx}",
      "src/test/**/*",
      "test/**/*",
    ],
    languageOptions: {
      ...testConfig.languageOptions,
      globals: {
        ...testConfig.languageOptions.globals,
        ...globals.browser,
      },
    },
  },
];
