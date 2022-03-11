import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


function getJsonCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return JSON.parse(c.substring(name.length, c.length));
    }
  }
  return "";
}

export default new Vuex.Store({
  state: {
    login: getJsonCookie('login') || null,
    networkError: false,
  },
  mutations: {
    setLogin(state, value) {
      state.login = value
      document.cookie = `login=${JSON.stringify(value)};SameSite=strict;Secure`
    },
    setNetworkError(state, value) {
      state.networkError = value
    },
  },
  actions: {},
  getters: {
    getLogin: state => state.login,
    tokenExpired: state => state.login == null || new Date().getTime() > state.login.expiration,
  },
})
