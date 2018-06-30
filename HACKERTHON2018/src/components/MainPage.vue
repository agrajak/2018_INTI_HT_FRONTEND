<template>
  <div class="hello">
    시작 화면입니다.
  </div>
</template>

<script>
export default {
/* eslint-disable */
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted: function () {
    console.log(this.$config.targetURL || 'null')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
