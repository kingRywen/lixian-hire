<template>
  <div>
    <md-stepper ref="step" @completed="completed()">
      <md-step :md-editable="true" md-label="完善公司信息" :md-error="!valid" :md-continue="valid" :md-message="invalidMessage" md-button-back="返回" md-button-continue="下一步">
        <p>请完善以下信息以便发布职位</p>
        <md-input-container :class="{'md-input-invalid': !fullNameValid}">
          <md-input type="text" v-model="fullName" required/>
          <label>公司全称</label>
        </md-input-container>
        <md-input-container :class="{'md-input-invalid': !mailValid}">
          <md-input type="email" v-model="email" required/>
          <label>Email</label>
        </md-input-container>
        <md-input-container :class="{'md-input-invalid': !locationValid}">
          <md-input type="text" v-model="location" required/>
          <label>地址</label>
        </md-input-container>
        <!-- <md-input-container :class="{'md-input-invalid': !lifeValid}">
          <md-input type="text" v-model="life" required/>
          <label>规模</label>
        </md-input-container> -->
        <md-input-container :class="{'md-input-invalid': !lifeValid}">
          <label for="movie">规模</label>
          <md-select name="movie" id="movie" v-model="life" required>
            <md-option value="1-10人">1-10人</md-option>
            <md-option value="10-50人">10-50人</md-option>
            <md-option value="50-100人">50-100人</md-option>
            <md-option value="100-500人">100-500人</md-option>
            <md-option value="500-1000人">500-1000人</md-option>
            <md-option value="1000人以上">1000人以上</md-option>
          </md-select>
        </md-input-container>
        <md-input-container :class="{'md-input-invalid': !industryValid}">
          <md-input type="text" v-model="industry" required/>
          <label>行业</label>
        </md-input-container>
        <md-input-container :class="{'md-input-invalid': !introductionValid}">
          <label>公司简介</label>
          <md-textarea maxlength="2000" v-model="introduction" required></md-textarea>
        </md-input-container>
      </md-step>


      <md-step md-label="发布职位" :md-disabled="!valid" :md-error="!validJob" :md-continue="validJob" :md-message="invalidJobMessage" md-button-back="返回">
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
        content: 'Your post has been deleted!',
        ok: 'Cool!'
      },
      email: '',
      mailValid: false,
      invalidMessage: '',
      invalidJobMessage: '',
      fullNameValid: false,
      fullName: '',
      location: '',
      locationValid: false,
      life: '',
      lifeValid: false,
      industry: '',
      industryValid: false,
      introduction: '',
      introductionValid: false,
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
      let { fullName, email, location, life, industry, introduction, name, salary, jobLocation, experience, education, content } = this
      this.$http.post('/auth/set-company-info', {
        fullName, email, location, life, industry, introduction
      })
        .then((res) => {
          if (res.data.success) {
            console.log('完善公司信息成功')
            self.openDialog('dialog')
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
          } else {
            self.openDialog('dialog')
          }
        })
    }
  },
  watch: {
    email () {
      var emailRegex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/

      this.mailValid = emailRegex.test(this.email)
      if (this.mailValid && this.valid) {
        this.invalidMessage = ''
      } else {
        this.invalidMessage = '邮箱格式不正确'
      }
    },
    location () {
      this.locationValid = this.location.length > 3 && this.location.trim() !== ''
      if (!this.locationValid) {
        this.invalidMessage = '地址不少于4个字'
      } else {
        this.invalidMessage = ''
      }
    },
    fullName () {
      this.fullNameValid = this.fullName.length > 4 && this.fullName.trim() !== ''
      if (!this.fullNameValid) {
        this.invalidMessage = '全名不少于4个字'
      } else {
        this.invalidMessage = ''
      }
    },
    life () {
      this.lifeValid = this.life.trim() !== ''
      if (!this.lifeValid) {
        this.invalidMessage = '必须选择一个规模'
      } else {
        this.invalidMessage = ''
      }
    },
    industry () {
      this.industryValid = this.industry.trim() !== ''
      if (!this.industryValid) {
        this.invalidMessage = '请填上你的行业'
      } else {
        this.invalidMessage = ''
      }
    },
    introduction () {
      this.introductionValid = this.introduction.trim() !== ''
      if (!this.introductionValid) {
        this.invalidMessage = '公司简介'
      } else {
        this.invalidMessage = ''
      }
    },
    // 职位发布
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
    valid () {
      return this.mailValid && this.fullNameValid && this.locationValid && this.lifeValid && this.industryValid && this.introductionValid
    },
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
