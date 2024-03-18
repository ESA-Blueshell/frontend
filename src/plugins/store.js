import {createStore} from 'vuex'


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

export default createStore({
  state: {
    login: getJsonCookie('login') || null,
    guestData: getJsonCookie('guestData') || null,
    statusSnackbarMessage: null,
    loggedInSnackbar: false,
  },
  mutations: {
    setLogin(state, newLogin) {
      state.login = newLogin
      document.cookie = `login=${JSON.stringify(state.login)};SameSite=strict;Secure;path=/`

      state.statusSnackbarMessage = "Welcome back " + state.login.username + "!"
    },
    logout(state) {
      state.login = null
      document.cookie = `login=${null};SameSite=strict;Secure;path=/`

      state.statusSnackbarMessage = 'You are now logged out.'
    },
    setRoles(state, newRoles) {
      state.login.roles = newRoles
      document.cookie = `login=${JSON.stringify(state.login)};SameSite=strict;Secure;path=/`
    },
    setStatusSnackbarMessage(state, message) {
      state.statusSnackbarMessage = message
    },
    saveGuestData(state, data) {
      document.cookie = `guestData=${JSON.stringify(data)};SameSite=strict;Secure;path=/`
    }
  },
  actions: {},
  getters: {
    getGuestData: state => state.guestData,

    getLogin: state => state.login,
    isLoggedIn: state => !!state.login,
    tokenExpired: state => state.login == null || new Date().getTime() > state.login.expiration,

    isBoard: state => state.login?.roles.includes("BOARD"),
    isActive: state => state.login?.roles.includes("COMMITTEE"),
    isMember: state => state.login?.roles.includes("MEMBER"),
  },
})
