<template>
  <div>
    <md-stepper>
      <md-step :md-editable="true" md-label="Email" :md-error="!mailValid" :md-continue="mailValid" :md-message="invalidMessage">
        <p>Please enter your emailaddress</p>
        <md-input-container :class="{'md-input-invalid': !mailValid}">
          <md-input type="email" v-model="mail" required/>
          <label>Email</label>
        </md-input-container>
      </md-step>
      <md-step :md-disabled="!mailValid">
        <p>Yay is a valid emailadress</p>
      </md-step>
      <md-step :md-disabled="!mailValid">
        <p>This seems something important I need to fix just right before the last step.</p>
      </md-step>
    </md-stepper>
  </div>
</template>
<script>
export default {
  data () {
    return {
      mail: '',
      mailValid: false,
      invalidMessage: 'Invalid mail'
    }
  },
  watch: {
    mail () {
      var emailRegex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/

      this.mailValid = emailRegex.test(this.mail)
      if (this.mailValid) {
        this.invalidMessage = 'Valid mail'
      } else {
        this.invalidMessage = 'Invalid mail'
      }
    }
  }
}
</script>