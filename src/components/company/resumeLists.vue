<template>
  <div>
    <div class="phone-viewport">
  <md-list class="custom-list md-triple-line">
    <md-list-item>
      <md-avatar>
        <img src="/static/avatar.png" alt="People">
      </md-avatar>

      <div class="md-list-text-container">
        <span>Ali Connors</span>
        <span>Brunch this weekend?</span>
        <p>I'll be in your neighborhood doing errands...</p>
      </div>

      <md-button class="md-icon-button md-list-action">
        <md-icon class="md-primary">star</md-icon>
      </md-button>

      <md-divider class="md-inset"></md-divider>
    </md-list-item>

    
  </md-list>
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
      this.$http.get('/api/getUserList')
        .then((res) => {
          console.log(res.data)
        })
    }
  },
  data () {
    return {
      lists: ''
    }
  }
}
</script>

