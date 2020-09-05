## box-shadow-picker 阴影选择器

> 一个简单的阴影选择器，支持配置css3阴影

## 安装

```
nmp install box-shadow-picker 或 yarn add box-shadow-picker
```

## 使用

全局注册
```js
// main.js
import Vue from 'vue'
import BoxShadowPicker from 'box-shadow-picker'

Vue.use(BoxShadowPicker)
```
```js
<template>
  <BoxShadow v-model="value"/>
</template>
<script>
  export default {
    data () {
      return {
        value: '0 5px 0 0 #fff000 inset'
      }
    }
  }
</script>
```

## 事件

change事件
```js
<BoxShadow :value="value" @change="onChnage" />
```