<template>
  
  <div>
    <md-toolbar>
      <md-button class="md-icon-button" @click="back">
        <md-icon>navigate_before</md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1">礼贤招聘</h2>
    </md-toolbar>

    <md-card md-with-hover style="margin-bottom:20px">
      <md-card-area>
        <md-list-item style="padding:24px 0">
          <md-avatar>
            <img src="https://placeimg.com/40/40/people/1" alt="People">
          </md-avatar>

          <div class="md-list-text-container">
            <span>应用材料（中国）有限公司</span>
            <span style="color:#666">半导体设备与零件 | 规模：500-1000人</span>
            <p class="details">
              <span class="color">
                招聘职位：25</span>
            </p>
          </div>

          <md-button class="md-icon-button md-list-action" @click="star = !star">
            <md-icon :class="{'md-primary': star}">star</md-icon>
          </md-button>
        </md-list-item>
        

      </md-card-area>

      <md-card-area>
        <md-card-content>
          五险一金 | 带薪年假 | 弹性工作 | 帅哥多 | 扁平管理 | 免费班车 | 定期体检 | 交通补助 | 精英团队 |
        </md-card-content>
      </md-card-area>

      <md-card-content>
        <p>
          Applied Materials, Inc. is the global leader in providing innovative equipment, services and software to enable the manufacture of advanced semiconductor, flat panel display and solar accessible to consumers and businesses around the world. products. Our technologies help make innovations like smartphones, flat screen TVs and solar panels more affordable and accessible to consumers and businesses around the world. 应用材料公司 ——引领行业，承诺中国 应用材料公司是全球领先的纳米制造技术企业。公司广泛的产品包括创新的设备、服务和软件，它们被应用于半导体芯片、平板显示器、太阳能电池、柔性电子产品和节能玻璃面板的制造。应用材料用纳米制造技术改善人们的生活。 自1967年成立至今四十年来，应用材料公司一直都是领导信息时代的先驱，以纳米制造技术打造世界上每一块半导体芯片和平板显示器。目前，应用材料已进入太阳能面板和玻璃面板的生产设备领域。 应用材料公司在全球14个国家和地区的生产、销售和服务机构有14，500多名员工用高科技设备来推动全球纳米技术的发展。 2011财年，应用材料公司收入达105亿美元并连续20年在半导体生产设备领域独占鳌头。 作为一家全球化的公司，应用材料公司早在1984年就在中国开始业务并且成为第一家进入中国的外资半导体生产设备供应商。应用材料公司的脚步也随着中国半导体工业和集成电路产业的发展向前迈进。应用材料公司于1997年正式在中国注册独资公司，总部设于上海浦东张江高科技园区，并在北京、天津、西安、苏州、无锡、昆山、深圳、武汉、成都、重庆和香港设有分公司或办事处。2005年6月初,应用材料公司在上海宣布成立应用材料投资（中国）有限公司，以进一步拓展业务,巩固在中国市场的领导地位。2007年3月，应用材料公司西安全球技术开发中心建成并投入使用, 这将为应用材料公司遍布于世界各地的业务提供技术和软件的支持。 应用材料公司美国财富500强公司，并在国内外均屡获殊荣，曾多次获评美国“100家最受推崇的美国公司”、“***接受少数族裔的公司”、“优秀企业公民100强”、“***雇主100强”等奖项；公司董事局主席、前任首席执行官詹姆斯·摩根先生曾获得中国政府向外籍人士颁发的最高荣誉“国家友谊奖”
        </p>
      </md-card-content>
    </md-card>

    <md-card>
      <md-card-area>
        <md-card-content>
          <div class="md-title">招聘职位</div>
        </md-card-content>
      </md-card-area>
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
    </md-card>


  </div>

</template>
<script>
export default {
  data () {
    return {
      star: false,
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
      }]
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
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
