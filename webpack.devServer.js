const { merge } = require('webpack-merge');
const dev = require('./webpack.dev');

module.exports = (env, argv) => {
  const devConf = dev(env, argv);
  const extendConf = {
    devServer: {}
  };

  return merge(devConf, extendConf);
};
