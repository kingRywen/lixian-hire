<template>
  
  <div>
    <md-toolbar>
      <md-button class="md-icon-button" @click="back">
        <md-icon>navigate_before</md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1">礼贤招聘</h2>
    </md-toolbar>
    <div class="md-tab" style="padding:16px">
      <md-card md-with-hover style="margin-bottom:50px">
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

          <md-button class="md-icon-button md-list-action" @click="mark">
            <md-icon :class="{'md-primary': star}">star</md-icon>
          </md-button>
        </md-list-item>
        

      </md-card-area>

      <md-card-area>
        <md-list-item>
         <router-link :to="'/company/' + details.companyID">
          <md-avatar>
            <img src="https://placeimg.com/40/40/people/1" alt="People">
          </md-avatar>

          <div class="md-list-text-container">
            <span>{{ details.companyName }}</span>
            <span style="color:#666">{{ companyInfo.industry }} | {{ companyInfo.life }}</span>
            <p class="details">
              <span class="color">
                招聘职位：{{ count }}</span>
            </p>
          </div>

          <md-button class="md-icon-button md-list-action">
            <md-icon>keyboard_arrow_right</md-icon>
          </md-button>
         </router-link>
        </md-list-item>
      </md-card-area>

      <md-card-content>
        {{ details.content }}
      </md-card-content>
    </md-card>
    </div>
    
    <div class="btn-wrapper">
      <md-button @click="getJob" class="md-raised md-primary">
        <md-icon>home</md-icon> 申请职位</md-button>
    </div>
    <md-dialog-alert
      :md-content="alert.content"
      :md-ok-text="alert.ok"
      @open="onOpen"
      @close="onClose"
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
      star: false,
      details: '',
      count: '',
      companyInfo: '',
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
    getJob () {
      console.log('申请职位')
      this.$http.get('/api/get-job', {
        params: {
          code: this.$route.params.id
        }
      })
        .then((res) => {
          console.log(res.data)
          if (res.status === 500) {
            this.alert.content = '数据库操作失败'
            this.openDialog('dialog')
            return
          }
          this.alert.content = res.data.info
          this.openDialog('dialog')
        })
    },
    mark () {
      this.$http.get('/api/mark-job', {
        params: {
          code: this.$route.params.id
        }
      })
        .then((res) => {
          console.log(res.data)
          this.star = !!res.data
        })
    },
    back () {
      this.$router.go(-1)
    },
    getData () {
      let self = this
      console.log(self.$route.params.id)
      this.$http.get('/api/job-details', {
        params: {
          code: self.$route.params.id
        }
      })
        .then((res) => {
          self.details = res.data.data
          self.count = res.data.data2[0].count
          self.companyInfo = res.data.data2[0].companyInfo
          self.star = res.data.mark
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
.btn-wrapper{
  position: fixed;
  width: 100%;
  bottom: 0;
  right: 0;
  background: #f3f3f3;
  height: 54px;
  z-index: 222;
  border-top: 1px solid #ddd;
  text-align: center
}
.btn-wrapper a{
  width:90%;
  height:40px;
  line-height: 40px;
}
</style>


