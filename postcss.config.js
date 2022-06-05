module.exports = {
  parser: 'postcss-scss',
  plugins: [
    'postcss-preset-env',
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-mixins'),
    require('autoprefixer')
  ]
};
