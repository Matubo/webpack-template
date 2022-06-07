const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = function (env, argv) {
  const commonConf = common(env, argv);

  const extendedConf = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map'
  };
  return merge(commonConf, extendedConf);
};
