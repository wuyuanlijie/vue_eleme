<template lang="html">
  <div class="ratings" ref="ratings">
    <!-- 这里一定要加一层div 而且不放其他的东西 否则不能滚动 -->
    <div class="ratings-content">
      <div class="seller">
        <div class="seller-left">
          <div class="score">{{seller.score}}</div>
          综合评分
          <div class="rankRate">
            高于周边商家{{seller.rankRate}}%
          </div>
        </div>
        <div class="seller-right">
          <div class="serviceScore right-item">
            服务态度
            <star class="star" :score="seller.serviceScore" :size="36"></star>
            <span class="scoreDetail">{{seller.serviceScore}}</span>
          </div>
          <div class="foodScore right-item">
            商品评分
            <star class="star" :score="seller.foodScore" :size="36"></star>
            <span class="scoreDetail">{{seller.foodScore}}</span>
          </div>
          <div class="deliveryTime right-item">
            送达时间<span class="timeDetail">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="ratingsComment" >
        <div class="ratingsBtn border-1px">
          <button class="btn" v-for="(item,index) in btns"
          :class="[(unIdx===index?'unBtn':''),(idx===index?'active'+index:'')]"
          @click="isActive(index)">
            {{item.name}}
          </button>
        </div>
      </div>
      <ratingSelect :ratingSelect="ratingSelect"></ratingSelect>
    </div>
  </div>
</template>

<script>
import ratingSelect from '@/components/ratingSelect/ratingSelect'
import star from '@/components/star/star'
import BScroll from 'better-scroll';
const response = require('@/common/data/seller')
const ratings = require('@/common/data/ratings')

export default {
  data () {
    return {
      seller: {},
      ratings: [],
      ratingSelect: ratings.data,
      idx: 0,
      unIdx: 2
    }
  },
  created () {
    // 获取商家的信息
    this.seller = response.data
    this.ratings = ratings.data
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.ratings, {
        click: true
      })
    })
  },
  components: {
    ratingSelect,
    star
  },
  methods: {
    isActive (index) {
      this.idx = index
      if(index ==0) {
        this.ratingSelect = this.ratings
      } else if (index == 1) {
        this.ratingSelect = []
        for(let item of this.ratings) {
          if(item.score > 3){
            this.ratingSelect.push(item)
          }
        }

      } else {
        this.ratingSelect = []
        for(let item of this.ratings) {
          if(item.score <= 3){
            this.ratingSelect.push(item)
          }
        }
      }
      // 每一次点击按钮都刷新页面 这样就会有bug
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },

  },
  computed: {
    btns () {
      var all =  this.ratings.length
      var satisfyCount = 0
      var unsatisfyCount = 0
      for (let item of this.ratings) {
        if(item.score > 3) {
          satisfyCount++
        } else {
          unsatisfyCount++
        }
      }
      return [
          {'name':`全部${all}`},
          {'name':`满意${satisfyCount}`},
          {'name':`不满意${unsatisfyCount}`}]
    }

  }
}
</script>

<style lang="stylus" type="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.ratings

  position absolute
  left 0
  top  144px
  width 100%
  bottom 0
  overflow hidden
  // padding 30px 20px
  font-size 12px
  .seller
    display flex
    flex-direction row
    width 100%
    position relative
    &:after
      content ''
      position absolute
      height 15px
      width 100%
      left 0
      right 0
      bottom 0
      background #F3F5F7
    .seller-left
      padding 20px 0px 30px 20px
      flex 1
      text-align center
      width 100%
      .score
        font-size 24px
        color #FF9900
        margin-bottom 6px
      .rankRate
        font-size 12px
        color rgba(7,17,27,.6)
        margin-top 6px
        &:after
          content ''
          display block
          position absolute
          height 75px
          left 40%
          top 20px
          border-left 1px solid rgba(7,17,27,.2)
    .seller-right
      flex 2
      text-align left
      padding 25px 0px 30px 0px
      .right-item
        height 15px
        line-height 15px
        margin-top -10px
        padding: 0 0 25px 32px
        .star
          display inline-block
          padding-top 3px
          vertical-align middle
          margin-left 5px
        .scoreDetail
          vertical-align middle
          font-size 12px
          display inline-block
          margin-left 5px
          color #FF9900
        .timeDetail
          color  rgba(7,17,27,.6)
          display inline-block
          margin-left 10px
      .deliveryTime
        padding 3px 0 0px 32px

  .ratingsComment
    padding 20px 20px 15px 20px
    .ratingsBtn
      padding-bottom 10px
      border-1px(rgba(7, 17, 27, 0.1))
      .btn
        height 32px
        width 64px
        line-height 32px
        text-align center
        margin 0px 5px 10px 0px
        outline 0
        border none
        background #CCECF8
        color rgba(7,17,27,.8)
      .unBtn
        background #DBDDDF
      .active0, .active1
        background #00A0DC
        color #fff
      .active2
        background rgba(7, 17, 27, 0.5)
        color #fff




</style>
