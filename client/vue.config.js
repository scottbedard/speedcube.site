const production = process.env.NODE_ENV === 'production';
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  devServer: {
    disableHostCheck: true,
    public: 'http://localhost:8080',
  },
  chainWebpack(config) {
    config.plugin('html').tap(function(args) {
      Object.assign(args[0], {
          filename: '../../plugins/speedcube/speedcube/views/index.htm',
          template: 'public/index.html',
      });

      return args;
    });
  },
  configureWebpack(config) {
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
