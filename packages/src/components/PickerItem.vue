<!--
 * @Author: Mr Chang
 * @Date: 2020-08-26 18:29:50
 * @LastEditTime: 2020-09-04 13:44:01
 * @LastEditors: Mr Chang
 * @Description: 
 * @FilePath: \box-shadow-picker\packages\src\components\PickerItem.vue
-->
<template>
  <div
    class="picker-item-wrap"
    v-clickoutside="closePanel"
    @click="(event) => event.stopPropagation()"
  >
    <!-- 阴影显示小方块 -->
    <div class="picker-item-btn-wrap" @click="isOpen = !disabled" :class="{'disabled': disabled}">
      <div class="picker-item-btn" :style="{ boxShadow: value }"></div>
    </div>
    <!-- 阴影输入 -->
    <div class="box" v-show="isOpen">
      <div class="form-item-btn">
        <div class="btn-group">
          <button class="btn" @click="onChangeInset('')" :class="shadowValue.inset ? '': 'checked'">外阴影</button>
          <button class="btn" @click="onChangeInset('inset')"  :class="shadowValue.inset ? 'checked': ''">内阴影</button>
        </div>
      </div>
      <div class="form-item-wrap">
        <div class="form-item">
          <label class="form-label">X轴偏移</label>
          <div>
            <input
              class="my-input"
              type="number"
              :max="max"
              :min="min"
              :value="shadowValue.xOffset"
              @change="
                curryChangeNumber(
                  { max, min, key: 'shadowValue.xOffset' },
                  $event
                )
              "
            /><span class="unit-wrap">px</span>
          </div>
        </div>
        <div class="form-color-wrap">
          <input class="color-input" v-model="shadowValue.color" type="color" />
        </div>
      </div>
      <div class="form-item ">
        <label class="form-label">Y轴偏移</label>
        <div>
          <input
            class="my-input"
            type="number"
            :max="max"
            :min="min"
            :value="shadowValue.yOffset"
            @change="
              curryChangeNumber(
                { max, min, key: 'shadowValue.yOffset' },
                $event
              )
            "
          /><span class="unit-wrap">px</span>
        </div>
      </div>
      <div class="form-item">
        <label class="form-label">模糊半径</label>
        <div>
          <input
            class="my-input"
            type="number"
            :max="max"
            :min="0"
            :value="shadowValue.blur"
            @change="
              curryChangeNumber({ max, min, key: 'shadowValue.blur' }, $event)
            "
          />
          <span class="unit-wrap">px</span>
        </div>
        <input
          type="range"
          class="rangeMain"
          v-model="shadowValue.blur"
          :max="max"
        />
      </div>
      <div class="form-item">
        <label class="form-label">阴影大小</label>
        <div>
          <input
            class="my-input"
            type="number"
            :value="shadowValue.spread"
            :max="max"
            :min="0"
            @change="
              curryChangeNumber({ max, min, key: 'shadowValue.spread' }, $event)
            "
          />
          <span class="unit-wrap">px</span>
        </div>
        <input
          type="range"
          class="rangeMain"
          v-model="shadowValue.spread"
          :max="max"
          min="0"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Clickoutside from '../directives/clickoutside.js'

