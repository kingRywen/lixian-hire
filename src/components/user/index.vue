<template>
  <div>
    <md-list class="custom-list md-triple-line showItems">
    <md-subheader>热门职位</md-subheader>
      <md-list-item v-for="(item,index) in items" :key="index">
        <router-link :to="'/job-detail/' + item._id">
          <md-avatar>
            <img src="https://placeimg.com/40/40/people/1" alt="People">
          </md-avatar>

          <div class="md-list-text-container">
            <span>{{ item.name }}</span>
            <span>{{ item.companyName }}</span>
            <p>{{ `${item.location} | ${item.education} | ${item.experience}` }}</p>
          </div>
          <div class="money">{{ item.salary }}</div>
          <!-- <md-button class="md-icon-button md-list-action">
            
          </md-button> -->
        </router-link>

        <md-divider class="md-inset"></md-divider>
      </md-list-item>
    </md-list>
  </div>
</template>
<script>
export default {
  data () {
    return {
      items: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let self = this
      console.log('发送请求')
      this.$http.get('/api/jobs')
      .then((res) => {
        console.log(res.data)
        self.items = res.data
      }, err => {
        throw (err)
      })
    }
  }
}
</script>

