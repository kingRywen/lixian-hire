<template>
  
  <div>
    <md-toolbar>
      <md-button class="md-icon-button" @click="back">
        <md-icon>navigate_before</md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1">礼贤招聘</h2>
    </md-toolbar>

    <md-card md-with-hover style="margin-bottom:50px">
      <md-card-area>
        <md-list-item style="padding:24px 0">
          <div class="md-list-text-container">
            <span style="font-size:20px;line-height:24px">芯片模拟电路设计工程师</span>
            <span><b class="color">50万-100万</b> | 
              <md-icon style="font-size:16px;min-width:16px;width:16px">alarm</md-icon> 发布时间：2017-09-22</span>
            <p class="details">
              <span>
                <md-icon>place</md-icon>南京</span> |
              <span>
                <md-icon>av_timer</md-icon>应届生|在校生</span> |
              <span>
                <md-icon>face</md-icon>本科及以上</span>
            </p>
          </div>

          <md-button class="md-icon-button md-list-action" @click="star = !star">
            <md-icon :class="{'md-primary': star}">star</md-icon>
          </md-button>
        </md-list-item>
        

      </md-card-area>

      <md-card-area>
        <md-list-item>
         <router-link to="/company/123">
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

          <md-button class="md-icon-button md-list-action">
            <md-icon>keyboard_arrow_right</md-icon>
          </md-button>
         </router-link>
        </md-list-item>
      </md-card-area>

      <md-card-content>
        <p>主要职责：<br> 1、为客户提供技术支持及服务，包括新机台安装，设备维护，数据分析，故障处理等
          <br> 2、公司内部技术支持，装机基础分析
          <br> 3、为内外部客户提供技术培训
          <br> 4、承担公司安排的其它工作
          <br>
          <br> 岗位要求：
          <br> 1、本科学历，自动化/机电一体化/电子工程/电气工程及其自动化/机械制造及其自动化/精密仪器/光学等相关专业
          <br> 2、有效的沟通和人际交往能力
          <br> 3、较强的责任心与团队合作精神，快速学习的能力以及承受富有挑战性工作的能力
          <br> 4、良好的英语听说读写能力
          <br> 2、公司内部技术支持，装机基础分析
          <br> 3、为内外部客户提供技术培训
          <br> 4、承担公司安排的其它工作
          <br>
          <br> 岗位要求：
          <br> 1、本科学历，自动化/机电一体化/电子工程/电气工程及其自动化/机械制造及其自动化/精密仪器/光学等相关专业
          <br> 2、有效的沟通和人际交往能力
          <br> 3、较强的责任心与团队合作精神，快速学习的能力以及承受富有挑战性工作的能力
          <br> 4、良好的英语听说读写能力
        </p>

      </md-card-content>
    </md-card>
    <div class="btn-wrapper">
      <md-button href="#" class="md-raised md-primary">
        <md-icon>home</md-icon> 申请职位</md-button>
    </div>

  </div>

</template>
<script>
export default {
  data () {
    return {
      star: false
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


