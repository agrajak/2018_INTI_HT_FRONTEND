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
                <ul>
                    <ul v-for="(movie, index) in movies" :key="index" class="card p-3" style="">
                        <img class="card-img-top" src="../assets/logo.png" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title text-center">#{{movie.id}}. {{movie.title}}</h5>
                            <p>{{movie.showtime}}분</p>
                            <div v-show="movie.content.length > maxLength">
                                <div v-show="isToggled[index].data">
                                    <p class="card-text">{{movie.content}}</p>
                                    <button type="button" class="btn btn-sm btn-secondary" @click="toggleButton(index)">줄이기</button>
                                </div>
                                <div v-show="!isToggled[index].data">
                                    <p class="card-text">{{summary[index]}}</p>
                                    <button type="button" class="btn btn-sm btn-secondary" @click="toggleButton(index)">펼치기</button>
                                </div>
                            </div>
                            <div v-show="movie.content.length <= maxLength">
                                    <p class="card-text">{{summary[index]}}</p>
                            </div>
                            <div class="text-right" v-if="isLogged">
                                <button type="button" class="btn" style="background:rgb(53,57,92); color:floralwhite" @click="deleteMode(movie)">삭제</button>
                                <button type="button" class="btn" style="background:rgb(53,57,92); color:floralwhite" @click="editMode(movie)">수정</button>
                            </div>
                            <div class="timestamp" style="color:gray">
                                <small>
                                    {{movie.upload_time}}
                                </small>
                            </div>
                        </div>
                    </ul>
                </ul>
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
        summary: [],
        isToggled: [],
        id: '',
        title: '',
        content: '',
        userfile: '',
        showtime: '',
        tempfile: '',
        maxLength: 200
    }
  },
  computed: {
    isLogged() {
      return this.$store.getters.isLogged
    }
  },
  methods: {
    fileChanges: function(e){
        console.log(e)
        var file = e.target.files[0]
        console.log(file)
        this.tempfile = file
    },
    toggleButton: function(index){
        console.log("pushed" + index)
        console.log(this.isToggled[index].data)
        if(this.isToggled[index].data) this.isToggled[index].data=false
        else this.isToggled[index].data=true
        console.log(this.isToggled[index].data)

},
    getMovies: function(event) {
        this.$http.get(this.$config.targetURL+"/movie")
        .then((result)=>{
            if(result.data.status=="success"){
                this.movies =JSON.parse(result.data.result)
                this.summary = []
                this.isToggled = []
                for(var i=0;i<this.movies.length;i++){
                    if(this.movies[i].content.length > this.maxLength){
                        this.summary.push(this.movies[i].content.substring(0,this.maxLength))
                    }
                    else {
                        this.summary.push(this.movies[i].content)
                    }
                    this.isToggled.push({data:false})
                }
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
