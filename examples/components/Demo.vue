<!--
 * @Author: Mr Chang
 * @Date: 2020-08-26 16:41:43
 * @LastEditTime: 2020-09-04 12:44:27
 * @LastEditors: Mr Chang
 * @Description: 
 * @FilePath: \box-shadow-picker\examples\components\Demo.vue
-->
<template>
  <div>
    阴影
    {{value}}
    <BoxShadow v-model="value"/>
  </div>
</template>
<script>
import BoxShadow from '../../packages'
export default {
  components: {
    BoxShadow
  },
  data () {
    return {
      value: '0 5px 0 0 #fff000 inset'
    }
  }
}
</script>