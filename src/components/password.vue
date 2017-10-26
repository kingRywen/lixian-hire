<template>
  <div class="toggle-box">
    <md-snackbar md-position="top center" ref="snackbar" md-duration="2000">
      <span>{{ msg }}</span>
      <md-button class="md-accent" @click="$refs.snackbar.close()">确定</md-button>
    </md-snackbar>
    <md-stepper @completed="completed()">
    <md-step :md-editable="true" md-label="第一步" :md-error="!valid" :md-continue="valid" :md-message="invalidMessage">
        <p>输入你注册时用的手机号</p>
        <md-input-container :class="{'md-input-invalid': !mailValid}">
            <md-icon>stay_primary_portrait</md-icon>
            <label>手机号</label>
            <md-input type="text" v-model="phone" required/>
        </md-input-container>
        <md-input-container :class="{'md-input-invalid': !codeValid}">
          <md-icon>stay_primary_portrait</md-icon>
          <label>验证码</label>
          <md-input type="text" v-model.number="code"></md-input>
          <md-button type="button" 
          :disabled="!btn" 
          style="width:auto;margin:0" 
          @click.native="getPhoneCode">获取验证码 {{ sen }}</md-button>
        </md-input-container>
    </md-step>
    <md-step :md-disabled="!valid" md-label="第二步" :md-continue="valid" md-button-continue="修改密码">
        <md-input-container>
            <md-icon>lock</md-icon>
            <label>新密码</label>
            <md-input type="password" v-model="password" required/>
        </md-input-container>
    </md-step>
</md-stepper>
  </div>
</template>
<script>
import debounce from 'lodash.debounce'
export default {
  data () {
    return {
      phone: '',
      mailValid: false,
      codeValid: false,
      invalidMessage: '',
      btn: true,
      sen: '',
      code: '',
      msg: '',
      password: ''
    }
  },
  methods: {
    completed () {
      console.log('completed')
      this.$http.post('/api/updatePassword', {
        password: this.password
      })
        .then((res) => {
          console.log(res.data)
          if (res.data.data.nModified === 1) {
            this.msg = '修改密码成功.'
            this.$refs.snackbar.open()
            setTimeout(() => {
              this.$router.push('/')
            }, 1000)
          }
        })
    },
    isMobile () {
      let reg = /^1[3|4|5|8][0-9]\d{4,8}$/
      if (!this.phone) {
        this.msg = '手机号码不能为空.'
        this.$refs.snackbar.open()
        return false
      }
      if (!reg.test(this.phone)) {
        this.msg = '手机号码不正确.'
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
      this.$http.post('/api/sendCodePassword', {
        phone: this.phone
      })
      .then((res) => {
        if (res.data.success) {
          // 设置按钮倒计时
          this.btn = false
          this.sen = 120
          let timer = setInterval(() => {
            this.sen--
            if (this.sen < 0) {
              clearInterval(timer)
              this.btn = true
              this.sen = null
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
    verifyCode: debounce(function () {
      console.log('校验验证码')
      this.$http.post('/api/validateCodePassword', {
        mobile: this.phone,
        code: this.code
      })
        .then((res) => {
          if (res.data.code === 200) {
            this.codeValid = true
            if (this.valid) {
              this.invalidMessage = ''
            }
          } else {
            this.codeValid = false
            this.invalidMessage = '验证码错误'
          }
        })
    }, 300)
  },
  watch: {
    phone () {
      var emailRegex = /^1[3|4|5|8][0-9]\d{4,8}$/
      this.mailValid = emailRegex.test(this.phone)
      if (this.mailValid) {
        this.invalidMessage = ''
      } else {
        this.invalidMessage = '手机号码不正确'
      }
    },
    code () {
      this.verifyCode()
      /* var codeRegex = /^\d{6}$/
      this.codeValid = codeRegex.test(this.code)
      if (this.codeValid && this.valid) {
        this.invalidMessage = ''
      } else {
        this.invalidMessage = '验证码为6位数字'
      } */
    }
  },
  computed: {
    valid () {
      return this.mailValid && this.codeValid
    }
  }
}
</script>

