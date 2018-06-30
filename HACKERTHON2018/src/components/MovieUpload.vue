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
            <label for="files">Upload Video File</label>
            <input type="file" id="files" ref="file" class="form-control-file" @change="fileChanges">
        </div>
        <div class="form-group">
            <label for="files2">Upload Smi File</label>
            <input type="file" id="files2" ref="file" class="form-control-file" @change="fileChanges2">
        </div>
        <br>
        <button v-show="mode == 'edit'" type="button" class="btn btn-primary" @click="uploadMovie">Edit</button>
        <button v-show="mode != 'edit'" type="button" class="btn btn-primary" @click="uploadMovie">Register</button>
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
      tempfile: '',
      tempfile2: ''
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
        console.log("video")
        var file = e.target.files[0]
        console.log(file)
        this.tempfile = file
    },
    fileChanges2: function(e){
        console.log("smi")
        var file = e.target.files[0]
        console.log(file)
        this.tempfile2 = file
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
        formData.append('captionfile',this.tempfile2)

        if(this.mode == 'upload'){
            this.$http.post(this.$config.targetURL+'/movie/create', formData)
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
            this.$http.put(this.$config.targetURL+'/movie/update', formData)
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
