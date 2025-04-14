const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const utils = require('./utils');

debugger;
const webpackConfig = {
  target: 'node',
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    server: path.join(utils.APP_PATH, 'index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: utils.DIST_PATH
    // filename: 'index.js',
    // libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {},
        },
      },
    ],
  },
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:
          process.env.NODE_ENV === 'production' ||
          process.env.NODE_ENV === 'prod'
            ? JSON.stringify('production')
            : JSON.stringify('development'),
      },
    }),
  ],
  node: {
    global: true,
    __filename: true,
    __dirname: true,
    // console: true,
    // process: true,
    // Buffer: true,
    // setImmediate: true,
    // path: true,
  },
};

module.exports = webpackConfig;
