import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
// import VueLazyload from 'vue-lazyload'
// import store from './store'

import 'common/stylus/index.styl'

import Vuex from 'vuex';


/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

fastclick.attach(document.body)

// Vue.use(VueLazyload, {
//   loading: require('common/image/default.png')
// })

Vue.use(Vuex);
const  vuex_store = new Vuex.Store({
  state:{
    youhui_select:"",
    isShowMask:false,
    maskContent:'',
    shelfCode:'',
    isSelect:false,
    user:window.page,
    orderCode: ''
  },
  mutations:{
    setIsShowMask(state){
      state.isShowMask = true
      let timer = setTimeout(() => {
        state.isShowMask = false
        clearTimeout(timer)
      },2000)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  store:vuex_store,
  render: h => h(App)
})
