<template>
  <div style="padding:16px">
    <md-card>
      <md-card-header>
        <div class="md-title">公司的信息</div>
        <div class="md-subhead">Company Info.</div>
      </md-card-header>
      
      <md-card-content>
        <p>
          <span class="md-subheading">公司全称: </span>
          <span class="md-body-1">{{ info.fullName }}</span>
        </p>
        <p>
          <span class="md-subheading">行业： </span>
          <span class="md-body-1">{{ info.industry }}</span>
        </p>
        <p>
          <span class="md-subheading">规模： </span>
          <span class="md-body-1">{{ info.life }}</span>
        </p>
        <p>
          <span class="md-subheading">邮箱： </span>
          <span class="md-body-1">{{ info.email }}</span> 
        </p>
        
        <p>
          <span class="md-subheading">所在城市： </span>
          <span class="md-body-1">{{ info.location }}</span>
        </p>
        <p>
          <span class="md-subheading">详细信息： </span>
          <span class="md-body-1">{{ info.introduction }}</span>
        </p>
        
      </md-card-content>
      <md-card-actions>
        <router-link tag="md-button" to="/adminhire/company-info" class="md-raised md-primary">修改信息</router-link>
      </md-card-actions>
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
      info: ''
    }
  },
  methods: {
    getData () {
      this.$http.get('/api/getCompanyDetail')
        .then((res) => {
          console.log(res.data)
          this.info = res.data.info
        })
    }
  }
}
</script>

