<template>
  <div id="movie_upload">
    <form>
        <div class="form-group">
            <label for="Title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Enter movie title" v-model="title">
            <small class="form-text text-muted">You have to enter the name of movie.</small>
        </div>
        <div class="form-group">
            <label for="comment">Summary</label>
            <textarea class="form-control" rows="5" id="comment" v-model="content"></textarea>

            <small class="form-text text-muted">You have to enter the summary of movie.</small>
        </div>
        <div class="form-group">
            <label for="showtimeinput">Show Time</label>
            <div class="input-group">
                <input id="showtimeinput" type="number" class="form-control" placeholder=150 v-model="showtime">
                <span class="input-group-text">min</span>
            </div>
            <small class="form-text text-muted">You have to enter the duration time of movie.</small>
        </div>
        <div class="form-group">
            <label for="files">Example file input</label>
            <input type="file" id="files" ref="file" class="form-control-file" @change="fileChanges">
        </div>
        <br>
        <button type="button" class="btn btn-primary" @click="uploadMovie">Register</button>
    </form>
  </div>
</template>
<script>
export default {
  /* eslint-disable */
  name: 'MovieUpload',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title: '',
      content: '',
      userfile: '',
      showtime: '',
      tempfile: ''
    }
  },
  methods: {
    fileChanges: function(e){
        console.log(e)
        var file = e.target.files[0]
        console.log(file)
        this.tempfile = file
    },
    uploadMovie: function(){
        var json = {
            title: this.title,
            showtime: this.showtime,
            content: this.content
        }

        console.log(JSON.stringify(json))
        var formData = new FormData()
        formData.append('information', JSON.stringify(json))

        formData.append('userfile',this.tempfile)
        this.$http.post('http://220.230.125.170:4100/movie/create', formData)
        .then((result)=>{
            console.log(result)
            if(result.data.status=="success"){
                console.log("성공!")
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
</style>
