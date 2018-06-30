<template>
  <div class="hello">
        <form id="movie-search">
            <div class="form-group">
                <label for="Title">영화를 검색해주세요.</label>
                <input id="movie-query" type="text" class="form-control" placeholder="영화 제목"/>
            </div>
            <input type="button" class="btn btn-primary" @keyup.enter="movieSearch(0)" @click="movieSearch(0)" value="검색"/>
            <input id="cur-page" type="hidden" value="1"/>
        </form>
        <div id="movie-list"></div>
        <div v-for="(movie, index) in movieLists" :key="index">
            <div v-if="movie.titleEn.length">
                <button type="button" class="btn btn-sm btn-secondary" @click="selectLink(movie.title, movie.director, movie.titleEn)">선택</button>
                {{movie.title}}({{movie.titleEn}}) by {{movie.director}}
            </div>
        </div>
        <nav id="pagination" style="display:none">
            <ul class="pagination">
                <li  id="previous-btn" class="page-item disabled">
                    <a class="page-link" @click="movieSearch(-1)">이전</a>
                    </li>
                <li id="next-btn" class="page-item">
                    <a class="page-link" @click="movieSearch(1)">다음 검색결과</a>
                    </li>
            </ul>
        </nav>
        <div v-show="titleEn.length">
            <div id="title">제목 : {{title}}({{titleEn}}), 감독 : {{director}}</div>
            <button type="button" class="btn btn-primary" @click="submit">제출</button>
        </div>
  </div>
</template>

<script>
export default {
/* eslint-disable */
  name: 'MovieSearch',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      curPage: 1,
      movieLists: [],
      title: '',
      director: '',
      titleEn: ''
    }
  },
  methods: {
    submit: function(){

        var titleEn = String(this.titleEn).toLowerCase().replace(/ /gi,'_').replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi,'');

        console.log('conver : '+titleEn)
        this.$router.push({path: 'upload_movie', query: {
            mode: 'upload',
            title: this.title,
            director: this.director,
            titleEn: titleEn
        }})
    },
    selectLink: function(title, director, titleEn) {
        if(titleEn == "") {
            alert("영어 제목이 필요하다잉");
            return;
        }
        this.title = title
        this.director = director
        this.titleEn = titleEn
    },
      makeSelectLink: function(movieInfo){

      },
      movieSearch: function(pageDirection){
        var page = this.curPage
        page += pageDirection
        this.curPage = page
        if(page > 1) {
            $("#previous-btn").removeClass("disabled");
        }
        else if(page == 1) {
            $("#previous-btn").addClass("disabled");
        }

        console.log('page:'+page)
        var key = "21f2fc881ef580f5b769b339da1ebb6b";
        var url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json"
        url += "?key="+ key + "&movieNm=" + $("#movie-query").val() + "&curPage=" + page;
        this.$http.get(url)
        .then((result)=>{
                var data = result.data
                console.log(data.movieListResult);
                // 영화 리스트 초기화
                this.movieLists = []
                // 다음 버튼 활성/비활성화
                if(data.movieListResult.movieList.length < 10) {
                    $("#next-btn").addClass("disabled");
                }
                else {
                    $("#next-btn").removeClass("disabled");
                }
                // 영화 리스트 출력
                data.movieListResult.movieList.forEach(movie => {

                    this.movieLists.push({
                        title: movie.movieNm,
                        director: (movie.directors.length > 0)?movie.directors[0].peopleNm:"None",
                        titleEn : movie.movieNmEn
                    })
                });
                console.log(this.movieLists)
                $("#pagination").css("display", "block");
            }
        )
      }
  },
  mounted: function () {
    console.log(this.$config.targetURL || 'null')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
