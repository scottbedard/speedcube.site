module.exports = {
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript',
  ],
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  root: true,
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'no-unused-vars': 'off',
  },
};
