module.exports = {
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{js,vue}',
        '!<rootDir>/node_modules/',
        '!<rootDir>/tests/',
        '!<rootDir>/tests_old/',
    ],
    coverageReporters: [
        'lcov',
        'text',
        'text-summary',
    ],
    moduleFileExtensions: [
        'js',
        'json',
        'jsx',
        'vue',
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    setupFiles: [
        '<rootDir>/tests/utils.js',
    ],
    snapshotSerializers: [
        'jest-serializer-vue',
    ],
    testMatch: [
        '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
    ],
    testURL: 'http://localhost/',
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!lodash-es)',
    ],
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname',
    ],
};
