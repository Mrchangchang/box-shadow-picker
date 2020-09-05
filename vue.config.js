/*
 * @Author: Mr Chang
 * @Date: 2020-08-26 15:50:36
 * @LastEditTime: 2020-09-04 14:42:43
 * @LastEditors: Mr Chang
 * @Description: 
 * @FilePath: \box-shadow-picker\vue.config.js
 */
module.exports = {
  // 修改 src 目录 为 examples 目录
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 强制内联CSS
  css: { extract: false },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
        .add('/packages')
        .end()
      .use('babel')
        .loader('babel-loader')
        .tap(options => {
          // 修改它的选项...
          return options
        }).loader('ts-loader')
  }
}
