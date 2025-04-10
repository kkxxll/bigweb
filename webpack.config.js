const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

debugger
const webpackConfig = {
  target: "node",
  mode: "development",
  devtool: "eval-source-map",
  entry: {
    server: path.join(__dirname, "src/index.js"),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "./dist"),
    // filename: 'index.js',
    // libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {},
        },
      },
    ],
  },
  externals: [nodeExternals()],
  plugins: [new CleanWebpackPlugin()],
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
