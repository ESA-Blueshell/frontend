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

const showdown = require("showdown")
showdown.setOption('openLinksInNewWindow', true)
showdown.setOption('headerLevelStart', 2)
showdown.setOption('simplifiedAutoLink', true)
showdown.setOption('strikethrough', true)
showdown.setOption('tables', true)
showdown.setOption('emoji', true)
showdown.setOption('underline', true)
const converter = new showdown.Converter()
const xss = require("xss")

let vue = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  data() {
    return {}
  },
  methods: {
    markdownToHtml: text => xss(converter.makeHtml(text.replaceAll('<html-blob>', '').replaceAll('</html-blob>', '').trim())),
    handleNetworkError: error => {
      // If the request got rejected, go to the login page to get some permissions
      // Otherwise, set the networkError value in vuex to show the snackbar saying there is an error and rethrow
      let errorMessage;
      switch (error.response.status) {
        case 400:
          errorMessage = "Uhhhh, looks like a bad request (error 400)... Not sure how this happened. Please report this in the <a href='https://discord.com/channels/324285132133629963/1020245710987350047' target=\"_blank\" class=\"text-decoration-none\">Sitecie suggestions channel on discord</a>."
          break;
        case 401:
          errorMessage = "Woah there, looks like you're not logged in (anymore). Just log in and try again."
          if (!vue.$route.fullPath.startsWith("/login")) {
            router.push({
              path: '/login',
              query: {redirect: vue.$route.query.redirect || vue.$route.fullPath}
            })
          }
          break;
        case 403:
          errorMessage = "Woah there, you don't have enough authority to access this. Go to jail and DO NOT PASS GO, DO NOT COLLECT $200."
          router.push({path: '/account',})
          break;
        case 404:
          errorMessage = "Uhhhhhhh 404 moment. This resource doesn't exist anymore. Please report this in the <a href='https://discord.com/channels/324285132133629963/1020245710987350047' target=\"_blank\" class=\"text-decoration-none\">Sitecie suggestions channel on discord</a> if you think this is an error."
          break;
        case 408:
          errorMessage = "Zzzzzzzzzzzz... there seems to have been a request timeout (error code 408). Please report this in the <a href='https://discord.com/channels/324285132133629963/1020245710987350047' target=\"_blank\" class=\"text-decoration-none\">Sitecie suggestions channel on discord</a>."
          break;
        case 413:
          errorMessage = "Your file is too large. Please compress it and try again"
          break;
        case 500:
          errorMessage = "Hm. okay. seems like the server is very confused (error code 500). Please report this in the <a href='https://discord.com/channels/324285132133629963/1020245710987350047' target=\"_blank\" class=\"text-decoration-none\">Sitecie suggestions channel on discord</a>."
          break;
        case 502:
          errorMessage = "Uh oh, the server seems to be down (error code 502). Please report this in the <a href='https://discord.com/channels/324285132133629963/1020245710987350047' target=\"_blank\" class=\"text-decoration-none\">Sitecie suggestions channel on discord</a>."
          break;
        default:
          errorMessage = `Oh no. An error happened that we don't know about (error code ${error.response.status}). Please report this in the <a href='https://discord.com/channels/324285132133629963/1020245710987350047' target="_blank" class="text-decoration-none">Sitecie suggestions channel on discord</a>.`
          break;
      }
      store.commit('setNetworkErrorMessage', errorMessage)
      throw error
    }
  }
});

vue.$mount('#app')
