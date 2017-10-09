<template lang="html">
  <div class="">
    <!-- 组件化思维分割  最外层一定要有一个class-->
    <div class="goods">
      <!-- vue少dom操作 ref来指定一个ID  this.$refs.menuWrapper 类似dom操作 -->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <!-- $event是当前点击项 事件对象  对当前的循环li -->
          <li v-for="(item, index) in goods" class="menu-item"
          :class="{'current':currentIndex===index}" @click="selectMenu(index, $event)">
            <span class="text border-1px">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li @click="selectFood(item, $event)" v-for="item in goods" class="food-list" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item border-1px" >
                <div class="icon">
                  <img :src="food.icon" alt="" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <!-- add绑定自定义事件 this.$emit('add') -->
                    <cartcontrol @add="addFood" :food="food">

                    </cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :selectFoods="selectFoods" ref="shopcart"
        :minPrice="seller.minPrice"
        :deliveryPrice="seller.deliveryPrice"></shopcart>
    </div>
    <food :food="selectFood" ref="food" @add="addFood"></food>
  </div>
</template>

<script>
import food from '@/components/food/food'
import shopcart from '@/components/shopcart/shopcart'
import cartcontrol from '@/components/cartcontrol/cartcontrol'
// 滚动条
import BScroll from 'better-scroll'
const response = require('@/common/data/goods.json')

export default {
  data () {
    //
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  computed: { //计算属性
    currentIndex () {
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {  //里面存放了后面添加的count
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  methods: {
    selectMenu (index, event) {
      // 左边的menu，如何驱动右边的foods 进行滚动
      // index 就是 listHeight的下标
      let foodList = this.$refs.foodList
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el,300)
    },
    selectFood (food, event) {
      this.selectedFood = food
      // 获得food组件中的方法
      this.$refs.food.show()
    },
    addFood (target) {
      // console.log(target)
      this._drop(target)
    },
    _drop (target) {
      // 复杂的事情运行需要nextTick
      this.$nextTick( () => {
        // 调用组件中的方法 $ref 钩子获取当前的点击组件 使用里面的方法
        // 直接调用target
        this.$refs.shopcart.drop(target)
      })
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
        //Math.abs()是取X的绝对值
        // 监听滚动
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.foodList
      let height = 0
      this.listHeight.push(height)
      for (let item of foodList) {
        height += item.clientHeight
        this.listHeight.push(height)
      }
      // console.log(this.listHeight)
    }
  },
  components: {
    food,
    shopcart,
    cartcontrol
  },
  mounted () {  //模板编译/挂载之后 挂载完成
    // console.log(this.$refs.menuWrapper)
  },
  // 交给生命周期函数 这里是获取数据的最佳时机
  // 这里完成数据的初始化data
  created () {
    this.classMap = ['decrease','discount','special','invoice','guarantee']
    this.goods = response.data
    // this.goods 将会翻江蹈海  很耗性能、耗时间
    // 上一次更新后，再做

    //nextTick里面的代码会在DOM更新后执行 执行DOM操作
    this.$nextTick( () => {
      //初始化滚动
      this._initScroll()
      this._calculateHeight()
    })
  }
}
</script>

<style lang="stylus" type="stylesheet/stylus">
// style里面就只能用 相对定位../../
@import "../../common/stylus/mixin.styl"
.goods
  display: flex
  position: absolute
  top: 174px
  bottom: 46px
  width: 100%
  overflow: hidden
  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7
    .menu-item
      display: table
      height: 54px
      width: 56px
      padding: 0 12px
      line-height: 14px
      &.current
        position: relative
        z-index: 10
        margin-top: -1px
        background: #fff
        font-weight: 700
        .text
          border-none()
      .icon
        display: inline-block
        vertical-align: top
        width: 12px
        height: 12px
        margin-right: 2px
        background-size: 12px 12px
        background-repeat: no-repeat
        &.decrease
          bg-img('decrease_3')
        &.discount
          bg-img('discount_3')
        &.guarantee
          bg-img('guarantee_3')
        &.invoice
          bg-img('invoice_3')
        &.special
          bg-img('special_3')
      .text
        display: table-cell
        width: 56px
        vertical-align: middle
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 12px
  .foods-wrapper
    flex: 1
    .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px
      color: rgb(147, 153, 159)
      background: #f3f5f7
    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom: 0
      .icon
        flex: 0 0 57px
        margin-right: 10px
      .content
        flex: 1
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .desc, .extra
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
        .desc
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 12px

</style>
