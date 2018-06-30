<template>
  <div class="about">
    made by
    <br>
    박건후
    <br>
    홍경식
    <br>
    권동현
    <br>
    전수현
    <br>
    진수지
    <br>
    장수빈
    <br>
    최유진
    <br>
    (학번순)
  </div>
</template>
<script>
export default {
/* eslint-disable */
  name: 'About',
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
