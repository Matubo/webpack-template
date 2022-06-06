const { merge } = require('webpack-merge');
const common = requier('./webpack.common');

module.exports = (env, argv) => {
  const commonConf = common(env, argv);
  const extendedConf = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map'
  };
  return merge(commonConf, extendedConf);
};
