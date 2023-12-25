import {createApp} from 'vue'
import App from './App.vue'
import router from './plugins/router'
import store from './plugins/store'
import Axios from 'axios';
import {registerPlugins} from "@/plugins";
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from "@/plugins/vuetify";
// Axios.defaults.baseURL = "http://localhost:8080/api/"
Axios.defaults.baseURL = "https://esa-blueshell.nl/api/"



const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueAxios, axios)
registerPlugins(app)
app.mount('#app')
