import Vuex from 'vuex'
import Vue from 'vue'
import router from '../router'

Vue.use(Vuex)

function getScrollTop () {
  var scrollTop = 0
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop
  } else if (document.body) {
    scrollTop = document.body.scrollTop
  }
  return scrollTop
}

export default new Vuex.Store({
  state: {
    count: 0,
    position: ''
  },
  mutations: {
    logOut () {
      console.log('退出登录')
      localStorage.clear()
      router.replace({
        path: '/'
      })
    },
    getScrollPosition (state) {
      state.position = getScrollTop()
    }
  },
  actions: {
    getScrollPosition ({commit}) {
      commit('getScrollPosition')
    }
  }
})
