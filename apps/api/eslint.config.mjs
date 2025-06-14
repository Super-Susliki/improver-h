import globals from 'globals';
import {
  baseConfig,
  nodeConfig,
  testConfig,
} from '../../eslint.config.shared.js';

export default [
  ...baseConfig,

  {
    files: ['**/*.{ts,js}'],
    languageOptions: {
      ...nodeConfig.languageOptions,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Node.js specific rules
      ...nodeConfig.rules,

      // NestJS specific adjustments
      'no-duplicate-imports': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-explicit-any': 'warn', // More lenient for NestJS decorators
      '@typescript-eslint/no-floating-promises': 'warn', // NestJS handles promises differently
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',

      // Decorator support
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': false,
          'ts-check': false,
        },
      ],

      // NestJS commonly uses classes and decorators
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',

      // Allow console.log in Node.js development
      'no-console': 'off',

      // Import rules adjustments for NestJS
      'import/no-default-export': 'off', // NestJS modules often use default exports
      'import/prefer-default-export': 'off',

      // Class-based architecture
      'max-lines-per-function': ['warn', 100], // Controllers can be longer
    },
  },

  // Node.js config
  nodeConfig,

  // Test configuration for API tests
  {
    ...testConfig,
    files: ['**/*.spec.ts', '**/*.test.ts', 'test/**/*'],
    languageOptions: {
      ...testConfig.languageOptions,
      globals: {
        ...testConfig.languageOptions.globals,
        ...globals.node,
      },
    },
    rules: {
      ...testConfig.rules,
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'promise/always-return': 'off',
      'promise/catch-or-return': 'off',
      'max-lines-per-function': 'off', // Test files can be long
    },
  },
];
