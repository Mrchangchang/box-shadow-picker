/*
 * @Author: Mr Chang
 * @Date: 2020-08-26 15:50:22
 * @LastEditTime: 2020-08-26 16:32:03
 * @LastEditors: Mr Chang
 * @Description: 
 * @FilePath: \box-shadow-picker\packages\index.js
 */
import BoxShadowPicker from './src'
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return
  Vue.component(BoxShadowPicker.name, BoxShadowPicker)
  install.installed = true
}

BoxShadowPicker.install = install

export default BoxShadowPicker