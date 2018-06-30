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
      mode: '',
      movie: '',
      content: '',
      userfile: '',
      showtime: '',
      id: '',
      tempfile: ''
    }
  },
  mounted: function (){
    console.log("LMG mounted")
    console.log(this.$route.query)
    if(this.$route.query.mode == 'edit'){
        this.mode = 'edit'
        var movie = this.$route.query.movie || {}
        this.title = movie.title;
        this.id = movie.id;
        this.showtime = movie.showtime;
        this.content = movie.content;
    }
    else if(this.$route.query.mode == 'upload'){
        this.mode = 'upload'
    }
    else{
        console.log('올바르지 않은 접근이긴한데 그냥 할꺼임')
        this.mode = 'upload'
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
            content: this.content,
            id: this.id
        }

        console.log(JSON.stringify(json))
        var formData = new FormData()
        formData.append('information', JSON.stringify(json))

        formData.append('userfile',this.tempfile)

        if(this.mode == 'upload'){
            this.$http.post('http://220.230.125.170:4100/movie/create', formData)
            .then((result)=>{
                console.log(result)
                if(result.data.status=="success"){
                    console.log("성공!")
                    this.$notice({
                        type: 'success',
                        text: '무사히 업로드 성공!'
                    })
                }
                this.$router.push('/movie')
            })
            .catch((error)=>{
                this.$notice({
                    type: 'alert',
                    text: '업로드에 실패했습니다.'
                })
                this.$router.push('/movie')
            })
        }
        else if(this.mode == 'edit'){
            this.$http.put('http://220.230.125.170:4100/movie/update', formData)
            .then((result)=>{
                console.log(result)
                if(result.data.status=="success"){
                    console.log("성공!")
                    
                    this.$notice({
                        type: 'success',
                        text: '무사히 편집 성공!'
                    })
                    this.$router.push('/movie')
                }
            })
            .catch((error)=>{
                this.$notice({
                    type: 'alert',
                    text: '편집에 실패했습니다.'
                })
                this.$router.push('/movie')
            })

        }
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
