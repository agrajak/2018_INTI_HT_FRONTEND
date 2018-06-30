// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueCookie from 'vue-cookie'
import VueNotice from './vue-notice'
import configJson from '../config/config.json'
import { store } from './store'
const config = configJson
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$config = config
Vue.use(VueNotice)
Vue.use(VueCookie)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