export default {
  props: {
    index: {
      type: Number,
    },
    value: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
      default: 20,
    },
    min: {
      type: Number,
      default: -20,
    },
  },
  directives: {
    Clickoutside,
  },
  data() {
    return {
      isOpen: false,
      shadowValue: {
        xOffset: 0,
        yOffset: 0,
        blur: 0,
        spread: 0,
        color: 'black',
        inset: ''
      },
    }
  },
  watch: {
    value: {
      handler (val) {
        if (val) {
          const [xOffset, yOffset, blur, spread, color, inset] = val.split(' ')
          Object.assign(this.shadowValue, {
            xOffset: parseFloat(xOffset),
            yOffset: parseFloat(yOffset),
            blur: parseFloat(blur),
            spread: parseFloat(spread),
            color: color,
            inset: inset ? 'inset': ''
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    changeValue() {
      const { xOffset, yOffset, blur, spread, color, inset } = this.shadowValue
      const value = `${xOffset}px ${yOffset}px ${blur}px ${spread}px ${color} ${inset}`
      this.$emit('input', value)
    },
    onChangeInset (event) {
      this.shadowValue.inset = event
    },
    curryChangeNumber({ max, min, key }, event) {
      const vildateFn = this.curryValidateNumber({ min, max })
      const keys = key.split('.')
      // keys.reduce((toatal, key) => toatal[key]) = vildateFn(event)
      const value = vildateFn(event)
      this[keys[0]][keys[1]] = value
      event.target.value = value
    },
    /**
     * 校验input 输入值
     */
    curryValidateNumber({ max, min }) {
      return (event) => {
        const value = +event.target.value
        if (isNaN(value)) {
          return 0
        } else if (value < min) {
          return min
        } else if (value > max) {
          return max
        } else {
          return value
        }
      }
    },
    /**
     * 失去焦点
     */
    closePanel() {
      this.isOpen = false
      this.changeValue()
    },
  },
}
</script>
<style lang="scss" scoped>
.picker-item-wrap {
  position: relative;
  text-align: left;
  font-size: 12px;
  display: inline-block;
  .picker-item-btn-wrap {
    &.disabled {
      opacity: 0.6;
    }
    .picker-item-btn {
      width: 48px;
      height: 24px;
      border: 1px solid #999;
      border-radius: 3px;
      background: #f8f8f8;
    }
  }
}
/** 弹窗卡片 */
.form-item-wrap {
  display: flex;
  align-items: center;
}
.mr-8 {
  margin-right: 8px;
}
.form-item {
  display: flex;
  align-items: center;
  .form-label {
    font-size: 12px;
    width: 64px;
  }
  &:not(:last-child) {
    margin-bottom: 8px;
  }
}
.form-item-btn {
  text-align: center;
}
.form-color-wrap {
  flex: 1;
  display: flex;
  justify-content: center;
  .color-input {
    height: 24px;
  }
}
.unit-wrap {
  color: #959dab;
  margin-left: 8px;
}

.box {
  position: absolute;
  width: 240px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 2px;
  margin-top: 2px;
  padding: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  color: #333;
}

.rangeMain {
  background-size: 98% 3px;
  margin: auto;
  width: 40%;
  background: linear-gradient(to right, #ccc 0%, #ccc 100%);
  outline: none;
  -webkit-appearance: none; /*清除系统默认样式*/
  height: 3px; /*横条的高度*/
}

input[type='range'].rangeMain {
  &:focus::-webkit-slider-thumb {
    border-color: #40a9ff;
    border-right-width: 1px !important;
    outline: 0;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
  &::-webkit-slider-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    -webkit-appearance: none;
    border: 0;
  }
}
.my-input {
  width: 48px;
  height: 24px;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  display: inline-block;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 12px;
  line-height: 1.5;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
  &[type='number'] {
    -moz-appearance: textfield;
  }
  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus {
    border-color: #40a9ff;
    border-right-width: 1px !important;
    outline: 0;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
}
.btn-group {
  display: inline-flex;
  margin: 0 auto 8px;
  .btn {
    position: relative;
    display: inline-block;
    height: 24px;
    margin: 0;
    padding: 0 15px;
    color: rgba(0, 0, 0, 0.65);
    line-height: 22px;
    background: #fff;
    border: 1px solid #d9d9d9;
    border-top: 1.02px solid #d9d9d9;
    border-left: 0;
    cursor: pointer;
    transition: color 0.3s, background 0.3s, border-color 0.3s;
    &.checked {
      z-index: 1;
      color: #1890ff;
      background: #fff;
      border-color: #1890ff;
      &:not(:first-child)::before {
        position: absolute;
        top: 0;
        left: -1px;
        display: block;
        width: 1px;
        height: 100%;
        background-color: #d9d9d9;
        content: '';
        background-color: #1890ff !important;
      }
    }
    &:focus {
      outline: none;
    }
    &:hover {
      color: #40a9ff;
    }
    &.checked:first-child {
      border-left-color: #1890ff;
    }
    &:first-child {
      box-shadow: none !important;
      border-left: 1px solid #d9d9d9;
      border-radius: 4px 0 0 4px;
    }
    &:last-child {
      box-shadow: none !important;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
}
</style>
