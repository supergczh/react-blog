const path = require("path");
const merge = require("webpack-merge");
const bash = require("./webpack.bash.js");
const AddAssetHtmlPlugin=require("add-asset-html-webpack-plugin")
const webpack = require("webpack");

const PUBLIC_PATH = "/";

module.exports = merge(bash, {
  entry: {
    app: ["react-hot-loader/patch", "./src/index.js"],

  },
  output:{
    path: path.resolve(__dirname, "..", "dist"),
    filename: "js/bundle.js",
    publicPath: PUBLIC_PATH
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "postcss-loader",
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname,'../dll/*.dll.js') // 这个路径是你的dll文件路径 
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dll/library.manifest.json'),
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: true,
    host: "localhost",
    port: 9000,
    overlay: true,
    watchOptions: {
      poll: true
    },
    hot: true,
    quiet: false
  },
  mode: "development"
});