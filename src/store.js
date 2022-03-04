import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default new Vuex.Store({
  state: {
    token: getCookie('token') || null,
    expiryTime: null,
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
      document.cookie = `token=${payload};SameSite=strict;Secure`
    }
  },
  actions: {},
  getters: {
    getToken: state => state.token,
    getOrLogin: function (state) {
      if (state.token) {
        return state.token
      }

    }
  },
})
