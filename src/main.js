// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//webpack 一切皆可打包
import './common/stylus/index.styl'
Vue.config.productionTip = false

/* eslint-disable no-new */
// 这里挂载根组件 index.html 对应里面的el #app
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }  //里面的组件即是app.vue
})
