const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

const srcPath = path.resolve(__dirname, './src/');
const destPath = path.resolve(__dirname, './build/');

module.exports = function (env, argv) {
  const result = {
    entry: path.resolve(srcPath, 'main.tsx'),
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
      static: './dist'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
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
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
      plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })]
    },
    output: {
      path: destPath,
      filename: '[name].js',
      chunkFilename: '[name].js',
      publicPath: '/'
    }
  };
  return result;
};
