const production = process.env.NODE_ENV === 'production';

module.exports = {
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  overrides: [
    {
      env: {
        jest: true,
      },
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
    },
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  root: true,
  rules: {
    '@typescript-eslint/ban-ts-ignore': 0,
    'import/prefer-default-export': 0,
    'max-len': 0,
    'no-console': production ? 'warn' : 'off',
    'no-debugger': production ? 'warn' : 'off',
    'no-return-assign': 0,
    'vue/max-len': 0,
  },
};
