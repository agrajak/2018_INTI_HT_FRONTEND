<template>

  <div id="app">
    <h1 class="display-1">INT-I HACKERTHON 2018</h1>
    <p>
      <h1 class="display-4">
        <router-link to="/index">HOME</router-link>
        <router-link to="/movie">MOVIE</router-link>
      </h1>
      <hr>

    <router-view>
    </router-view>

    <hr>
    <small>2018년 6월 30일 09시 00분 ~ ???</small>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import './assets/noty.css';
#app {
  padding:20px;
}
</style>
