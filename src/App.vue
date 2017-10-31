<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
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
        return
      }
      if (toPath === 'register') {
        this.transitionName = 'register'
        return
      }
      if (fromPath === '' && toPath === ('admin' || 'adminhire')) {
        this.transitionName = 'register'
        return
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
#app {
  height: 100vh
}

.animated {
  animation-fill-mode: both;
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
  animation: slideOutLeft 0.5s reverse;
  position: absolute;
}
.login-leave,.login-leave-active {
  animation: slideInRight 0.5s reverse;
  position: absolute;
}
.register-enter,.register-enter-active {
  animation: slideInRight 0.5s;
  position: absolute;
}
.register-leave, .register-leave-active {
  animation: slideOutLeft 0.5s;
  position: absolute;
}
.register-leave .md-sidenav,.register-enter .md-sidenav,.register-leave-active .md-sidenav,.register-enter-active .md-sidenav,.login-leave .md-sidenav,.login-enter .md-sidenav,.login-leave-active .md-sidenav,.login-enter-active .md-sidenav {
  display: none;
}
.toggle-box {
  width: 100vw;
  height: 100vh;
}
/* @font-face {
  src: url('//at.alicdn.com/t/font_455025_35ewc74ah0zwu3di.eot');
  src: url('//at.alicdn.com/t/font_455025_35ewc74ah0zwu3di.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_455025_35ewc74ah0zwu3di.woff') format('woff'),
  url('//at.alicdn.com/t/font_455025_35ewc74ah0zwu3di.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_455025_35ewc74ah0zwu3di.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
  line-height: 1
} */

@font-face {font-family: "iconfont";
  src: url('/static/iconfont.eot?t=1509419656723'); /* IE9*/
  src: url('/static/iconfont.eot?t=1509419656723#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
  url('/static/iconfont.ttf?t=1509419656723') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('/static/iconfont.svg?t=1509419656723#iconfont') format('svg'); /* iOS 4.1- */
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
