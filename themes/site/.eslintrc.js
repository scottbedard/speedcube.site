/* eslint-disable */
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    parserOptions: {
        parser: 'babel-eslint',
    },
    root: true,
    rules: {
        'func-names': 0,
        'import/prefer-default-export': 0,
        'indent': ['error', 4],
        'max-len': 0,
        'no-console': isProduction ? 'error' : 'off',
        'no-debugger': isProduction ? 'error' : 'off',
        'object-curly-newline': 0,
    },
};
