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
    position: '',
    adminPosition: '',
    pageNum: 0
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
    },
    getAdminScroll (state) {
      state.adminPosition = document.querySelectorAll('.scroll-container')[0].scrollTop
    },
    addPageNum (state) {
      state.pageNum ++
    },
    zeroPageNum (state) {
      state.pageNum = 0
    }
  },
  actions: {
    getScrollPosition ({commit}) {
      commit('getScrollPosition')
    },
    getAdminScroll ({commit}) {
      commit('getAdminScroll')
    }
  }
})
