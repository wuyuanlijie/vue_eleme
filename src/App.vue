<template>
  <div>
    <!-- 这里是显示 -->
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px ">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- router-view 路由的视图  对应vue-router 单页应用的 里面的内容的切换 -->
    <!-- 显示路由视图 路由传数据 -->
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import header from '@/components/header/header.vue'
  const response = require('@/common/data/seller.json')
  export default {
    name: 'app',
    data () {
      return {
        seller: {
          // avator: "https://www.baidu.com/img/bd_logo1.png"
          id: 555409,
          avator: response.data.avatar
        }
      }
    },
    // 生命周期函数 组件创建的时候
    created () {
      //请求
      this.seller = Object.assign({} ,this.seller, response.data) //复制对象
    },
    mounted () {

    },
    components: {
      'v-header': header
    },

  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import './common/stylus/mixin.styl'
  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    border-1px(rgba(7, 17, 27, .1))
    .tab-item
      flex 1
      text-align: center
      & > a //tab-item 下面所有的a标签
        display block
        font-size 14px
        color rgb(77, 85, 93)
        &.active
          color rgb(240, 20, 20)

</style>
