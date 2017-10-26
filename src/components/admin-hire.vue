<template>
<div class="toggle-box">
  <div class="phone-viewport">
    <md-toolbar>
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title" style="flex: 1">礼贤招聘</h2>

    </md-toolbar>

    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container list-avator">
          <md-list-item>
            <md-avatar class="md-avatar-icon md-accent">
              <md-icon>account_circle</md-icon>
            </md-avatar>

            <div class="md-list-text-container">
              <span>{{ userName }}</span>
              <span>{{ user_name }}</span>
            </div>
          </md-list-item>
        </div>
      </md-toolbar>
      <div class="phone-viewport" @click="toggleLeftSidenav">
        <md-list>
          <md-list-item>
            <router-link to="/adminhire"><md-icon>whatshot</md-icon> <span>发布的职位</span></router-link>
          </md-list-item>
          <md-list-item>
            <router-link :to="companyto"><md-icon>whatshot</md-icon> <span>公司信息</span></router-link>
          </md-list-item>
          <md-list-item @click="exit" class="md-primary">
            <md-icon>whatshot</md-icon> <span>退出</span>
          </md-list-item>
        </md-list>
      </div>

      </md-sidenav>
  </div>
  <router-view></router-view>
</div>
</template>
<script>
import jwt from 'jsonwebtoken'

export default {
  created () {
    this.companyto = localStorage.getItem('isEntireInfo') ? '/adminhire/company-details' : '/adminhire/company-info'
    const userInfo = this.getUserInfo() // 获取用户信息
    if (userInfo != null) {
      this.userName = userInfo.name
      this.user_name = userInfo.role === '1' ? '求职者' : '招聘方'
    }
  },
  data () {
    return {
      userName: '',
      user_name: '',
      info: '',
      companyto: ''
    }
  },
  methods: {
    getUserInfo () {
      const token = localStorage.getItem('demo-token')
      if (token != null && token !== 'null') {
        let decode
        try {
          decode = jwt.verify(token, 'jiang')
          console.log(decode)
        } catch (error) {
          alert('登录超时，请重新登录')
          this.$router.push('/')
        }
        return decode
      } else {
        return null
      }
    },
    exit () {
      console.log('退出')
      this.$http.get('/api/exit')
      .then((res) => {
        localStorage.clear()
        this.$router.push('/')
      })
    },
    getJson () {
      console.log('发送请求')
      this.$http.get('/auth/user')
      .then((res) => {
        console.log(res)
        if (res.data) {
          this.info = res.data.user_name
        } else {
          this.info = '错误： ' + res.data
        }
      }, err => {
        throw (err)
      })
    },
    toggleLeftSidenav () {
      this.$refs.leftSidenav.toggle()
    }
  }
}
</script>
<style scoped>
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
</style>



