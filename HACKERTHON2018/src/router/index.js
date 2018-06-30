import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import MoviePage from '@/components/MoviePage'
import MovieUpload from '@/components/MovieUpload'
import Login from '@/components/Login'
import About from '@/components/About'
import Register from '@/components/Register'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
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
