<!--
 * @Author: Mr Chang
 * @Date: 2020-08-26 15:57:01
 * @LastEditTime: 2020-09-04 11:51:29
 * @LastEditors: Mr Chang
 * @Description:
 * @FilePath: \box-shadow-picker\packages\src\index.vue
-->
<template>
  <div>
    <div>
      <PickerItem
        :value="value"
        :disabled="disabled"
        @input="onInputValue($event, index)"
        v-for="(value, index) of itemList"
        :key="index"
      />
    </div>
  </div>
</template>
<script>
import PickerItem from './components/PickerItem'

const DefaultValue = '0 0 0 0 black'
export default {
  name: 'BoxShadowPicker',
  model: {
    prop: 'value',
    event: 'change',
  },
  components: {
    PickerItem,
  },
  props: {
    value: {
      type: String,
    },
    defalueValue: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShow: false,
      sValue: '',
      itemList: [DefaultValue],
    }
  },
  watch: {
    value: {
      handler(val, oldVal) {
        if (val === oldVal) return
        this.sValue = val
        const arr = val.split(',')
        this.itemList = arr
        // TODO 置空数组，重新赋值
      },
      immediate: true,
    },
  },
  created() {
    if (this.defalueValue && !this.value) {
      this.sValue = this.defalueValue
      this.$emit('change', this.defalueValue)
    }
  },
  methods: {
    onInputValue(event, index) {
      this.itemList.splice(index, 1, event)
      this.changeValue()
    },
    changeValue() {
      let value = this.itemList.join(',')
      this.sValue = value
      this.$emit('change', value)
    },
  },
}
</script>
<style lang="scss" scoped>
.picker-wrap {
  display: inline-block;
  position: relative;
}
</style>
