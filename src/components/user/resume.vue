<template>
  <div>
    <md-stepper ref="step" @completed="completed()">

      <md-step md-label="完善简历" :md-error="!validJob" :md-continue="validJob" :md-message="invalidJobMessage" md-button-back="返回">
        <p>请完善你的简历</p>
        <md-input-container :class="{'md-input-invalid': !fullNameValid}">
          <md-input type="text" v-model="fullName" required/>
          <label>真实姓名</label>
        </md-input-container>
        <md-input-container :class="{'md-input-invalid': !sexValid}">
          <label for="sex">性别</label>
          <md-select name="sex" id="sex" v-model="sex" required>
            <md-option value="男">男</md-option>
            <md-option value="女">女</md-option>
          </md-select>
        </md-input-container>
        <md-input-container :class="{'md-input-invalid': !emailValid}">
          <md-input type="text" v-model="email" required/>
          <label>邮箱</label>
        </md-input-container>
        <md-input-container :class="{'md-input-invalid': !cityValid}">
          <md-input type="text" v-model="city" required/>
          <label>地址</label>
        </md-input-container>
        <md-input-container :class="{'md-input-invalid': !workingLifeValid}">
          <label for="workingLife">工作经验</label>
          <md-select name="workingLife" id="workingLife" v-model="workingLife" required>
            <md-option value="应届生">应届生</md-option>
            <md-option value="工作一年">工作一年</md-option>
            <md-option value="工作三年左右">工作三年左右</md-option>
            <md-option value="工作五年左右">工作五年左右</md-option>
            <md-option value="工作十年以上">工作十年以上</md-option>
          </md-select>
        </md-input-container>
        <md-input-container :class="{'md-input-invalid': !educationValid}">
          <label for="education">学历</label>
          <md-select name="education" id="education" v-model="education" required>
            <md-option value="小学以下">小学以下</md-option>
            <md-option value="中专以上">中专以上</md-option>
            <md-option value="大专以上">大专以上</md-option>
            <md-option value="本科">本科</md-option>
            <md-option value="研究生">研究生</md-option>
            <md-option value="博士">博士</md-option>
          </md-select>
        </md-input-container>
        
      </md-step>
    </md-stepper>
    <md-dialog-alert
      :md-content="alert.content"
      :md-ok-text="alert.ok"
      ref="dialog">
    </md-dialog-alert>
  </div>
</template>
<script>
export default {
  mounted () {
    this.getData()
  },
  data () {
    return {
      alert: {
        content: '更新简历成功!',
        ok: 'Cool!'
      },
      invalidJobMessage: '',
      fullName: '',
      fullNameValid: false,
      sex: '',
      sexValid: false,
      email: '',
      emailValid: false,
      city: '',
      cityValid: false,
      workingLife: '',
      workingLifeValid: false,
      education: '',
      educationValid: false
    }
  },
  methods: {
    getData () {
      this.$http.get('/api/getResume')
        .then((res) => {
          console.log(res.data)
          this.fullName = res.data.info.fullName
          this.sex = res.data.info.sex
          this.email = res.data.info.email
          this.city = res.data.info.city
          this.workingLife = res.data.info.workingLife
          this.education = res.data.info.education
        })
    },
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    },
    completed () {
      console.log('completed')
      let self = this
      let { fullName, sex, email, city, workingLife, education } = this
      self.$http.post('/auth/post-resume', {
        fullName, sex, email, city, workingLife, education
      })
        .then((res) => {
          if (res.data.success) {
            console.log('更新简历成功')
            localStorage.setItem('isEntireInfo', true)
            self.alert = {
              content: '更新简历成功!',
              ok: '确定'
            }
            self.openDialog('dialog')
          } else {
            console.log(res.data.info)
            localStorage.clear()
            self.$router.push('/')
          }
        })
    }
  },
  watch: {
    fullName () {
      this.fullNameValid = this.fullName.length > 1 && this.fullName.trim() !== ''
      if (!this.fullNameValid) {
        this.invalidJobMessage = '真实姓名不少于2个字符'
      } else {
        this.invalidJobMessage = ''
      }
    },
    sex () {
      this.sexValid = this.sex.trim() !== ''
      if (!this.sexValid) {
        this.invalidJobMessage = '性别不能为空'
      } else {
        this.invalidJobMessage = ''
      }
    },
    email () {
      var emailRegex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/

      this.emailValid = emailRegex.test(this.email)
      if (this.emailValid && this.valid) {
        this.invalidJobMessage = ''
      } else {
        this.invalidJobMessage = '邮箱格式不正确'
      }
    },
    city () {
      this.cityValid = this.city.length > 1 && this.city.trim() !== ''
      if (!this.cityValid) {
        this.invalidJobMessage = '请选择城市'
      } else {
        this.invalidJobMessage = ''
      }
    },
    workingLife () {
      this.workingLifeValid = this.workingLife.trim() !== ''
      if (!this.workingLifeValid) {
        this.invalidJobMessage = '请选择工作经验'
      } else {
        this.invalidJobMessage = ''
      }
    },
    education () {
      this.educationValid = this.education.trim() !== ''
      if (!this.educationValid) {
        this.invalidJobMessage = '请选择学历'
      } else {
        this.invalidJobMessage = ''
      }
    }
  },
  computed: {
    validJob () {
      return this.fullNameValid && this.sexValid && this.emailValid && this.cityValid && this.workingLifeValid && this.educationValid
    }
  }
}
</script>
<style>
.md-list-text-container > :nth-child(2), .md-list-text-container > :nth-child(3){
   color: rgba(255, 255, 255, 0.54);
}
.list-avator{
    list-style: none;
    margin: 0 auto;
    padding-top: 4em;
}
.title{
  display: flex;
  justify-content: center;
  align-items: center;
}
.showItems .md-list-text-container > :nth-child(2):not(:last-child) {
    color: rgba(0, 0, 0, 0.87);
    font-size: 12px;
}

.md-list-text-container > :nth-child(2), .md-list-text-container > :nth-child(3){
   color: rgba(255, 255, 255, 0.54);
}
.showItems .md-list-text-container > :nth-child(2), .md-list-text-container > :nth-child(3) {
    margin: 0;
    color: rgba(0, 0, 0, 0.54);
    font-size: 12px;
}
.list-avator{
    list-style: none;
    margin: 0 auto;
    padding-top: 4em;
}
.money{
  font-size: 12px
}
.add-new-job {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.new-job-text {
  margin-top: 4em
}
</style>
