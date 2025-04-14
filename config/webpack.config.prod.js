const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');

const TerserWebpackPlugin = require('terser-webpack-plugin');

// 扩展生产环境配置
const prodWebpackConfig = {
  mode: 'production',
  stats: {
    children: false,
    warnings: false, // 注意：这里使用的是 stats 而不是 status
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            drop_console: false, // 是否注释掉 console
            dead_code: true, // 删除未引用的代码
            drop_debugger: true, // 删除 debugger 语句
          },
          output: {
            comments: false, // 移除所有注释
            beautify: false, // 不格式化输出
          },
          mangle: true, // 混淆变量名
        },
        parallel: true, // 开启多线程压缩
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 3,
          enforce: true,
        },
      },
    },
  },
};

// 合并配置时确保生产环境继承基础配置的所有必要字段
const webpackConfig = merge(baseWebpackConfig, {
    ...prodWebpackConfig,
    target: baseWebpackConfig.target, // 确保 target 字段存在
    devtool: 'source-map', // 生产环境推荐使用 source-map
    entry: baseWebpackConfig.entry, // 确保 entry 字段存在
    output: baseWebpackConfig.output, // 确保 output 字段存在
    module: baseWebpackConfig.module, // 确保 module 字段存在
    externals: baseWebpackConfig.externals || [], // 确保 externals 字段存在
    plugins: baseWebpackConfig.plugins || [],
    node: baseWebpackConfig.node || {},
});

module.exports = webpackConfig;
