<template>
    <div id="MoviePage" >
        <div id="aa">
            <div v-show="mode == 'page'">
                <button type="button" class="btn btn-primary" @click="getMovies">새로고침</button>
                <button type="button" class="btn btn-secondary" to="/upload_movie" style="color:floralwhite" @click="uploadMode">업로드</button>
            </div>
            <div v-show="mode != 'page'">
                <button type="button" class="btn btn-primary" @click="pageMode">뒤로가기</button>
            </div>
        </div>
        <div id="MovieUpload" v-show="mode != 'page'">
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
                <button v-show="mode =='upload'" type="button" class="btn btn-primary" @click="uploadMovie">Register</button>
                <button v-show="mode =='edit'" type="button" class="btn btn-primary" @click="uploadMovie">Edit</button>
            </form>
        </div>
        <div id="MovieTab" v-show="mode == 'page'">
            <div id="pageBox">
            <div v-if="movies.length == 0">
                불러올 정보가 없습니다.
                <br>
                아마도 API 서버가 꺼져있을겁니다.
            </div>
            <div class="card-columns">
                <div v-for="(movie, index) in movies" :key="index" class="card p-3" style="">
                    <img class="card-img-top" src="../assets/logo.png" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title text-center">#{{movie.id}}. {{movie.title}}</h5>
                        <p>{{movie.showtime}}분</p>
                        <p class="card-text">{{movie.content}}</p>
                        <div class="text-right">
                            <button type="button" class="btn" style="background:rgb(53,57,92); color:floralwhite" @click="deleteMode(movie)">삭제</button>
                            <button type="button" class="btn" style="background:rgb(53,57,92); color:floralwhite" @click="editMode(movie)">수정</button>
                        </div>
                        <div class="timestamp" style="color:gray">
                            <small>
                                {{movie.upload_time}}
                            </small>
                        </div>
                    </div>
                </div>
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
        movies: [],
        id: '',
        title: '',
        content: '',
        userfile: '',
        showtime: '',
        tempfile: '',
        mode: 'page'
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
                this.mode = 'page'
                this.getMovies()
            })
            .catch((err)=>{
                this.$notice({
                    type: 'alert',
                    text: '업로드 실패했어요.'
                })
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
                }
                this.pageMode()
            })
            .catch((err)=>{
                this.$notice({
                    type: 'alert',
                    text: '수정 실패했어요.'
                })
            })
        }
      },
    getMovies: function(event) {
        this.$http.get("http://220.230.125.170:4100/movie")
        .then((result)=>{
            if(result.data.status=="success"){
                this.movies =JSON.parse(result.data.result)
                console.log(result.data)
                this.$notice({
                    type: 'success',
                    text: '무사히 정보를 긁어왔습니다.'
                })
            }
            else{
                console.log(result.data)
            }
        })
        .catch((err)=>{
            this.$notice({
                type: 'alert',
                text: '서버가 꺼져있는거 같아용'
            })
            this.movies=[]
        })
        
    },
    uploadMode: function(){
        this.mode = 'upload'
        this.title = ''
        this.content = ''
        this.showtime = ''
    },
    editMode: function(movie){
        this.mode = 'edit'
        this.title = movie.title
        this.id = movie.id
        this.content = movie.content
        this.showtime = movie.showtime
    },
    deleteMode: function(movie){
        this.mode = 'delete'
        this.$http.delete('http://220.230.125.170:4100/movie/delete?id='+movie.id, formData)
            .then((result)=>{
                console.log(result)
                if(result.data.status=="success"){
                    console.log("성공!")
                    this.$notice({
                        type: 'success',
                        text: '무사히 삭제 성공!'
                    })
                }
                this.pageMode()
            })
            .catch((err)=>{
                this.$notice({
                    type: 'alert',
                    text: '삭제 실패했어요.'
                })
            })
    },
    pageMode: function(){
        this.mode = 'page'
        this.getMovies()
    }
  },
  mounted: function (){
      this.getMovies()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
    padding: 50px;
}

#aa{
    text-align: right;
    margin: 5px;
}
.movie-box {
    margin: 10px;
    border: 1px solid black;
}

#pageBox {
    padding: 50px;
    background-color: lightgrey;
}
img{
    border: 1px solid black;
}
.timestamp {
    text-align: right;
}

</style>
