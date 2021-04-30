const path = require('path');

const common = require('./webpack.config.common.js');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
});
