<template>
  <md-list class="custom-list md-triple-line showItems" v-if="items.length">
    <md-subheader>我发布的职位(10个)</md-subheader>
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
    data () {
      return {
        items: []
      /* items: [{
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
      }] */
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

