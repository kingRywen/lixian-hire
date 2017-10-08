import Vuex from 'vuex'
import Vue from 'vue'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    logOut () {
      console.log('退出登录')
      sessionStorage.setItem('demo-token', null)
      router.replace({
        path: '/'
      })
    }
  }
})
