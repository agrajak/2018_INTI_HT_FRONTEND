<template>
  <div id="MoviePage">
      <button type="button" class="btn btn-outline-primary">INSERT</button>

    <div id="aa">
        <button type="button" class="btn btn-primary" @click="getMovies">새로고침</button>
    </div>
    <div class="d-flex align-content-start flex-wrap">
        <div v-for="(movie, index) in movies" v-bind:key="index" class="card movie-box" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">{{movie.title}}</h5>
                <p class="card-text">{{movie.content}}</p>
                <a href="#" class="btn btn-outline-primary">DEL</a>
                <a href="#" class="btn btn-outline-primary">MOD</a>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'MoviePage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      movies: []
    }
  },
  methods: {
      getMovies: function(event) {
          this.$http.get("http://220.230.125.170:4100/movie")
            .then((result)=>{
                if(result.data.status=="success"){
                    this.movies =JSON.parse(result.data.result)
                    console.log(result.data)
                }
                else{
                    console.log(result.data)
                }
            })
          
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
    padding: 50px;
}
#aa{
    margin: 10px;
}
.movie-box {
    margin: 10px;
    border: 1px solid black;
}
</style>
