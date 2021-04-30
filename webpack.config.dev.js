const path = require('path');

const common = require('./webpack.config.common.js');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  devServer: {
    contentBase: './dist',
    writeToDisk: true,
    historyApiFallback: true,
    port: 3456,
  },
});
