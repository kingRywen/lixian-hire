<template>
  <div id="login">
    <md-snackbar md-position="top center" ref="snackbar" md-duration="2000">
      <span>{{ msg }}</span>
      <md-button class="md-accent" @click="$refs.snackbar.close()">确定</md-button>
    </md-snackbar>
    <div id="login-title">
      <span class="md-title">礼贤招聘</span>
    </div>
    <form novalidate @submit.stop.prevent="submit">
      <md-input-container>
        <md-icon>account_circle</md-icon>
        <label>用户名</label>
        <md-input type="text" v-model="account"></md-input>
      </md-input-container>

      <md-input-container md-has-password>
        <md-icon>lock</md-icon>
        <label>密码</label>
        <md-input type="password" v-model="password"></md-input>
      </md-input-container>

    </form>
    <md-layout md-gutter>
      <md-layout md-flex="60" class="forget">
        <router-link to="/password">忘记密码？</router-link>
      </md-layout>
      <md-layout md-flex="40">
        <md-button class="md-raised md-primary login-btn" @click="loginToAdmin">登陆</md-button>
      </md-layout>
    </md-layout>
    <md-layout md-gutter class="register">
      <router-link to="/register">还没有账号？立即注册账号</router-link>
    </md-layout>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      account: '',
      password: '',
      msg: ''
    }
  },
  mounted () {
    this.$refs.snackbar.close()
  },
  methods: {
    loginToAdmin () {
      let obj = {
        name: this.account,
        password: this.password
      }
      this.$http.post('/auth/user', obj)
        .then((res) => {
          if (res.data.success) { // 如果成功登陆
            localStorage.setItem('demo-token', res.data.token) // 用localStorage存下token
            localStorage.setItem('role', res.data.role)
            localStorage.setItem('isEntireInfo', res.data.isEntireInfo)
            if (res.data.role === '1') {
              this.$router.push('/admin')
            } else {
              this.$router.push('/adminhire')
            }
            this.msg = '登陆成功.'
            console.log(this.$refs.snackbar)
            this.$refs.snackbar.open()
          } else {
            this.msg = res.data.info
            console.log(this.$refs.snackbar)
            this.$refs.snackbar.open()
            localStorage.clear()
          }
        }, (err) => {
          this.msg = '请求错误:' + err.message
          localStorage.clear()
        })
      // this.$router.push('/admin')
    }
  },
  computed: mapState([
    'count'
  ])
}
</script>

<style scoped>
#login {
  width: 100vw;
  padding: 2em;
  height: 100vh;
}

#login-title {
  width: 100%;
  min-height: 100px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: column;
  flex-flow: column;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
}

.forget {
  line-height: 3.4;
}

.login-btn {
  width: 100%;
  margin: 6px 0
}
.register {
    justify-content: center;
    align-items: center;
    height: 200px;
}
</style>

