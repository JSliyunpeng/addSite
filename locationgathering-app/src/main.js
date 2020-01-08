import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'lib-flexible'
import qs from 'qs'
import Cube from 'cube-ui'

import '../public/mui/css/mui.css'
import '../public/mui/fonts/mui.ttf'
// iconfont
import './assets/css/iconfont.css'
import '../common/data.js' // 日期格式化函数
// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import 'amfe-flexible'
import VConsole from 'vconsole'

// var vConsole = new VConsole();

Vue.use({
  VueAxios,
  axios
})
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(qs)
Vue.use(Cube)
// Vue.prototype.mui = mui

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.base = process.env.VUE_APP_BASE_URL
axios.defaults.baseURL = '/guns'


import VueClipboard from 'vue-clipboard2' // 复制链接
Vue.use(VueClipboard)

//注册全局钩子用来拦截导航

router.beforeEach((to, from, next) => {
  //获取store里面的token
  let token = store.state.token;
  //判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    if (token) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将刚刚要去的路由path作为参数，方便登录成功后直接跳转到该路由
      });
    }
  } else {
    next();
  }
});


axios.interceptors.request.use(
  config => {
    config.baseURL = '/guns'
    config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
    config.timeout = 6000
    let token = store.state.token
    if (store.state.token) { // 通过vuex state获取当前的token是否存在
      config.headers = {
        'Authorization': token,
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//在 response 拦截器实现

axios.interceptors.response.use(
  response => {
    // 定时刷新access-token
    if (response.data.code == 700) {
      // 刷新token
      store.dispatch('UserLogout')
      router.push({path: '/login'})
      alert('登录已过期,请重新登录!')
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
