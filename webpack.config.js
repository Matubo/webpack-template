const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

const srcPath = path.resolve(__dirname, './src/');
const destPath = path.resolve(__dirname, './build/');
const assetsPath = './public';

module.exports = function (env, argv) {
  const result = {
    stats: {
      children: false, // disable console.info for node_modules/*
      modules: false,
      errors: true,
      errorDetails: true
    },
    entry: path.resolve(srcPath, 'index.tsx'),
    /*  devtool: 'inline-source-map', */
    /*     mode: 'development', */
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
          test: /\.tsx?$/,
          use: [
            'babel-loader',
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader', // transpile *.js, *.jsx, *.ts, *.tsx to result according to .browserlistrc and babel.config.js files
            // optional: "ifdef-loader" // prodives conditinal compilation: https://github.com/nippur72/ifdef-loader
            'eslint-loader'
          ]
        }
      ]
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html'
      }),
      new StylelintPlugin(),
      new ESLintPlugin()
    ]
  };
  return result;
};
