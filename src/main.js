import {createApp} from 'vue'
import App from './App.vue'
import router from './plugins/router'
import store from './plugins/store'
import Axios from 'axios';
import VueSignaturePad from 'vue-signature-pad';
import {registerPlugins} from "@/plugins";
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue3Signature from "vue3-signature"

// Axios.defaults.baseURL = "http://localhost:8080/api/"
Axios.defaults.baseURL = "https://esa-blueshell.nl/api/"



const app = createApp(App)
app.use(store)
app.use(router)
app.use(Vue3Signature)
app.use(VueAxios, axios)
app.use(VueSignaturePad)

registerPlugins(app)
app.mount('#app')
