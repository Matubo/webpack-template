const { merge } = require('webpack-merge');
const dev = require('./webpack.dev');
const path = 'path';
const apiMocker = require('mocker-api');
const webMock = require('./webpack.mock');
const assets = require('./webpack.common').assetsPath;

module.exports = function (env, argv) {
  const devConf = dev(env, argv);
  const extendConf = {
    target: 'web',
    devServer: {
      hot: true,
      historyApiFallback: true,
      onBeforeSetupMiddleware: (devServer) => {
        apiMocker(devServer.app, webMock);
      }
    }
  };

  return merge(devConf, extendConf);
};
