<template>
  
  <div>

    <md-tabs md-fixed>
      <md-tab id="movies" md-label="职位信息">
        <md-card md-with-hover>
          <md-card-area>
            <md-list-item style="padding:24px 0">
              <div class="md-list-text-container">
                <span style="font-size:20px;line-height:24px">{{ details.name }}</span>
                <span><b class="color">{{ details.salary }}</b> | 
                  <md-icon style="font-size:16px;min-width:16px;width:16px">alarm</md-icon> 发布时间：{{ time }}</span>
                <p class="details">
                  <span>
                    <md-icon>place</md-icon>{{ details.location }}</span> |
                  <span>
                    <md-icon>av_timer</md-icon>{{ details.experience }}</span> |
                  <span>
                    <md-icon>face</md-icon>{{ details.education }}</span>
                </p>
              </div>
            </md-list-item>
            

          </md-card-area>

          <md-card-content>
            {{ details.content }}
          </md-card-content>
        </md-card>
      </md-tab>

      <md-tab id="music" md-label="投递者">
        <md-card md-with-hover v-for="(user, index) in users" :key="index">
          <md-card-header>
            <div class="md-title">{{ user.userName }}</div>
            <div class="md-subhead">{{ user.user_name }}</div>
          </md-card-header>

          <md-card-content v-if="user.resume.length">
             <p>
              <span class="md-subheading">真实姓名： </span>
              <span class="md-body-1">{{ user.resume[0].fullName }}</span>
            </p>
            <p>
              <span class="md-subheading">性别： </span>
              <span class="md-body-1">{{ user.resume[0].sex }}</span>
            </p>
            <p>
              <span class="md-subheading">教育经历： </span>
              <span class="md-body-1">{{ user.resume[0].education }}</span>
            </p>
            <p>
              <span class="md-subheading">工作经验： </span>
              <span class="md-body-1">{{ user.resume[0].workingLife }}</span>
            </p>
            <p>
              <span class="md-subheading">所在城市： </span>
              <span class="md-body-1">{{ user.resume[0].city }}</span>
            </p>
            <p>
              <span class="md-subheading">Email： </span>
              <span class="md-body-1">{{ user.resume[0].email }}</span>
            </p>
          </md-card-content>
          <md-card-content v-else>
            此用户还没有完善简历信息
          </md-card-content>
        </md-card>
      </md-tab>
    </md-tabs>

    
    
    <md-dialog-alert
      :md-content="alert.content"
      :md-ok-text="alert.ok"
      @open="onOpen"
      @close="onClose"
      ref="dialog">
    </md-dialog-alert>
  <router-link tag="md-button" style="position:fixed" :to="'/adminhire/update-job/' + $route.params.id" class="md-fab md-primary md-fab-bottom-right">
    <md-icon>edit</md-icon>
  </router-link>
  </div>

</template>
<script>
export default {
  mounted () {
    this.getData()
  },
  data () {
    return {
      details: '',
      count: '',
      companyInfo: '',
      users: '',
      alert: {
        content: '您已申请过职位，请不要重复申请',
        ok: '确认'
      }
    }
  },
  computed: {
    time () {
      if (!this.details.createDate) return
      let ms = new Date(JSON.parse(this.details.createDate))
      let year = ms.getFullYear()
      let mouth = ms.getMonth() + 1
      let day = ms.getDate()
      return `${year}-${mouth}-${day}`
    }
  },
  methods: {
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    },
    onOpen () {
      console.log('Opened')
    },
    onClose (type) {
      console.log('Closed', type)
    },
    back () {
      this.$router.go(-1)
    },
    getData () {
      this.$http.get('/api/getJobInfo', {
        params: {
          code: this.$route.params.id
        }
      })
        .then((res) => {
          this.details = res.data.info
        })
      this.$http.get('/api/getUserList', {
        params: {
          code: this.$route.params.id
        }
      })
        .then((res) => {
          console.log(res.data)
          this.users = res.data.data
        })
    }
  }
}
</script>
<style scoped>

.color {
  color: #FF5722
}
.md-list-text-container > :nth-child(3) {
    font-size: 12px;
}
.md-list-item {
  list-style: none;
}
.md-list-item a{
padding: 24px 20px
}
.details .md-icon {
  font-size: 16px;
  width: 16px;
  min-width: 16px;
}
.time{
  color: #3f51b5
}
</style>


