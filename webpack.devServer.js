const { merge } = require('webpack-merge');
const dev = require('./webpack.dev');
const assets = require('./webpack.common').assetsPath;

module.exports = function (env, argv) {
  const devConf = dev(env, argv);
  const extendConf = {
    target: 'web',
    devServer: {
      hot: true
    }
  };

  return merge(devConf, extendConf);
};
