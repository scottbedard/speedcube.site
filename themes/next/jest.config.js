module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,ts,vue}',
    '!<rootDir>/node_modules/',
    '!<rootDir>/tests/',
  ],
  coverageReporters: [
    'lcov',
    'text',
    'text-summary',
  ],
  moduleNameMapper: {
    '~(.*)$': '<rootDir>/tests/$1',
  },
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!lodash-es)',
  ],
};
