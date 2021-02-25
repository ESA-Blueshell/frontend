import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        enableShitability: true,
        shitSite: false
    },
    mutations: {
        shit() {
            this.shitSite = true;
        },
        unshit() {
            this.shitSite = false;
        },
        toggleShit() {
            this.shitSite = !this.shitSite;
        }
    },
    actions: {}
})
