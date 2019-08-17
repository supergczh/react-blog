
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 
const { dependencies } = require('../package.json');

module.exports = {
  mode: 'development',
  entry: {
    library: Object.keys(dependencies),
  },
  output: {
    path: path.join(__dirname, '../dll'), 
    filename: '[name]_[chunkhash:8].dll.js', 
    library: '[name]_[chunkhash:8]', 
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dll', '[name].manifest.json'),
      name: '[name]_[chunkhash:8]', 
      context: __dirname,
    }),
  ],
};
