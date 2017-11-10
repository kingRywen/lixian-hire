<template>
  <div>
    <md-list class="custom-list md-triple-line showItems">
    <md-subheader class="header">热门职位</md-subheader>
      <com-loading :loading="!items.length"></com-loading>
      <pull-to :top-load-method="refresh" @top-state-change="stateChange">
        <template slot="top-block" slot-scope="props">
          <!-- <div class="top-load-wrapper">
            <svg class="icon"
                :class="{
                    'icon-arrow': props.state === 'trigger',
                    'icon-loading': props.state === 'loading'
                }"
                aria-hidden="true">
              <use :xlink:href="iconLink"></use>
            </svg>
            {{ props.stateText }}
          </div> -->
          <div class="top-load-wrapper">
            <i class="iconfont"
              v-html="iconLink"
              :class="{
                  'icon-arrow': props.state === 'trigger',
                  'icon-loading': props.state === 'loading'
              }"
                aria-hidden="true"
            ></i>
            {{ props.stateText }}
          </div>
        </template>
        <md-list-item v-for="(item,index) in items" :key="index">
          <router-link :to="'/job-detail/' + item._id">
            <md-avatar>
              <!-- <i class="iconfont">&#xe644;</i> -->
              <img src="/static/avatar.png" alt="People">
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
      </pull-to>
    </md-list>
  </div>
</template>
<script>
import comLoading from '../loading.vue'
import PullTo from 'vue-pull-to'
export default {
  name: 'adminIndex',
  components: {
    comLoading,
    PullTo
  },
  data () {
    return {
      items: [],
      iconLink: ''
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    refresh (loaded) {
      console.log('刷新数据')
      this.$http.get('/api/jobs')
      .then((res) => {
        this.loading = false
        console.log(res.data)
        loaded('done')
        this.items = res.data
      }, err => {
        throw (err)
      })
    },
    stateChange (state) {
      if (state === 'pull' || state === 'trigger') {
        this.iconLink = '&#xe601;'
      } else if (state === 'loading') {
        this.iconLink = '&#xe62d;'
      } else if (state === 'loaded-done') {
        this.iconLink = '&#xe64c;'
      }
    },
    getData () {
      console.log('发送请求')
      this.$http.get('/api/jobs')
      .then((res) => {
        this.loading = false
        console.log(res.data)
        this.items = res.data
      }, err => {
        throw (err)
      })
    }
  }
}
</script>
<style scoped>
.header {
    z-index: 1;
    background: #fff;
}
.top-load-wrapper {
    line-height: 50px;
    text-align: center;
  }
  .icon-arrow {
    transition: .2s;
    transform: rotate(180deg);
  }
  .icon-loading {
    transform: rotate(0deg);
    animation-name: loading;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  @keyframes loading {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
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
  font-size: 12px;
  color: #ff5722
}
.sk-cube-grid {
  width: 20px;
  height: 20px;
  margin: 100px auto;
}

.sk-cube-grid .sk-cube {
  width: 33%;
  height: 33%;
  background-color: #3f51b5;
  float: left;
  -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
          animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out; 
}
.sk-cube-grid .sk-cube1 {
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s; }
.sk-cube-grid .sk-cube2 {
  -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s; }
.sk-cube-grid .sk-cube3 {
  -webkit-animation-delay: 0.4s;
          animation-delay: 0.4s; }
.sk-cube-grid .sk-cube4 {
  -webkit-animation-delay: 0.1s;
          animation-delay: 0.1s; }
.sk-cube-grid .sk-cube5 {
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s; }
.sk-cube-grid .sk-cube6 {
  -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s; }
.sk-cube-grid .sk-cube7 {
  -webkit-animation-delay: 0s;
          animation-delay: 0s; }
.sk-cube-grid .sk-cube8 {
  -webkit-animation-delay: 0.1s;
          animation-delay: 0.1s; }
.sk-cube-grid .sk-cube9 {
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s; }

@-webkit-keyframes sk-cubeGridScaleDelay {
  0%, 70%, 100% {
    -webkit-transform: scale3D(1, 1, 1);
            transform: scale3D(1, 1, 1);
  } 35% {
    -webkit-transform: scale3D(0, 0, 1);
            transform: scale3D(0, 0, 1); 
  }
}

@keyframes sk-cubeGridScaleDelay {
  0%, 70%, 100% {
    -webkit-transform: scale3D(1, 1, 1);
            transform: scale3D(1, 1, 1);
  } 35% {
    -webkit-transform: scale3D(0, 0, 1);
            transform: scale3D(0, 0, 1);
  } 
}
</style>


