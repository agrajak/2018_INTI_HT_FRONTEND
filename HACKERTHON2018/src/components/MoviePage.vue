<template>
    <div id="MoviePage" >
        <div id="aa">
            <button type="button" class="btn btn-primary" @click="getMovies">새로고침</button>
            <button type="button" class="btn btn-secondary" to="/upload_movie" style="color:floralwhite" @click="uploadMode">업로드</button>
        </div>
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
    }
  },
  methods: {
    fileChanges: function(e){
        console.log(e)
        var file = e.target.files[0]
        console.log(file)
        this.tempfile = file
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
        this.$router.push({ path: 'upload_movie', query: {
            mode: 'upload'
        }})
    },
    editMode: function(movie){
        this.$router.push({ path: 'upload_movie', query: {
            mode: 'edit',
            movie: movie
        }})
    },
    deleteMode: function(movie){
        this.$http.delete(this.$config.targetURL+'/movie/delete/'+movie.id)
            .then((result)=>{
                console.log(result)
                if(result.data.status=="success"){
                    console.log("성공!")
                    this.$notice({
                        type: 'success',
                        text: '무사히 삭제 성공!'
                    })
                }
                this.getMovies()
            })
            .catch((err)=>{
                this.$notice({
                    type: 'alert',
                    text: '삭제 실패했어요.'
                })
                this.getMovies()
            })
        
    }
  },
  mounted: function (){
      this.getMovies()
      
    console.log(this.$config || '')
    console.log(this.$config.targetURL || '')
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
