import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import MoviePage from '@/components/MoviePage'

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
    }
  ]
})
