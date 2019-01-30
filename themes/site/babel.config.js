const babelConfig = {
    plugins: [],
    presets: [
        '@vue/app',
    ],
};

//
// testing
//
if (process.env.NODE_ENV === 'test') {
    babelConfig.plugins.push('istanbul');
}

module.exports = babelConfig;
