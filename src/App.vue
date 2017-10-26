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
  height: 100vh;
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
</style>
