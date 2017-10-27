<template>
<div class="toggle-box">
  <div class="phone-viewport header">
    <md-toolbar>
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title" style="flex: 1">礼贤招聘</h2>

      <!-- <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <md-icon>search</md-icon>
      </md-button> -->
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
            <router-link to="/admin"><md-icon>whatshot</md-icon> <span>找工作</span></router-link>
          </md-list-item>
          <md-list-item>
            <router-link :to="resume"><md-icon>whatshot</md-icon> <span>我的简历</span></router-link>
          </md-list-item>
          <md-list-item>
            <router-link to="/mark"><md-icon>whatshot</md-icon> <span>我的收藏</span></router-link>
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
  mounted () {
    this.resume = localStorage.getItem('isEntireInfo') !== 'false' ? '/showResume' : '/resume'
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
      resume: ''
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
.header {
  z-index: 1;
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



