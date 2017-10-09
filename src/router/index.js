import Vue from 'vue'
import Router from 'vue-router'
// @ 路径别名 alias 短路径
// 路由对应组件 页面级组件
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'

Vue.use(Router)

// 导出路由 new Router({})
export default new Router({
  // routerLink 当前路由router和path一致  输出active
  // 这里会添加类名active 表示显示此路由
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Good',
      component: goods
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/seller',
      component: seller
    }
  ]
})
