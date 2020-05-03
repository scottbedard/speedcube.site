/* eslint-disable */
const isProduction = process.env.NODE_ENV === 'production';
const isTesting = process.env.NODE_ENV === 'test';

module.exports = {
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    globals: {
        click: isTesting ? 'readonly' : undefined,
        input: isTesting ? 'readonly' : undefined,
        mount: isTesting ? 'readonly' : undefined,
        simulate: isTesting ? 'readonly' : undefined,
        stubRequests: isTesting ? 'readonly' : undefined,
        submit: isTesting ? 'readonly' : undefined,
        timeout: isTesting ? 'readonly' : undefined,
        user: isTesting ? 'readonly' : undefined,
    },
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
        parser: 'babel-eslint',
    },
    root: true,
    rules: {
        'arrow-body-style': 0,
        'brace-style': 0,
        'class-methods-use-this': 0,
        'func-names': 0,
        'import/prefer-default-export': 0,
        'indent': ['error', 4],
        'max-len': 0,
        'no-console': isProduction ? 'error' : 'off',
        'no-debugger': isProduction ? 'error' : 'off',
        'no-param-reassign': 0,
        'object-curly-newline': 0,
        'quotes': 0,
    },
};
