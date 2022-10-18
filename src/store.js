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
    cookies: getJsonCookie('cookies') || false,
    networkErrorMessage: null,
    loggedInSnackbar: false,
  },
  mutations: {
    setLogin(state, newLogin) {
      state.login = newLogin
      document.cookie = `login=${JSON.stringify(state.login)};SameSite=strict;Secure;path=/`
    },
    logout(state){
      state.login = null
      document.cookie = `login=${null};SameSite=strict;Secure;path=/`
    },
    setRoles(state, newRoles) {
      state.login.roles = newRoles
      document.cookie = `login=${JSON.stringify(state.login)};SameSite=strict;Secure;path=/`
    },
    acceptCookies() {
      document.cookie = `cookies=true;SameSite=strict;Secure;path=/`
    },
    setNetworkErrorMessage(state, message) {
      state.networkErrorMessage = message
    },
    setLoggedInSnackbar(state, newLoggedInSnackbar){
      state.loggedInSnackbar = newLoggedInSnackbar
    }
  },
  actions: {},
  getters: {
    getLogin: state => state.login,
    cookiesAccepted: state => state.cookies,
    tokenExpired: state => state.login == null || new Date().getTime() > state.login.expiration,
    isBoard: state => state.login.roles.includes("BOARD"),
    isActive: state => state.login.roles.includes("COMMITTEE"),
    isMember: state => state.login.roles.includes("MEMBER"),
    isLoggedIn: state => !!state.login
  },
})
