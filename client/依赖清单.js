/**
 * 这个文件只是记录用到的各种依赖包的作用
 * **/

/**
 * package.json
 * 项目配置文件 说明
 * **/
const packageJson = {
    "name": "react_saas",                    // 项目名字
    "description": "react",  // 项目描述
    "main": "index.js",                     // 项目入口文件（其实没用，因为配置了server.js）
    
    "dependencies": {   // 项目依赖包
        "antd": "^3.6.1", // 蚂蚁金服antd组件库
        "axios": "^0.18.0", // 封装的fetch的异步请求库
        "classnames": "^2.2.6", // 在className中添加多个属性时需用此插件封装
        "echarts": "^4.1.0", //echarts库
        "echarts-for-react": "^2.0.12-beta.0",//echarts库
        "immutable": "^3.8.2",//immutable库
        "js-md5": "^0.7.3",//md5加密
        "prop-types": "^15.6.1",
        "properties": "^1.2.1",
        "react": "^16.3.2",
        "react-dom": "^16.3.2",
        "react-redux": "^5.0.7",
        "react-router-config": "^4.4.0-beta.6",//react-router路由封装库
        "react-router-dom": "^4.3.1",
        "redux": "^4.0.0",
        "redux-actions": "^2.4.0",
        "redux-thunk": "^2.3.0",//redux中间件
},
    "devDependencies": {  // 项目开发环境依赖包
        "node-sass": "^4.11.0",// Sass 核心
        "babel-cli": "^6.26.0",
        "babel-core": "^6.26.3",// Babel 核心
        "babel-loader": "^7.1.4",  // Webpack解析器 - 用于解析项目中js的新语法
        "babel-plugin-import": "^1.7.0",// Babel插件 - 用于antd组件的按需加载（在.babelrc中配置了）
        "babel-plugin-transform-decorators-legacy": "^1.3.5", // Babel插件 - 支持ES7 修饰器语法Decorator
        "babel-plugin-transform-runtime": "^6.23.0",// Babel插件 - 所有的垫片函数将引用babel-runtime中的，避免重复编译
        "babel-preset-env": "^1.7.0",// Babel根据浏览器和运行时环境自动识别运用哪些垫片库来兼容ES6+语法
        "babel-preset-react": "^6.24.1",// Babel支持react语法
        "babel-preset-stage-0": "^6.24.1",
        "babel-runtime": "^6.26.0", // Babel垫片库，提供了各种ES6的垫片，最终会自动编译为ES5
        "clean-webpack-plugin": "^0.1.19",//webpack插件,清除之前的打包文件
        "compression-webpack-plugin": "^2.0.0",
        "cross-env": "^5.2.0",//改变环境变量的库
        "css-loader": "^0.28.11",// Webpack解析器 - 用于解析js中import的css，和css中所有url()中的路径问题
        "del-cli": "^1.1.0",
        "file-loader": "^1.1.11",// Webpack解析器 - 解析各类文件时有用，图片、音频、视频等,处理它们的相对路径问题
        "html-webpack-plugin": "^4.0.0-beta.5",// Webpack插件 - 最终打包时自动生成index.html，并自动配置index.html中的类容
        "image-webpack-loader": "^4.2.0",// Webpack解析器 - 解析各类图片
        "install": "^0.12.2",
        "less": "^2.7.2",//less核心
        "less-loader": "^4.1.0",// Webpack解析器 - 解析Less,
        "mini-css-extract-plugin": "^0.4.0",//webpack 插件 压缩css
        "npm": "^6.6.0",
        "optimize-css-assets-webpack-plugin": "^5.0.1",
        "postcss-loader": "^2.1.5",
        "react-hot-loader": "^4.5.3",//webpack 插件 热替换
        "redux-devtools-extension": "^2.13.7",
        "redux-logger": "^3.0.6", // 一个记录Redux触发的日志工具，项目中默认注释掉了，可在src/store/index.js中查看
        "resolve-url-loader": "^2.3.0",
        "sass-loader": "^7.1.0",// Webpack解析器 - 解析Sass,
        "style-loader": "^0.21.0",// Webpack解析器 - 用于将css文件的代码加入到index.html中的<style>标签里
        "url-loader": "^1.0.1",// Webpack解析器 - 用于处理一些小图片，把它们编译为base64，同时也处理它们的相对路径
        "webpack": "^4.29.0",//webpack核心
        "webpack-bundle-analyzer": "^2.13.1",
        "webpack-cli": "^3.2.1",
        "webpack-dev-server": "^3.1.4",
        "webpack-hot-middleware": "^2.24.3",
        "webpack-merge": "^4.1.2",
        "webpackbar": "^3.1.5",//webpack 打包进度插件
        "uglifyjs-webpack-plugin": "^2.1.1",//webpack插件 压缩js
    }
};

/**
 * .babelrc
 * Babel语法编译器配置文件 说明
 * **/
const babelrc = {
    "presets": [ // babel初始化设置
        "env", 
        "react",
        "stage-0"
      ],
      "plugins": [  // 所需要的插件
        "transform-runtime",// babel运行时垫片库
        "transform-decorators-legacy",// 支持修饰器语法
        ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }],// true - 加载antd的less样式文件， 'css' - 加载antd的css样式文件
        "react-hot-loader/babel"//热替换
      ]
   
};
