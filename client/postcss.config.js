/** postcss-loader 解析器所需的配置文件 **/
module.exports = {
  // plugins: [
  //   require('autoprefixer')
  // ]
    plugins: {
      'autoprefixer': {
          browsers: ["> 5%", "ie >= 8", "Firefox < 20"] //可以都不填，用默认配置
      }
    }
};
