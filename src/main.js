import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
// import VueLazyload from 'vue-lazyload'
import store from './store'

import Vuex from 'vuex';

fastclick.attach(document.body)

Vue.use(Vuex);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
