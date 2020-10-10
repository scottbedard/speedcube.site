const production = process.env.NODE_ENV === 'production';
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  devServer: {
    disableHostCheck: true,
    public: 'http://localhost:8080',
  },
  chainWebpack(config) {
    // save our entry point as a view for the plugin to serve
    config.plugin('html').tap(function(args) {
      Object.assign(args[0], {
          filename: '../../plugins/speedcube/speedcube/views/index.htm',
          template: 'public/index.html',
      });

      return args;
    });

    // auto-fix eslint errors
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .options({ fix: true });
  },
  configureWebpack() {
    if (!production) {
      return {
        devServer: {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        },
        plugins: [
          new WriteFilePlugin({ test: /\.htm$/ }),
        ],
      };
    }
  },
  publicPath: production
    ? '/client/dist/'
    : 'http://localhost:8080/',
};
