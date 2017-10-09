<template lang="html">
  <div class="star" :class="starType">
    <span class="star-item" v-for="(itemClass, index) in itemClasses" :class="itemClass" key="index"></span>
  </div>
</template>

<script>
// 这是配置区域  常量大写
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: { //计算属性 返回数据
    starType () {
      return `star-${this.size}`
    },
    itemClasses () {
      let result = []
      // 4.0~4.4999 就是没星 4.5~4.999 就是半星
      let score = Math.floor(this.score*2)/2 //向下取整
      let hasDeciaml = score%1 !== 0  //取余数 如果存在小数就是 半颗星星 全等运算符 比较 返回布尔值
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDeciaml) {
        result.push(CLS_HALF)
      }
      // 如果为4 那么还会执行一次 之后+1 变为5 就会跳出循环
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
// 这个模块的还是需要导入的
@import "../../common/stylus/mixin.styl"
  .star
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right 0
        &.on
          bg-img('star48_on')
        &.half
          bg-img('star48_half')
        &.off
          bg-img('star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-img('star36_on')
        &.half
          bg-img('star36_half')
        &.off
          bg-img('star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-img('star24_on')
        &.half
          bg-img('star24_half')
        &.off
          bg-img('star24_off')
</style>
