<template>
  <div id="login">
    <md-snackbar md-position="top center" ref="snackbar" md-duration="2000">
      <span>{{ msg }}</span>
      <md-button class="md-accent" @click="$refs.snackbar.close()">确定</md-button>
    </md-snackbar>
    <div id="login-title">
      <span class="md-title">注册账户</span>
    </div>
    <form novalidate @submit.stop.prevent="submit">

      <md-input-container>
        <md-icon>account_circle</md-icon>
        <label>请输入昵称</label>
        <md-input type="text" v-model="sendInfo.userName"></md-input>
      </md-input-container>

      <md-input-container>
        <md-icon>group</md-icon>
        <label for="country">请选择角色</label>
        <md-select class="md-input" name="country" id="country" v-model="sendInfo.role">
          <md-option value="1">求职方</md-option>
          <md-option value="2">招聘方</md-option>
        </md-select>
      </md-input-container>

      <md-input-container>
        <md-icon>stay_primary_portrait</md-icon>
        <label>请输入手机号</label>
        <md-input type="text" @blur="isMobile" v-model="sendInfo.account"></md-input>
      </md-input-container>

      <md-input-container md-has-password>
        <md-icon>lock</md-icon>
        <label>密码</label>
        <md-input type="password" v-model="sendInfo.password"></md-input>
      </md-input-container>

      <md-input-container>
        <md-icon>verified_user</md-icon>
        <label>请输入验证码</label>
        <md-input type="text" v-model="sendInfo.captcha" ref="input"></md-input><img :src="captchaSrc" @click="reloadCaptcha">
      </md-input-container>

    </form>
    <md-layout md-gutter>
      <md-layout md-flex="60" class="forget">
        <!-- <a href="#">忘记密码？</a> -->
      </md-layout>
      <md-layout md-flex="40">
        <md-button class="md-raised md-primary login-btn" @click="register">注册</md-button>
      </md-layout>
    </md-layout>
    <md-layout md-gutter class="register">
      <router-link to="/">已经有账号？立即登录</router-link>
      
    </md-layout>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: '',
      captchaKey: Date.now(),
      sendInfo: {
        account: '',
        password: '',
        captcha: '',
        role: '',
        userName: ''
      }
    }
  },
  mounted () {
    this.$refs.snackbar.close()
  },
  methods: {
    isMobile () {
      let reg = /^1[3|4|5|8][0-9]\d{4,8}$/
      if (!reg.test(this.sendInfo.account)) {
        this.msg = '手机号码不正确.'
        this.$refs.snackbar.open()
        return
      }
    },
    register () {
      let { captchaKey } = this
      let reg = /^1[3|4|5|8][0-9]\d{4,8}$/
      let obj = {
        ...this.sendInfo, captchaKey
      }
      console.log(obj)
      if (!obj.userName) {
        this.msg = '昵称不能为空.'
        this.$refs.snackbar.open()
        return
      }
      if (!obj.role) {
        this.msg = '请选择一个角色.'
        this.$refs.snackbar.open()
        return
      }
      if (!obj.account) {
        this.msg = '手机号不能为空.'
        this.$refs.snackbar.open()
        return
      }
      if (!obj.password) {
        this.msg = '密码不能为空.'
        this.$refs.snackbar.open()
        return
      }
      if (!reg.test(obj.account)) {
        this.msg = '手机号码不正确.'
        this.$refs.snackbar.open()
        return
      }
      this.$http.post('/api/register', obj)
        .then((res) => {
          if (!res.data.success) {
            this.sendInfo.captcha = ''
            this.captchaKey = Date.now()
            this.$refs.input.$el.focus()
            this.msg = '验证码输入错误.'
            this.$refs.snackbar.open()
          } else {
            this.msg = res.data.info
            this.$refs.snackbar.open()
            sessionStorage.setItem('demo-token', res.data.token)
            this.$router.push('/admin')
          }
        }, (err) => {
          this.msg = '请求错误:' + err.message
          sessionStorage.setItem('demo-token', null)
        })
      // this.$router.push('/register')
    },
    reloadCaptcha () {
      this.captchaKey = Date.now()
      this.sendInfo.captcha = ''
    }
  },
  computed: {
    captchaSrc () {
      return `/api/captcha?key=${this.captchaKey}`
    }
  }
}
</script>

<style scoped>
#login {
  padding: 2em
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
    height: 100px;
}
</style>

