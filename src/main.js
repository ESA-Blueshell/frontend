import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css'
import './styles/housestyle.css';
import Axios from 'axios';

Vue.config.productionTip = false

Axios.defaults.baseURL = "http://localhost:8080/api/"
// Axios.defaults.baseURL = "https://esa-blueshell.nl/api/"

Vue.prototype.$http = Axios
Vue.$http = Axios

let vue = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
});

//Handle errors when requesting something from the backend.
Axios.interceptors.response.use(
  undefined,
  (error => {
      // If the request got rejected, go to the login page to get some permissions
      // Otherwise, set the networkError value in vuex to show the snackbar saying there is an error and rethrow
      if (error.response.status === 401) {
        router.push({
          path: '/login',
          query: {redirect: vue.$route.fullPath}
        })
      } else {
        store.commit('setNetworkError', true)
        throw error
      }
    }
  )
)

vue.$mount('#app')
