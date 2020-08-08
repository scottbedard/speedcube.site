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
    plugins: [
      new WriteFilePlugin({ test: /\.htm$/ }),
    ],
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  outputDir: path.resolve(__dirname, '../storage/assets'),
  publicPath: production 
    ? '/storage/assets'
    : 'http://localhost:8080/'
};
