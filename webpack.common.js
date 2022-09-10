const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const srcPath = path.resolve(__dirname, './src/');
const destPath = path.resolve(__dirname, './build/');
const assetsPath = './public';
const filesThreshold = 8196;

module.exports = function (env, argv) {
  const isDevServer = env.WEBPACK_SERVE;
  const mode = argv.mode || (isDevServer ? 'development' : 'production');
  const isDevMode = mode !== 'production';

  process.env.NODE_ENV = mode;
  const result = {
    stats: {
      children: false, // disable console.info for node_modules/*
      modules: false,
      errors: true,
      errorDetails: true
    },
    entry: path.resolve(srcPath, 'index.tsx'),
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
      plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })]
    },
    output: {
      path: destPath,
      filename: '[name].js',
      chunkFilename: '[name].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.tsx?$/,
          use: ['babel-loader', 'ts-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.css$|\.scss$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
            { loader: 'postcss-loader' }
          ]
        },
        {
          test: /\.(png|jpeg|jpg|gif|jp2|webp)$/,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        // it adds custom Global definition to the project like BASE_URL for index.html
        'process.env': {
          NODE_ENV: JSON.stringify(mode),
          BASE_URL: '"/"'
        },
        'global.DEV': JSON.stringify(isDevMode),
        'global.DEBUG': JSON.stringify(false),
        'global.VERBOSE': JSON.stringify(false)
      }),
      new FriendlyErrorsWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html'
      }),
      new StylelintPlugin(),
      new ESLintPlugin({
        extensions: ['ts', 'tsx', 'js', 'jsx']
      }),
      new MiniCssExtractPlugin({
        // it extracts css-code from js into splitted file
        filename: isDevMode ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: isDevMode ? '[id].css' : '[id].[contenthash].css'
      })
    ]
  };
  return result;
};

module.exports.assetsPath = assetsPath;
module.exports.filesThreshold = filesThreshold;
