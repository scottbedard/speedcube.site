const { DefinePlugin } = require('webpack');
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap(function(args) {
      Object.assign(args[0], {
        minify: Object.assign((args[0].minify || {})),
        filename: '../../plugins/speedcube/speedcube/views/index.htm',
        template: 'public/index.html',
      });

      return args;
    });
  },
  configureWebpack: {
    devServer: {
      disableHostCheck: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      public: 'http://localhost:8080',
    },
    plugins: [
      new DefinePlugin({
        '__VUE_OPTIONS_API__': JSON.stringify(true),
        '__VUE_PROD_DEVTOOLS__': JSON.stringify(true),
      }),
      new WriteFilePlugin({ test: /\.htm$/ }),
    ],
  },
  outputDir: path.resolve(__dirname, '../storage/assets'),
  publicPath: production 
    ? '/storage/assets'
    : 'http://localhost:8080/'
};
