<template>
  <div id="register">
    <md-snackbar md-position="top center" ref="snackbar" md-duration="2000">
      <span>{{ msg }}</span>
      <md-button class="md-accent" @click="$refs.snackbar.close()">确定</md-button>
    </md-snackbar>
    <div id="login-title">
      <span class="md-title">注册账户</span>
    </div>
    <form novalidate @submit.stop.prevent="submit">

      <md-input-container>
        <i class="iconfont md-icon md-theme-default material-icons">&#xe617;</i>
        <label for="country">请选择角色</label>
        <md-select class="md-input" name="country" id="country" v-model="sendInfo.role" :disabled="disabledInput">
          <md-option value="1">求职方</md-option>
          <md-option value="2">招聘方</md-option>
        </md-select>
      </md-input-container>
      <transition name="showIT">
        <md-input-container v-if="sendInfo.role">
          <i class="iconfont md-icon md-theme-default material-icons">&#xe642;</i>
          <label v-if="!sendInfo.role"></label>
          <label v-else>{{ sendInfo.role === '1' ? '请输入真实姓名' : '请输入公司名称'}}</label>
          <md-input type="text" v-model="sendInfo.userName"></md-input>
        </md-input-container>
      </transition>
            

      <md-input-container>
        <i class="iconfont md-icon md-theme-default material-icons">&#xe708;</i>
        <label>请输入手机号或坐机</label>
        <md-input type="text" @blur="isMobile" v-model="sendInfo.account"></md-input>
      </md-input-container>

      <md-input-container v-if="isCode">
        <i class="iconfont md-icon md-theme-default material-icons">&#xe708;</i>
        <label>手机验证码</label>
        <md-input type="text" v-model="sendInfo.phoneCode"></md-input><md-button type="button" :disabled="!btn" style="width:auto;margin:0" @click.native="getPhoneCode">获取验证码 {{ sen }}</md-button>
      </md-input-container>

      <md-input-container>
        <i class="iconfont md-icon md-theme-default material-icons">&#xe661;</i>
        <label>密码</label>
        <md-input :type="passwordType" v-model="sendInfo.password" ref="pass"></md-input>
        <button type="button" class="md-button md-icon-button md-toggle-password md-theme-default" tabindex="-1" @click="togglePasswordType"> 
          <i aria-hidden="true" class="iconfont md-icon md-theme-default material-icons" v-html="showPassword ? '&#xe60f;' : '&#xe68d;'"></i>
        <div class="md-ink-ripple"><div class="md-ripple" style="width: 40px; height: 40px;"></div></div>
        </button>
      </md-input-container>

      <md-input-container>
        <i class="iconfont md-icon md-theme-default material-icons">&#xe612;</i>
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
      <router-link :to="{ name: 'login', params: { id: $route.params.id }}">已经有账号？立即登录</router-link>
      
    </md-layout>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: '',
      sen: null,
      btn: true,
      captchaKey: Date.now(),
      passwordType: 'password',
      showPassword: false,
      disabledInput: true,
      sendInfo: {
        account: '',
        phoneCode: '',
        password: '',
        captcha: '',
        role: '',
        userName: ''
      }
    }
  },
  mounted () {
    this.$refs.snackbar.close()
    if (this.$route.params.id === 'index') {
      this.disabledInput = false
      return
    }
    this.sendInfo.role = this.$route.params.id === 'seeker' ? '1' : '2'
  },
  methods: {
    togglePasswordType () {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
        this.showPassword = true
      } else {
        this.passwordType = 'password'
        this.showPassword = false
      }
      this.$refs.pass.$el.focus()
    },
    isMobile () {
      let reg = /^(((0\d{2,3}-|0\d{2,3}|)\d{7,8})|(1[3584]\d{9}))$/
      if (!reg.test(this.sendInfo.account)) {
        this.msg = '手机号码不正确.'
        this.$refs.snackbar.open()
        return false
      }
      if (!this.sendInfo.account) {
        this.msg = '手机号码不能为空.'
        this.$refs.snackbar.open()
        return false
      }
      return true
    },
    getPhoneCode () {
      console.log('获取手机验证码')
      if (!this.isMobile()) {
        return
      }
      if (!this.isCode) {
        return
      }
      let self = this
      this.$http.post('/api/sendCode', {
        phone: self.sendInfo.account
      })
      .then((res) => {
        if (res.data.success) {
          this.msg = res.data.info
          this.$refs.snackbar.open()
          self.btn = false
          self.sen = 60
          let timer = setInterval(function () {
            self.sen--
            if (self.sen < 0) {
              clearInterval(timer)
              self.btn = true
              self.sen = null
            }
          }, 1000)
        } else {
          this.msg = res.data.info
          this.$refs.snackbar.open()
          return
        }
      }, (err) => {
        throw (err)
      })
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
      /* if (!obj.phoneCode) { // 取消手机验证
        this.msg = '手机验证码不能为空.'
        this.$refs.snackbar.open()
        return
      } */
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
      // 验证手机验证码是否正确
      this.$http.post('/api/validateCode', { // 取消手机验证
        mobile: this.sendInfo.account,
        code: this.sendInfo.phoneCode
      })
      .then((res) => {
        console.log(res.data)
        if (res.data.code === 200) { // 验证成功
          this.sendRegister(obj)
        } else {
          this.msg = res.data.info
          this.$refs.snackbar.open()
        }
      }, (err) => {
        this.msg = err.message
        this.$refs.snackbar.open()
        this.$router.push('/register')
      })

      // this.sendRegister(obj)
      // 验证手机验证码是否正确
      /* this.$http.post('/api/validateCode', { // 取消手机验证
        mobile: this.sendInfo.account,
        code: this.sendInfo.phoneCode
      })
      .then((res) => {
        console.log(res.data)
        if (res.data.code === 200) { // 验证成功
          this.sendRegister(obj)
        } else {
          this.msg = '手机验证码错误，请输入正确的验证码'
          this.$refs.snackbar.open()
        }
      }, (err) => {
        this.msg = err.message
        this.$refs.snackbar.open()
        this.$router.push('/register')
      }) */
      // this.$router.push('/register')
    },
    sendRegister (obj) {
      this.$http.post('/api/register', obj)
        .then((res) => {
          if (!res.data.success) {
            this.sendInfo.captcha = ''
            this.captchaKey = Date.now()
            this.$refs.input.$el.focus()
            this.msg = res.data.info
            this.$refs.snackbar.open()
          } else {
            this.msg = res.data.info
            this.$refs.snackbar.open()
            localStorage.setItem('demo-token', res.data.token)
            localStorage.setItem('role', res.data.role)
            localStorage.setItem('isEntireInfo', res.data.isEntireInfo)
            if (Number(res.data.role) === 1) {
              this.$router.push('/admin')
            } else {
              this.$router.push('/adminhire')
            }
          }
        }, (err) => {
          this.msg = '请求错误:' + err.message
          this.$refs.snackbar.open()
          localStorage.clear()
        })
    },
    reloadCaptcha () {
      this.captchaKey = Date.now()
      this.sendInfo.captcha = ''
    }
  },
  computed: {
    captchaSrc () {
      return `/api/captcha?key=${this.captchaKey}`
    },
    isCode () {
      let reg = /^1[3|4|5|8][0-9]\d{4,8}$/  // 判断是否为手机
      return reg.test(this.sendInfo.account)
    }
  }
}
</script>

<style scoped>
#register {
  width: 100%;
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
    height: 100px;
}

.showIT-enter-active, .showIT-leave-active {
  transition: all .25s ease-in-out;
  transform: rotateX(0)
}
.showIT-enter, .showIT-leave-to {
  opacity: 0;
  height: 0;
  transform: rotateX(90deg)
}
</style>

