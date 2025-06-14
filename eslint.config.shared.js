import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";
import globals from "globals";

export const baseConfig = [
  {
    ignores: [
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/node_modules/**",
      "**/.next/**",
      "**/.cache/**",
      "**/artifacts/**",
      "**/cache/**",
      "**/typechain-types/**",
      "**/eslint.config.*",
    ],
  },

  // JavaScript base rules
  js.configs.recommended,

  // TypeScript rules
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,

  // Import/export rules
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,

  // Common TypeScript language options
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.js", "*.mjs"],
        },
        tsconfigRootDir: process.cwd(),
      },
    },
  },

  // Shared custom rules
  {
    rules: {
      // TypeScript specific rules
      "no-duplicate-imports": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/restrict-template-expressions": "warn",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
          "ts-ignore": "allow-with-description",
          "ts-nocheck": true,
          "ts-check": false,
        },
      ],

      // Import/export rules
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/no-duplicates": "error",
      "import/no-unresolved": "off", // TypeScript handles this
      "import/no-default-export": "off",
      "import/prefer-default-export": "off",
      "import/no-cycle": "error",
      "import/no-self-import": "error",

      // General JavaScript rules
      "no-console": "warn",
      "no-debugger": "error",
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error",
      "prefer-destructuring": [
        "error",
        {
          array: false,
          object: true,
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
      "no-duplicate-imports": "off", // Conflicts with import/no-duplicates
      "no-unused-expressions": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      curly: ["error", "all"],
      "no-throw-literal": "error",
      "prefer-arrow-callback": "error",
      "arrow-body-style": ["error", "as-needed"],
      "no-return-await": "off", // Conflicts with @typescript-eslint/return-await
      "@typescript-eslint/return-await": "error",

      // Code quality rules
      "max-depth": ["warn", 4],
      "max-lines": ["warn", 300],
      "max-params": ["warn", 4],
      "no-magic-numbers": "off", // Too restrictive for most use cases
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "error",
    },
  },

  // Prettier integration (must be last to override conflicting rules)
  eslintPluginPrettierRecommended,
];

// Node.js specific configuration
export const nodeConfig = {
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
  rules: {
    "no-console": "off", // Allow console in Node.js
    "import/no-nodejs-modules": "off",
  },
};

// Browser specific configuration
export const browserConfig = {
  languageOptions: {
    globals: {
      ...globals.browser,
    },
  },
  rules: {
    "no-console": "warn", // Warn about console in browser
  },
};

// Test files configuration
export const testConfig = {
  files: [
    "**/*.test.{ts,tsx,js,jsx}",
    "**/*.spec.{ts,tsx,js,jsx}",
    "**/test/**/*",
    "**/tests/**/*",
  ],
  languageOptions: {
    globals: {
      ...globals.jest,
      ...globals.mocha,
      ...globals.node,
    },
  },
  rules: {
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "max-lines-per-function": "off",
    "no-magic-numbers": "off",
  },
};
