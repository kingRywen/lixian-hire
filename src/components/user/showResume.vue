<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title">我的简历</div>
        <div class="md-subhead">My resume</div>
      </md-card-header>
      
      <md-card-content>
        <p>
          <span class="md-subheading">真实姓名： </span>
          <span class="md-body-1">{{ info.fullName }}</span>
        </p>
        <p>
          <span class="md-subheading">性别： </span>
          <span class="md-body-1">{{ info.sex }}</span>
        </p>
        <p>
          <span class="md-subheading">教育经历： </span>
          <span class="md-body-1">{{ info.education }}</span>
        </p>
        <p>
          <span class="md-subheading">工作经验： </span>
          <span class="md-body-1">{{ info.workingLife }}</span>
        </p>
        <p>
          <span class="md-subheading">所在城市： </span>
          <span class="md-body-1">{{ info.city }}</span>
        </p>
        <p>
          <span class="md-subheading">Email： </span>
          <span class="md-body-1">{{ info.email }}</span>
        </p>
        
      </md-card-content>
      <md-card-actions>
        <router-link tag="md-button" to="/admin/resume" class="md-raised md-primary">修改简历</router-link>
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
      this.$http.get('/api/getResume')
        .then((res) => {
          console.log(res.data)
          this.info = res.data.info
        })
    }
  }
}
</script>

