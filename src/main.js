// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import '../config/element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/commonality.css';

import vueSwiper from 'vue-awesome-swiper'  //引入vue-awesome-swiper
import 'swiper/dist/css/swiper.css'  //引入样式
Vue.use(vueSwiper)  //使用插件
Vue.config.productionTip = false

/* eslint-disable no-new */

router.beforeEach((to, form, next) => {
  let token = window.sessionStorage.getItem('token')
  if (to.path == '/Login') {
    return next()
  }
  if (token) {
    return next()
  } else {
    next('/Login')
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
