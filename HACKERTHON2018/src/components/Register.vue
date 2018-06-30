<template>
  <div>
    <form>
        <div class="form-group">
            <label for="id">ID</label>
            <input class="form-control" id="id" aria-describedby="emailHelp" placeholder="Enter ID" v-model="id">
        </div>
        <div class="form-group">
            <label for="id">NAME</label>
            <input class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter NAME" v-model="name">
            <small id="emailHelp" class="form-text text-muted">개인정보 책임지지않는다.</small>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
            <small id="emailHelp" class="form-text text-muted">암호화 하지않는다.</small>
        </div>
        <div class="form-group">
            <label for="password2">Password</label>
            <input type="password" class="form-control" id="password2" placeholder="Password" v-model="password2">
            <small id="emailHelp" class="form-text text-muted">암호화 하지않는다.</small>
        </div>
        {{password == password2}}
        <button class="btn btn-primary" @click="submit">Submit</button>
        </form>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Register',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      id: '',
      name: '',
      password: '',
      password2: ''
    }
  },
  methods: {
      submit: function(){
          if(this.password == this.password2){
              var json = {
                  id: this.id,
                  name: this.name,
                  password: this.password
              }
            this.$http.post(this.$config.targetURL+'/user/join', json)
            .then((result)=>{
                if(result.data.status == 'success'){
                    console.log('success')
                    this.$notice({
                        type: 'success',
                        text: '무사히 회원가입 성공!'
                    })

                }
                else {
                    console.log('error')
                }
                })
            .catch((error)=>{
                    console.log('server error')
                    this.$notice({
                        type: 'alert',
                        text: '서버에 오류가 있습니다.'
                    })

            })
          }
          else {
              console.log('비밀번호가 다른디요?')
                this.$notice({
                        type: 'alert',
                        text: '비밀번호가 일치하지 않습니다.'
                    })

          }
      }
  }
}
</script>

<style scoped>
</style>
