<template>
<div class="toggle-box">
  <div class="phone-viewport header">
    <md-toolbar>
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <!-- <md-icon>menu</md-icon> -->
        <i class="iconfont md-icon md-theme-default material-icons">&#xe600;</i>
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
              <!-- <md-icon>account_circle</md-icon> -->
              <i class="iconfont md-icon md-theme-default material-icons">&#xe642;</i>
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
            <router-link to="/admin"><i class="iconfont md-icon md-theme-default material-icons">&#xe677;</i> <span>找工作</span></router-link>
          </md-list-item>
          <md-list-item>
            <router-link :to="resume"><i class="iconfont md-icon md-theme-default material-icons">&#xe69b;</i> <span>我的简历</span></router-link>
          </md-list-item>
          <md-list-item>
            <router-link to="/admin/mark"><i class="iconfont md-icon md-theme-default material-icons">&#xe666;</i> <span>我的收藏</span></router-link>
          </md-list-item>
          <md-list-item @click="exit" class="md-primary">
            <i class="iconfont md-icon md-theme-default material-icons">&#xe61d;</i> <span>退出</span>
          </md-list-item>
          
        </md-list>
      </div>

      </md-sidenav>
  </div>
  <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  
</div>
</template>
<script>
import jwt from 'jsonwebtoken'
export default {
  name: 'admin',
  mounted () {
    this.resume = localStorage.getItem('isEntireInfo') !== 'false' ? '/admin/showResume' : '/admin/resume'
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
          this.exit()
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
.md-toolbar {
  z-index:2 ;
}
.md-avatar i{
  font-size: 24px;
  line-height: 1
}
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
</style>



