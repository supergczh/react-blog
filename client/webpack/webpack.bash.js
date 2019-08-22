const path = require("path");
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 
// const os = require('os');
// const HappyPack = require('happypack');//项目文件过大时可开启,
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  module: {
    rules: [
      {
        // .js .jsx用babel解析
        test: /\.js?$/,
        exclude: /node_modules/, // 排除不处理的目录
        include: path.resolve(__dirname, "../src"),
        // use: ['happypack/loader'],
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/"
            }
          },
          {
            loader: "image-webpack-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "",
      filename: "index.html",
      template: "public/index.html",
      chunks: ["app"],
      hash: false,
      favicon: "public/maniicon.ico" //网页icon
    }),
    // new HappyPack({
    //   loaders: ['babel-loader'],
    //   //共享进程池
    //   threadPool: happyThreadPool,
    // }),
    new WebpackBar()
  ]
};
