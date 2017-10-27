<template>
  
  <div class="toggle-box">
    <md-toolbar>
      <md-button class="md-icon-button" @click="back">
        <md-icon>navigate_before</md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1">礼贤招聘</h2>
    </md-toolbar>
    <div style="padding:16px">
    <md-card md-with-hover style="margin-bottom:20px">
      <md-card-area>
        <md-list-item style="padding:24px 0">
          <md-avatar>
            <img src="/static/avatar.png" alt="People">
          </md-avatar>

          <div class="md-list-text-container">
            <span>{{ companyInfo.fullName }}</span>
            <span style="color:#666">{{ companyInfo.industry }} | {{ companyInfo.life }}</span>
            <p class="details">
              <span class="color">
                招聘职位：{{ count }}</span>
            </p>
          </div>

          <md-button class="md-icon-button md-list-action" @click="mark">
            <md-icon :class="{'md-primary': star}">star</md-icon>
          </md-button>
        </md-list-item>
        

      </md-card-area>

      <md-card-area>
        <md-card-content>
          {{ companyInfo.email }}
        </md-card-content>
      </md-card-area>

      <md-card-content>
        <p v-html="companyInfo.introduction"></p>
      </md-card-content>
    </md-card>
    </div>

    <md-card>
      <md-card-area>
        <md-card-content>
          <div class="md-title">招聘职位</div>
        </md-card-content>
      </md-card-area>
      <md-list-item v-for="(item,index) in items" :key="index">
        <router-link :to="'/job-detail/' + item._id">
          <md-avatar>
            <img alt="People">
          </md-avatar>

          <div class="md-list-text-container">
            <span>{{ item.name }}</span>
            <span>{{ item.companyName }}</span>
            <p>{{ item.location }} | {{ item.education }} | {{ item.experience }} </p>
          </div>
          <div class="money">{{ item.salary }}</div>
          <!-- <md-button class="md-icon-button md-list-action">
            
          </md-button> -->
        </router-link>

        <md-divider class="md-inset"></md-divider>
      </md-list-item>
    </md-card>


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
      companyInfo: '',
      count: '',
      items: ''
    }
  },
  methods: {
    mark () {
      this.$http.get('/api/mark-company', {
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
      console.log(this.$route.params.id)
      this.$http.get('/api/companyInfo', {
        params: {
          code: this.$route.params.id
        }
      })
        .then((res) => {
          console.log(res)
          this.companyInfo = res.data.data[0].companyInfo
          this.count = res.data.data[0].count
          this.star = res.data.mark
        })

      this.$http.get('/api/all-company-job', {
        params: {
          code: this.$route.params.id
        }
      })
        .then((res) => {
          this.items = res.data
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
.money{
  color: #ff5722
}
</style>
