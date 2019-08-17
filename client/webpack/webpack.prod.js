const merge = require("webpack-merge");
const bash = require("./webpack.bash.js");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //单独打包css
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 复制文件用
const {GenerateSW} = require('workbox-webpack-plugin');

const PUBLIC_PATH = "/";

module.exports = merge(bash, {
  output:{
    path: path.resolve(__dirname, "..", "dist"),
    filename: "js/[name]-[chunkhash:8].chunk.js",
    chunkFilename: "js/[name].[chunkhash:8].chunk.js",
    publicPath: PUBLIC_PATH
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: PUBLIC_PATH
            }
          },
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: PUBLIC_PATH
            }
          }, // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "postcss-loader",
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: PUBLIC_PATH
            }
          }, // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "postcss-loader",
          "less-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[id].[contenthash].css"
    }),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp("\\.(js|css)$"),
      threshold: 10240,
      minRatio: 0.8
    }),
    /**
     * 文件复制
     * 这里是用于把manifest.json打包时复制到/build下 （PWA）
     * **/
    new CopyWebpackPlugin([
      { from: "./public/manifest.json", to: "./manifest.json" },
    ]),
    new GenerateSW({
      swDest: 'workboxServiceWorker.js', // 注意点1: 不写这个名字, 插件默认会生成 service-worker.js 这个文件,然后不知道WHO又生成了一次service-worker.js这个文件(内容不是workbox预期), 所以webpack生成的workbox的脚本就这样被替换了! 导致插件配置好的文件其实没被写出!!!
      // 当我们每次访问网站时都会去下载这个文件，当发现文件不一致时，就会安装这个新 Service Worker ，安装成功后，它将进入等待阶段。
  
      importWorkboxFrom: 'disabled', // 可填`cdn`,`local`,`disabled`, 区别下面整理
      importScripts: 'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js', // cdn引入了workbox,这样就不用每个项目都上传
  
      // 这三个都写true
      skipWaiting: true, // 新 Service Worker 安装成功后需要进入等待阶段，skipWaiting: true 将使其跳过等待，安装成功后立即接管网站。
      clientsClaim: true, // 立即接管
      offlineGoogleAnalytics: true, // 离线也记录ga数据, 有网了再上报的意思。
      cleanupOutdatedCaches: true,  // 尝试删除老版本缓存
      // 缓存规则, 具体下面记录, 更详细的请查阅文档。 目前只缓存api
      runtimeCaching: [
        {
          urlPattern:/^https:\/\/zhanghuigcgj\.com\//,//配置要缓存地址
          handler: 'NetworkFirst',
          options: {
            cacheName: 'cached-api',
            networkTimeoutSeconds: 2,
            expiration: { 
              maxEntries: 50,
              maxAgeSeconds: 1 * 24 * 60 * 60, // 1 day
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    })
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          // 抽离第三方插件
          test: /react/, // 指定是node_modules下的第三方包
          chunks: "initial",
          name: "vendor", // 打包后的文件名，任意命名
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10
        }
      }
    },
    // runtimeChunk: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          cache: true,
          parallel: true,
          sourceMap: false,
          warnings: false,  // 在UglifyJs删除没有用到的代码时不输出警告
          compress: {
            // 删除所有的 `console` 语句，可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true
          },
          output: {
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
           assetNameRegExp: /\.css$/g,
           cssProcessorOptions: {
              safe: true,
              autoprefixer: { disable: true }, 
              mergeLonghand: false,
              discardComments: {
                removeAll: true // 移除注释
              }
          },
          canPrint: true
      })
    ]
  },
  mode: "production"
});
