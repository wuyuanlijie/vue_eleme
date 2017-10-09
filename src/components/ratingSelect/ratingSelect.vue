<template lang="html">
  <div class="ratingSelect" >
    <div class="chooseContent border-1px" @click="chooseContent" :class="{'on':onlyContent}">
      <i class="icon-check_circle"></i>
      只看有内容的评价
    </div>
    <ul class="ratingList">
      <li class="ratingItem border-1px" v-for="item in oldRatings">

          <!--动态的属性需要：src 动态绑定数据v-on  因为这个不是固定的  -->
        <img :src="item.avatar" alt="头像" width="30px" height="30px">

        <div class="ratingDetail">
          <span class="name">{{item.username}}</span>
          <span class="rateTime">{{rateTime(item.rateTime)}}</span>
          <div class="scoreDetail">
            <star class="star" :score="item.score" :size="24"></star>
            <span class="deliveryTime">{{item.deliveryTime}}</span>
          </div>
          <div class="text" v-show="item.text">{{item.text}}</div>
          <ul class="recommend" v-show="item.recommend.length>0">
            <i class="icon-thumb_up"></i>
            <li v-for="recItem in item.recommend">
              {{recItem}}
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {formatDate} from '@/common/js/data.js';
import star from "@/components/star/star"
// 如何对数据节流！

export default {
  data () {
    return {
      onlyContent: false,
      oldRatings: this.ratingSelect
    }
  },
  props: {
    ratingSelect: {
      type: Array
    }
  },
  // 使用watch来监听数据的
  watch: {
    ratingSelect: 'chooseContent'
  },
  methods: {
    chooseContent () {
      if(this.onlyContent) {
        this.oldRatings = this.ratingSelect
      } else {
        // 用filter来过滤数组
        this.oldRatings = this.ratingSelect.filter(item=>{
          return item.text != ''
        })
      }
      this.onlyContent = !this.onlyContent
    },
    // 可以传入的一个方法 然后返回值 方法可以传参
    rateTime (time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  //这是将得到的数据进行计算并且返回的一个新的数据
  components: {
    star
  }
}
</script>

<style lang="stylus" type="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.ratingSelect
  .chooseContent
    border-1px(rgba(7, 17, 27, 0.1))
    padding 0 0 15px 20px
    font-size 12px
    color rgba(7, 17, 27, 0.5)
    //&指向上上层的选择器
    &.on
      .icon-check_circle
        color #00c850
  .icon-check_circle
    font-size 21px
    vertical-align middle

  .ratingList
    padding 0px 20px 15px 20px
    .ratingItem
      display flex
      padding 20px 0px 20px 0px
      border-1px(rgba(7, 17, 27, 0.1))
      img
        border-radius 50%
        height 30px
        width 30px
        display inline-block
        flex 1
      .ratingDetail
        flex 10
        margin-left 15px
        .name
          font-size 12px
        .rateTime
          float right
          color rgba(7, 17, 27, 0.6)
        .scoreDetail
          padding 5px 0
          .star
            display inline
          .deliveryTime
            color rgba(7, 17, 27, 0.6)
            margin-left 5px
        .text
          padding 5px 0px
          font-size 13px
          line-height 18px
        .recommend
          margin-top 5px
          i
            color #00A0DC
            font-size 13px
          li
            height 16px
            line-height 16px
            display inline-block
            min-width 30px
            padding 0px 5px
            margin-bottom 7px
            text-align center
            margin-right 20px
            color rgba(7, 17, 27, 0.6)
            border 1px solid rgba(7, 17, 27, 0.2)



</style>
