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
      </pull-to>
    </md-list>
  </div>
</template>
<script>
import comLoading from '../loading.vue'
import PullTo from 'vue-pull-to'
export default {
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
      setTimeout(() => {
        // this.dataList.reverse()
        console.log('刷新数据')
        loaded('done')
      }, 2000)
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
@font-face {
  font-family: 'iconfont';  /* project id 455025 */
  src: url('//at.alicdn.com/t/font_455025_2dgauneckhhestt9.eot');
  src: url('//at.alicdn.com/t/font_455025_2dgauneckhhestt9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_455025_2dgauneckhhestt9.woff') format('woff'),
  url('//at.alicdn.com/t/font_455025_2dgauneckhhestt9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_455025_2dgauneckhhestt9.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
}
.header {
    z-index: 222;
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


