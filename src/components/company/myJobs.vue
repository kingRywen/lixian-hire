<template>
<div v-if="items.length">
  <md-list class="custom-list md-triple-line showItems">
    <md-subheader>我发布的职位({{ items.length }}个)</md-subheader>
    <md-list-item v-for="(item,index) in items" :key="index">
      <router-link :to="'/adminhire/edit-job/' + item._id">
        <md-avatar>
          <img :src="item.companyLogoUrl" alt="People">
        </md-avatar>

        <div class="md-list-text-container">
          <span>{{ item.name }}</span>
          <span>{{ item.salary }}</span>
          <p>{{ `${item.location} | ${item.experience} | ${item.education}` }}</p>
        </div>
        <div class="money">{{ item.money }}</div>
        <!-- <md-button class="md-icon-button md-list-action">
              
            </md-button> -->
      </router-link>

      <md-divider class="md-inset"></md-divider>
    </md-list-item>
    
  </md-list>
  <router-link tag="md-button" style="position:fixed" to="/adminhire/add" class="md-fab md-primary md-fab-bottom-right">
    <md-icon>add</md-icon>
  </router-link>
</div>
  
  <div v-else class="add-new-job">
    <div class="new-job-btn">
      <router-link tag="md-button" to="/adminhire/add" class="md-fab md-primary">
        <md-icon>add</md-icon>
      </router-link>
    </div>
    <div class="new-job-text">
      <span class="md-title">发布一个职位</span>
    </div>
    <div>
      <span class="md-caption">快速发布职位，获取更多简历</span>
    </div>
  </div>
</template>
<script>
  export default {
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        this.$http.get('/auth/get-company-job')
          .then((res) => {
            console.log(res.data)
            this.items = res.data.info
          })
      }
    },
    data () {
      return {
        items: []
      }
    }
  }
</script>
<style>
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
.add-new-job {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.new-job-text {
  margin-top: 4em
}
</style>

