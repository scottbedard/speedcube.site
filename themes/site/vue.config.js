/* eslint-disable */
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const path = require('path');
const purgecssWhitelist = require('./src/scss/whitelist');

// constants
const isTesting = process.env.NODE_ENV === 'test';

// helper function to resolve relative directories and files
const resolve = (...args) => path.resolve(__dirname, ...args);

module.exports = {
    chainWebpack(config) {
        if (isTesting) {
            // disable eslint in the test environment
            config.module.rules.delete('eslint');

            // mock all axios calls in our testing environment
            config.resolve.alias.set('axios$', resolve('./tests/unit/mocks/axios'));
        }
    },
    configureWebpack() {
        return {
            plugins: [
                // tailwind generates a ton of utility classes for us, most
                // of which are not used. purgecss is able to remove them.
                new PurgecssPlugin({
                    extractors: [
                        {
                            extensions: ['htm', 'js', 'vue'],
                            extractor: class {
                                static extract(content) {
                                    // allow tailwind special characters in classes
                                    return content.match(/[A-z0-9-:/]+/g) || [];
                                }
                            },
                        },
                    ],
                    paths: glob.sync([
                        resolve('./**/*.htm'),
                        resolve('./**/*.vue'),
                    ]),
                    whitelist: purgecssWhitelist,
                }),
            ],
        };
    },
    pluginOptions: {
        karma: {
            files: [
                resolve('./tests/unit/index.js'),
            ],
            karmaConfig: {
                browsers: [
                    'ChromeHeadless',
                ],
                coverageReporter: {
                    dir: './coverage',
                    reporters: [
                        { type: 'lcov', subdir: '.' },
                        { type: 'text-summary' },
                    ],
                },
                frameworks: [
                    'mocha',
                    'chai-dom',
                    'sinon-chai',
                ],
                reporters: [
                    'spec',
                    'coverage',
                ],
            },
        },
        moment: {
            locales: [
                'en',
            ],
        },
    },
    runtimeCompiler: isTesting,
};
