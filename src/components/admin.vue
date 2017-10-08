<template>
<div>
  <div class="phone-viewport">
    <md-toolbar>
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title" style="flex: 1">礼贤招聘</h2>

      <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <md-icon>search</md-icon>
      </md-button>
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
      <div class="phone-viewport">
        <md-list>
          <md-list-item>
            <router-link to="/"><md-icon>whatshot</md-icon> <span>我的简历</span></router-link>
          </md-list-item>
          <md-list-item>
            <router-link to="/"><md-icon>whatshot</md-icon> <span>投递状态</span></router-link>
          </md-list-item>
          <md-list-item>
            <router-link to="/"><md-icon>whatshot</md-icon> <span>我的收藏</span></router-link>
          </md-list-item>
        </md-list>
      </div>

      </md-sidenav>
  </div>


  <md-list class="custom-list md-triple-line showItems">
      <md-list-item v-for="(item,index) in items" :key="index">
        <router-link :to="'/job-detail/' + item.id">
          <md-avatar>
            <img :src="item.companyLogoUrl" alt="People">
          </md-avatar>

          <div class="md-list-text-container">
            <span>{{ item.job }}</span>
            <span>{{ item.companyName }}</span>
            <p>{{ item.tags.join('|') }}</p>
          </div>
          <div class="money">{{ item.money }}</div>
          <!-- <md-button class="md-icon-button md-list-action">
            
          </md-button> -->
        </router-link>

        <md-divider class="md-inset"></md-divider>
      </md-list-item>

    </md-list>
</div>
</template>
<script>
import jwt from 'jsonwebtoken'

export default {
  created () {
    const userInfo = this.getUserInfo() // 获取用户信息
    if (userInfo != null) {
      console.log(userInfo)
      this.userName = userInfo.userName
      this.user_name = userInfo.user_name
    }
  },
  data () {
    return {
      userName: '',
      user_name: '',
      info: '',
      items: [{
        id: 123,
        companyLogoUrl: 'https://placeimg.com/40/40/people/1',
        companyName: '应用材料（中国）有限公司',
        job: '芯片模拟电路设计工程师',
        tags: ['上海', '应届生', '在校生', '本科及以上', '全职'],
        money: '50万-100万'
      },
      {
        id: 123,
        companyLogoUrl: 'https://placeimg.com/40/40/people/1',
        companyName: '应用材料（中国）有限公司',
        job: '芯片模拟电路设计工程师',
        tags: ['上海', '应届生', '在校生', '本科及以上', '全职'],
        money: '50万-100万'
      },
      {
        id: 123,
        companyLogoUrl: 'https://placeimg.com/40/40/people/1',
        companyName: '应用材料（中国）有限公司',
        job: '芯片模拟电路设计工程师',
        tags: ['上海', '应届生', '在校生', '本科及以上', '全职'],
        money: '50万-100万'
      },
      {
        id: 123,
        companyLogoUrl: 'https://placeimg.com/40/40/people/1',
        companyName: '应用材料（中国）有限公司',
        job: '芯片模拟电路设计工程师',
        tags: ['上海', '应届生', '在校生', '本科及以上', '全职'],
        money: '50万-100万'
      },
      {
        id: 123,
        companyLogoUrl: 'https://placeimg.com/40/40/people/1',
        companyName: '应用材料（中国）有限公司',
        job: '芯片模拟电路设计工程师',
        tags: ['上海', '应届生', '在校生', '本科及以上', '全职'],
        money: '50万-100万'
      },
      {
        id: 123,
        companyLogoUrl: 'https://placeimg.com/40/40/people/1',
        companyName: '应用材料（中国）有限公司',
        job: '芯片模拟电路设计工程师',
        tags: ['上海', '应届生', '在校生', '本科及以上', '全职'],
        money: '50万-100万'
      }]
    }
  },
  methods: {
    getUserInfo () {
      const token = sessionStorage.getItem('demo-token')
      if (token != null && token !== 'null') {
        let decode
        try {
          decode = jwt.verify(token, 'jiang')
          console.log(decode)
        } catch (error) {
          alert('登录未知错误')
          this.$router.push('/')
        }
        return decode
      } else {
        return null
      }
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



