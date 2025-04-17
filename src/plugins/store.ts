import { createStore } from 'vuex';
import { writeJsonCookie, readJsonCookie, deleteCookie } from '@/plugins/cookies';

export type Login = { userId: number; username: string; roles: string[]; token: string; expiration: number };

export type State = {
  login: Login | null;
  guestData: Record<string, unknown> | null;
  statusSnackbarMessage: string | null;
  loggedInSnackbar: boolean;
};

const store = createStore<State>({
  state: {
    login: readJsonCookie<Login>('login'),
    guestData: readJsonCookie('guestData'),
    statusSnackbarMessage: null,
    loggedInSnackbar: false,
  },
  mutations: {
    setLogin(state, payload: Login) {
      state.login = payload;
      writeJsonCookie('login', payload);
      state.statusSnackbarMessage = `Welcome back ${payload.username}!`;
    },
    logout(state) {
      state.login = null;
      deleteCookie('login');
      state.statusSnackbarMessage = 'You are now logged out.';
    },
    setRoles(state, roles: string[]) {
      if (state.login) {
        state.login = { ...state.login, roles };     // new object keeps reactivity intact
        writeJsonCookie('login', state.login);
      }
    },
    setStatusSnackbarMessage(state, message: string) {
      state.statusSnackbarMessage = message;
    },
    saveGuestData(state, data: Record<string, unknown>) {
      writeJsonCookie('guestData', data);
      state.guestData = data;
    },
  },
  getters: {
    getLogin: (s) => s.login,
    isLoggedIn: (s) => !!s.login,
    tokenExpired: (s) => !s.login || Date.now() > s.login.expiration,

    isBoard:  (s) => s.login?.roles?.includes('BOARD'),
    isActive: (s) => s.login?.roles?.includes('COMMITTEE'),
    isMember: (s) => s.login?.roles?.includes('MEMBER'),
  },
});
export default store;
