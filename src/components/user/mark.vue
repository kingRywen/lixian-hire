<template>
  <div>
    <md-tabs class="md-transparent" md-fixed>
      <template slot="header-item" scope="props">
        <md-icon v-if="props.header.icon">{{ props.header.icon }}</md-icon>
        <template v-if="props.header.options && props.header.options.new_badge">
          <span v-if="props.header.label" class="label-with-new-badge">
            {{ props.header.label }}
            <span class="new-badge">{{ props.header.options.new_badge }}</span>
          </span>
        </template>
        <template v-else>
          <span v-if="props.header.label">{{ props.header.label }}</span>
        </template>
      </template>
      <md-tab md-icon="grade" md-label="收藏的职位">
        <md-list class="custom-list md-triple-line showItems">
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
      </md-tab>

      <md-tab md-icon="favorite" md-label="收藏的公司">
        <md-list class="custom-list md-triple-line showItems">
          <md-list-item v-for="(item,index) in itemCompanys" :key="index">
            <router-link :to="'/company/' + item._id">
              <md-avatar>
                <img src="https://placeimg.com/40/40/people/1" alt="People">
              </md-avatar>

              <div class="md-list-text-container">
                <span>{{ item.companyInfo.fullName }}</span>
                <span>{{ item.companyInfo.industry }}</span>
                <p>{{ `${item.companyInfo.location} | ${item.companyInfo.life}` }}</p>
              </div>
              <div class="money">{{ item.salary }}</div>
              <!-- <md-button class="md-icon-button md-list-action">
              
            </md-button> -->
            </router-link>

            <md-divider class="md-inset"></md-divider>
          </md-list-item>
        </md-list>
      </md-tab>

    </md-tabs>
  </div>
</template>
<script>
export default {
  mounted () {
    this.getData()
  },
  data () {
    return {
      items: '',
      itemCompanys: ''
    }
  },
  methods: {
    getData () {
      this.$http.get('/auth/getOwnMarkJob')
        .then((res) => {
          console.log(res.data)
          this.items = res.data.info
        })
      this.$http.get('/auth/getOwnMarkCompany')
        .then((res) => {
          this.itemCompanys = res.data.info
        })
    }
  }
}
</script>

