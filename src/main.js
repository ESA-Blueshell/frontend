import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css'
import Axios from 'axios';

Vue.config.productionTip = false

 Axios.defaults.baseURL = "http://localhost:8080/api/"
//Axios.defaults.baseURL = "https://esa-blueshell.nl/api/"
Vue.prototype.$http = Axios
Vue.$http = Axios

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
