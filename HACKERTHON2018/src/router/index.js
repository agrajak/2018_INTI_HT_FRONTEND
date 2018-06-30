import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import MoviePage from '@/components/MoviePage'
import MovieUpload from '@/components/MovieUpload'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/movie',
      name: 'MoviePage',
      component: MoviePage
    },
    {
      path: '/upload_movie/',
      name: 'MovieUpload',
      component: MovieUpload
    }
  ]
})
