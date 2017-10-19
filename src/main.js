// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import store from './store'

Vue.config.productionTip = false
Vue.config.debug = true

// 登录路由拦截
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('demo-token')
  if (to.path === '/') {
    if (token != null && token !== 'null') {
      if (localStorage.getItem('role') === '2') {
        next('/adminhire')
      } else {
        next('/admin')
      }
    }
    next()
  } else if (to.path === '/info' || to.path === '/register') {
    next()
  } else if (to.path === '/admin') {
    if (localStorage.getItem('role') === '1') {
      next()
      return
    }
    next('/')
  } else if (to.path === '/adminhire') {
    if (localStorage.getItem('role') === '2') {
      next()
      return
    }
    next('/')
  } else if (to.path === '/adminhire/add') {
    if (localStorage.getItem('isEntireInfo') !== 'false') {
      next('/adminhire/add-job')
      return
    }
    next()
  } else {
    if (token !== 'null' && token !== null) {
      next()
    } else {
      next('/')
    }
  }
})

// axios 全局配置拦截器，request 拦截器
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('demo-token')
  if (token != null && token !== 'null') { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = `token ${token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// http response 拦截器
axios.interceptors.response.use(response => {
  return response
}, err => {
  if (err.response) {
    console.log('axios: ' + err.response.status)
    switch (err.response.status) {
      case 401: // 返回 401 清除token信息并跳转到登录页面
        store.commit('logOut')
    }
    router.replace({
      path: '/'
    })
  }
  return Promise.reject(err.response.data) // 返回接口返回的错误信息
})

Vue.prototype.$http = axios
Vue.use(VueMaterial)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
