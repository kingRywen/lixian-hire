<template>
  <div>
    <md-stepper ref="step" @completed="completed()">

      <md-step md-label="发布职位" :md-error="!validJob" :md-continue="validJob" :md-message="invalidJobMessage" md-button-back="返回">
        <p>以下信息发布你的职位</p>
        <md-input-container :class="{'md-input-invalid': !nameValid}">
          <md-input type="text" v-model="name" required/>
          <label>职位名称</label>
        </md-input-container>
        <md-input-container :class="{'md-input-invalid': !salaryValid}">
          <md-input type="text" v-model="salary" required/>
          <label>薪水</label>
        </md-input-container>
        <md-input-container :class="{'md-input-invalid': !jobLocationValid}">
          <md-input type="text" v-model="jobLocation" required/>
          <label>工作地点</label>
        </md-input-container>
        <md-input-container :class="{'md-input-invalid': !experienceValid}">
          <label for="experience">经验要求</label>
          <md-select name="experience" id="experience" v-model="experience" required>
            <md-option value="应届生">应届生</md-option>
            <md-option value="工作一年">工作一年</md-option>
            <md-option value="工作三年左右">工作三年左右</md-option>
            <md-option value="工作五年左右">工作五年左右</md-option>
            <md-option value="工作十年以上">工作十年以上</md-option>
          </md-select>
        </md-input-container>
        <md-input-container :class="{'md-input-invalid': !educationValid}">
          <label for="education">文凭要求</label>
          <md-select name="education" id="education" v-model="education" required>
            <md-option value="小学以下">小学以下</md-option>
            <md-option value="中专以上">中专以上</md-option>
            <md-option value="大专以上">大专以上</md-option>
            <md-option value="本科">本科</md-option>
            <md-option value="研究生">研究生</md-option>
            <md-option value="博士">博士</md-option>
          </md-select>
        </md-input-container>
        <md-input-container :class="{'md-input-invalid': !contentValid}">
          <label>职位介绍</label>
          <md-textarea maxlength="2000" v-model="content" required></md-textarea>
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
  data () {
    return {
      alert: {
        content: '发布职位成功!',
        ok: 'Cool!'
      },
      invalidJobMessage: '',
      name: '',
      nameValid: false,
      salary: '',
      salaryValid: false,
      jobLocation: '',
      jobLocationValid: false,
      experience: '',
      experienceValid: false,
      education: '',
      educationValid: false,
      content: '',
      contentValid: false
    }
  },
  methods: {
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    },
    completed () {
      console.log('completed')
      let self = this
      let { name, salary, jobLocation, experience, education, content } = this
      self.$http.post('/auth/post-position', {
        name, salary, location: jobLocation, experience, education, content
      })
        .then((res) => {
          if (res.data.success) {
            console.log('发布职位成功')
            localStorage.setItem('isEntireInfo', 0)
            self.$router.push('/adminhire')
          } else {
            console.log('网络延时')
          }
        })
    }
  },
  watch: {
    name () {
      this.nameValid = this.name.length > 2 && this.name.trim() !== ''
      if (!this.nameValid) {
        this.invalidJobMessage = '职位名称不少于2个字符'
      } else {
        this.invalidJobMessage = ''
      }
    },
    salary () {
      this.salaryValid = this.salary.trim() !== ''
      if (!this.salaryValid) {
        this.invalidJobMessage = '薪水不能为空'
      } else {
        this.invalidJobMessage = ''
      }
    },
    jobLocation () {
      this.jobLocationValid = this.jobLocation.trim() !== ''
      if (!this.jobLocationValid) {
        this.invalidJobMessage = '工作地点不能为空'
      } else {
        this.invalidJobMessage = ''
      }
    },
    experience () {
      this.experienceValid = this.experience.length > 2 && this.experience.trim() !== ''
      if (!this.experienceValid) {
        this.invalidJobMessage = '必须选择工作经验要求'
      } else {
        this.invalidJobMessage = ''
      }
    },
    education () {
      this.educationValid = this.education.trim() !== ''
      if (!this.educationValid) {
        this.invalidJobMessage = '必须选择文凭要求'
      } else {
        this.invalidJobMessage = ''
      }
    },
    content () {
      this.contentValid = this.content.length > 2 && this.content.trim() !== ''
      if (!this.contentValid) {
        this.invalidJobMessage = '必须填入职位内容'
      } else {
        this.invalidJobMessage = ''
      }
    }
  },
  computed: {
    validJob () {
      return this.nameValid && this.salaryValid && this.jobLocationValid && this.experienceValid && this.educationValid && this.contentValid
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
