import Vue from 'vue'
import VueAxios from 'vue-axios'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import axios from './axios'
import store from './store/index'

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
