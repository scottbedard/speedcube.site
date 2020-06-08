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
    'import/prefer-default-export': 0,
    'max-len': 0,
    'no-console': production ? 'warn' : 'off',
    'no-debugger': production ? 'warn' : 'off',
    'no-return-assign': 0,
    'vue/max-len': ['error', {
      'code': 80,
      'comments': 80,
      'ignoreComments': false,
      'ignoreHTMLAttributeValues': true,
      'ignoreHTMLTextContents': false,
      'ignorePattern': '',
      'ignoreRegExpLiterals': false,
      'ignoreStrings': false,
      'ignoreTemplateLiterals': false,
      'ignoreTrailingComments': false,
      'ignoreUrls': false,
      'tabWidth': 2,
      'template': 80,
  }]
  },
};
