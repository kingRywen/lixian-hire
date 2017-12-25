<template>
  <div id="app">
    <transition :name="transitionName" v-on:before-leave="beforeLeave">
        <keep-alive exclude="jobDetail|admin">
          <router-view></router-view>
        </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      transitionName: ''
    }
  },
  methods: {
    beforeLeave (to, from, next) {
      console.log(to)
      // this.$store.dispatch('getScrollPosition')
      this.$store.commit('getScrollPosition')
    }
  },
  computed: {
    localComputed () {
      return this.transitionName
    }
  },
  watch: {
    '$route' (to, from) {
      const toPath = to.path.split('/')[1]
      const fromPath = from.path.split('/')[1]
      if (toPath === '') {
        this.transitionName = 'login'
        // return
      }
      if (toPath === 'register') {
        this.transitionName = 'register'
        // return
      }
      if (fromPath === '' && toPath === ('admin' || 'adminhire')) {
        this.transitionName = 'register'
        // return
      }
      if (to.path.split('/') < from.path.split('/')) {
        this.transitionName = 'login'
      }
      if (to.path.split('/') === from.path.split('/')) {
        if (toPath === 'company') {
          this.transitionName = 'register'
        }
      }
      if (to.path.split('/') > from.path.split('/')) {
        this.transitionName = 'register'
      }
    }
  }
}
</script>

<style>
@import './common/sass/index.scss';
@import '../node_modules/vue-material/dist/vue-material.css';

body {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  max-width: 600px;
  margin: 0 auto;
}
#app {
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  position: relative;
}
.md-theme-default.md-toolbar{
  background: linear-gradient(to left,#389aef,#3f51b5);
}
.animated {
  animation-fill-mode: both;
}
.md-list-item .md-list-item-container > .md-icon:first-child {
  margin-right: 16px
}
@keyframes slideInRight {
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideOutLeft {
  from {
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(-100%, 0, 0);
  }
}

.login-enter,.login-enter-active {
  animation: slideOutLeft .25s reverse;
  position: absolute;
}
.login-leave,.login-leave-active {
  animation: slideInRight .25s reverse;
  position: absolute;
}
.register-enter,.register-enter-active {
  animation: slideInRight .25s;
  position: absolute;
}
.register-leave, .register-leave-active {
  animation: slideOutLeft .25s;
  position: absolute;
}
.register-leave .md-sidenav,.register-enter .md-sidenav,.register-leave-active .md-sidenav,.register-enter-active .md-sidenav,.login-leave .md-sidenav,.login-enter .md-sidenav,.login-leave-active .md-sidenav,.login-enter-active .md-sidenav {
  display: none;
}
.toggle-box {
  width: 100%;
  height: 100vh;
}
@font-face {font-family: "iconfont";
  src: url('/static/iconfont.eot?t=1514189294049'); /* IE9*/
  src: url('/static/iconfont.eot?t=1514189294049#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
  url('/static/iconfont.ttf?t=1514189294049') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('/static/iconfont.svg?t=1514189294049#iconfont') format('svg'); /* iOS 4.1- */
}



.iconfont {
  font-family:"iconfont" !important;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
  line-height: 1
}
.md-avatar i {
    font-size: 40px;
    line-height: 1.1;
}
</style>
