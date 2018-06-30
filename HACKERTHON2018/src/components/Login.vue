<template>
  <div class="login">
    <div v-show="!isLogged">
        <form>
            <div class="form-group">
                <label for="id">ID</label>
                <input class="form-control" id="id" aria-describedby="emailHelp" placeholder="Enter ID" v-model="id">
                <small id="emailHelp" class="form-text text-muted">개인정보 책임지지않는다.</small>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
                <small id="emailHelp" class="form-text text-muted">암호화 하지않는다.</small>
            </div>
            <button class="btn btn-primary" @click="submit">Submit</button>
        </form>
    </div>
    <div v-show="isLogged">
        이미 로그인되어있어용.
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      id: '',
      password: ''
    }
  },
  computed: {
    isLogged () {
        return this.$store.getters.isLogged
    }
  },
  methods: {
      logIn(token){
          this.$store.commit('logIn', {
              id: this.id,
              token: token
          })
      },
      submit: function(){
          var json = {
              id: this.id,
              password: this.password
          }
          this.$http.post(this.$config.targetURL+'/user/login', json)
          .then((result)=>{
              if(result.data.status == 'success'){
                  console.log('success')
                  this.logIn(result.data.token)
              }
              else {
                  console.log('error')

              }
            })
          .catch((error)=>{
            console.log('server success')
          })
      }
  }
}
</script>

<style scoped>
</style>
