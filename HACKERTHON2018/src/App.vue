<template>

  <div id="app">
    <h1 class="display-3">INT-I HACKERTHON 2018</h1>
    <p>
      <h1 class="display-4">
        <router-link to="/index">HOME</router-link>
        <router-link to="/movie">MOVIE</router-link>
        <span v-show="!isLogged">
          <router-link to="/login">LOGIN</router-link>
          <router-link to="/register">REGISTER</router-link>
        </span>
        <span v-show="isLogged">
          <small>hello. {{getId}}</small>
          <a @click="logOut">LOGOUT</a>
        </span>
      </h1>
      <hr>

    <router-view>
    </router-view>

    <hr>
    <small>2018년 6월 30일 09시 00분 ~ ???</small>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'App',
  computed: {
    isLogged() {
      return this.$store.getters.isLogged
    },
    getId(){
      return this.$store.getters.getId
    },
    getToken(){
      return this.$store.getters.getToken
    }
  },
  methods:{
    logOut: function(){
      this.$store.commit('logOut')
    }
  }
}
</script>

<style>
@import './assets/noty.css';
#app {
  padding:20px;
}
</style>
