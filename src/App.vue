<template>
  <v-app>
    <v-app-bar theme="dark">
      <v-btn
        v-if="$vuetify.display.mdAndDown"
        class="ml-2"
        icon="mdi-menu"
        @click="drawer = !drawer"
      />

      <router-link to="/">
        <img
          src="./assets/topbarlogo.png"
          alt="Blueshell logo"
          style="max-height: 64px;width: 100%"
          class="mr-2"
        >
      </router-link>

      <div
        v-if="$vuetify.display.lgAndUp"
        style="height: 90%"
      >
        <v-btn
          class="bar-button"
          to="/"
        >
          Home
        </v-btn>
        <v-btn
          class="bar-button"
          to="/membership"
        >
          Membership
        </v-btn>
        <v-menu
          :open-on-hover="true"
          open-delay="0"
          :offset="3"
        >
          <template #activator="{ props }">
            <v-btn
              class="bar-button"
              v-bind="props"
              to="/aboutus"
            >
              Association
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/aboutus">
              About us
            </v-list-item>
            <v-list-item to="/board">
              Board
            </v-list-item>
            <v-list-item to="/committees">
              Committees
            </v-list-item>
            <v-list-item to="/documents">
              Documents
            </v-list-item>
          </v-list>
        </v-menu>


        <v-menu
          v-if="$store.getters.isLoggedIn"
          :open-on-hover="true"
          open-delay="0"
          :offset="3"
        >
          <template #activator="{ props }">
            <v-btn
              class="bar-button"
              v-bind="props"
              to="/events"
            >
              events
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/events">
              Events
            </v-list-item>
            <v-list-item
              v-if="$store.getters.isActive"
              to="/events/manage"
            >
              Manage events
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          v-else
          class="bar-button"
          to="/events"
        >
          Events
        </v-btn>


        <v-menu
          :open-on-hover="true"
          open-delay="0"
          :offset="3"
        >
          <template #activator="{ props }">
            <v-btn
              class="bar-button"
              v-bind="props"
              to="/esports/competitive-scene"
            >
              Esports
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/esports/competitive-scene">
              Competitive scene
            </v-list-item>
            <v-list-item to="/esports/league-of-legends">
              League of Legends
            </v-list-item>
            <v-list-item to="/esports/counter-strike-2">
              Counter Strike 2
            </v-list-item>
            <v-list-item to="/esports/valorant">
              Valorant
            </v-list-item>
            <v-list-item to="/esports/rocketleague">
              Rocket League
            </v-list-item>
            <v-list-item to="/esports/trackmania">
              Trackmania
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu
          :open-on-hover="true"
          open-delay="0"
          :offset="3"
        >
          <template #activator="{ props }">
            <v-btn
              class="bar-button"
              v-bind="props"
              to="/partners/become-a-partner"
            >
              Partners
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/partners/become-a-partner">
              Become a partner!
            </v-list-item>
            <v-list-item to="/partners/el-nino">
              El Niño – Digital Development
            </v-list-item>
            <v-list-item to="/partners/connectworks">
              Connectworks
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          class="bar-button"

          to="/contact"
        >
          Contact
        </v-btn>
      </div>

      <v-spacer />

      <div style="height: 90%;display: flex;align-items: center;flex-wrap: nowrap;">
        <!--  Dark mode toggle    -->
        <v-btn
          class="mr-2"
          :icon="$vuetify.theme.global.current.dark ? 'mdi-moon-waxing-crescent' : 'mdi-white-balance-sunny'"
          :color="$vuetify.theme.global.current.dark ? 'accent' : 'white'"
          :class="{'roll-on': $vuetify.theme.global.current.dark,'roll-off': !$vuetify.theme.global.current.dark }"
          @click="toggleDarkMode"
        />

        <!-- LOGIN BUTTON/ACCOUNT DROPDOWN MENU -->
        <v-btn
          v-if="!loggedIn"
          class="bar-button ma-0 mr-2"
          to="/login"
        >
          Log In
        </v-btn>
        <v-menu
          v-else
          :offset="3"
        >
          <template #activator="{ props }">
            <v-btn
              class="bar-button ma-0 mr-2"
              variant="text"
              v-bind="props"
            >
              <v-icon size="x-large">
                mdi-account
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/account">
              Account
            </v-list-item>
            <v-list-item
              v-if="$store.getters.isBoard"
              to="/members/manage"
            >
              Manage members
            </v-list-item>
            <v-list-item
              v-if="$store.getters.isBoard"
              to="/committees/manage"
            >
              Manage committees
            </v-list-item>
            <v-list-item
              v-if="$store.getters.isBoard || $store.getters.isActive"
              to="/events/manage"
            >
              Manage events
            </v-list-item>
            <v-list-item @click="logOut">
              Log Out
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
    >
      <v-list
        nav
        class="pa-2"
      >
        <v-list-item to="/">
          Home
        </v-list-item>
        <v-list-item to="/membership">
          Membership
        </v-list-item>
        <v-list-group>
          <!-- why the fuck do list-groups not get a bottom margin but list items do what the fuck it's like they don't want us to use them in a navbar aaaaa -->
          <template #activator="{ props }">
            <v-list-item v-bind="props">
              Association
            </v-list-item>
          </template>

          <v-list-item to="/aboutus">
            About
          </v-list-item>
          <v-list-item to="/board">
            Board
          </v-list-item>
          <v-list-item to="/committees">
            Committees
          </v-list-item>
          <v-list-item to="/documents">
            Documents
          </v-list-item>
          <v-divider class="mb-1" />
        </v-list-group>


        <v-list-group v-if="$store.getters.isLoggedIn">
          <template #activator="{ props }">
            <v-list-item v-bind="props">
              Events
            </v-list-item>
          </template>
          <v-list-item to="/events">
            Events
          </v-list-item>
          <v-list-item
            v-if="$store.getters.isActive"
            to="/events/manage"
          >
            Manage events
          </v-list-item>
          <v-divider class="mb-1" />
        </v-list-group>
        <v-list-item
          v-else
          to="/events"
        >
          Events
        </v-list-item>

        <v-list-group>
          <template #activator="{ props }">
            <v-list-item v-bind="props">
              Esports
            </v-list-item>
          </template>
          <v-list-item to="/esports/competitive-scene">
            Competitive scene
          </v-list-item>
          <v-list-item to="/esports/league-of-legends">
            League of Legends
          </v-list-item>
          <v-list-item to="/esports/counter-strike-2">
            Counter Strike 2
          </v-list-item>
          <v-list-item to="/esports/valorant">
            Valorant
          </v-list-item>
          <v-list-item to="/esports/rocketleague">
            Rocket League
          </v-list-item>
          <v-list-item to="/esports/trackmania">
            Trackmania
          </v-list-item>
          <v-divider class="mb-1" />
        </v-list-group>

        <v-list-group>
          <template #activator="{ props }">
            <v-list-item v-bind="props">
              Partners
            </v-list-item>
          </template>
          <v-list-item to="/partners/become-a-partner">
            Become a partner!
          </v-list-item>
          <v-list-item to="/partners/el-nino">
            El Niño – Digital Development
          </v-list-item>
          <v-list-item to="/partners/connectworks">
            Connectworks
          </v-list-item>
          <v-divider class="mb-1" />
        </v-list-group>

        <v-list-item to="/contact">
          Contact
        </v-list-item>
      </v-list>

      <template #append>
        <v-btn
          icon="mdi-email"
          href="mailto:blueshellesports@gmail.com"
          variant="plain"
          style="width: calc(100%/3)"
        />
        <v-btn
          icon="mdi-instagram"
          href="https://www.instagram.com/blueshellesports/"
          target="_blank"
          variant="plain"
          style="width: calc(100%/3)"
        />
        <v-btn
          icon="mdi-facebook"
          href="https://www.facebook.com/BlueshellEsports/"
          target="_blank"
          variant="plain"
          style="width: calc(100%/3)"
        />
        <v-btn
          icon="mdi-twitch"
          href="https://www.twitch.tv/blueshellesports"
          target="_blank"
          variant="plain"
          style="width: calc(100%/3)"
        />
        <v-btn
          icon="mdi-twitter"
          href="https://twitter.com/BlueshellESA"
          target="_blank"
          variant="plain"
          style="width: calc(100%/3)"
        />
        <v-btn
          icon="mdi-linkedin"
          href="https://www.linkedin.com/company/blueshell-esports"
          target="_blank"
          variant="plain"
          style="width: calc(100%/3)"
        />
      </template>
    </v-navigation-drawer>


    <router-view />


    <!--    TODO: improve footer for breakpoint xs-->
    <v-footer
      theme="dark"
      style="flex-wrap: wrap"
    >
      <v-btn
        icon="mdi-email"
        variant="plain"
        href="mailto:blueshellesports@gmail.com"
      />
      <v-btn
        icon="mdi-instagram"
        variant="plain"
        href="https://www.instagram.com/blueshellesports/"
        target="_blank"
      />
      <v-btn
        icon="mdi-facebook"
        variant="plain"
        href="https://www.facebook.com/BlueshellEsports/"
        target="_blank"
      />
      <v-btn
        icon="mdi-twitch"
        variant="plain"
        href="https://www.twitch.tv/blueshellesports"
        target="_blank"
      />
      <v-btn
        icon="mdi-twitter"
        variant="plain"
        href="https://twitter.com/BlueshellESA"
        target="_blank"
      />
      <v-btn
        icon="mdi-linkedin"
        variant="plain"
        href="https://www.linkedin.com/company/blueshell-esports"
        target="_blank"
      />
      <v-btn
        href="https://www.elnino.tech/"
        target="_blank"
        v-text="'El Niño'"
      />
      <v-btn
        href="https://connectworks.nl/"
        target="_blank"
        v-text="'Connectworks'"
      />
      <v-btn
        href="https://esportsteamtwente.nl/"
        target="_blank"
        v-text="'ETT'"
      />
      <v-btn
        href="https://www.esportsloungetwente.nl/"
        target="_blank"
        v-text="'Predator Esports Lounge'"
      />

      <v-spacer />

      <div class="text-white mr-4">
        SITECIE GANG &copy; {{ new Date().getFullYear() }}
      </div>
    </v-footer>


    <v-snackbar
      v-model="poggers"
      rounded
      timeout="105000"
    >
      <audio
        v-if="poggers"
        controls
        autoplay
      >
        <source
          src="./assets/blueshellanthem.mp3"
          type="audio/mpeg"
        >
      </audio>
    </v-snackbar>

    <v-snackbar
      v-model="networkError"
      timeout="10000"
    >
      <span v-html="networkErrorMessage" />
      <template #actions>
        <v-btn
          color="blue"
          variant="text"
          @click="networkError = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!-- Logged in message -->
    <v-snackbar
      v-model="loggedInSnackbar"
      timeout="10000"
    >
      {{ loginText }}

      <template #actions>
        <v-btn
          color="blue"
          variant="text"
          @click="loggedInSnackbar=false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!-- Cookie dialog -->
    <v-dialog
      v-model="cookieDialog"
      persistent
      width="560"
    >
      <v-card>
        <v-card-title class="text-h4">
          {{ $vuetify.display.xs ? 'Cookies' : 'Accept cookies' }}
        </v-card-title>

        <v-card-text class="text-body-1">
          We know these cookie popups are annoying but don't worry, this is the only time you'll see this. We use
          cookies for saving your login and possibly some other useful stuff that we will forget to write about here
          when we make it. You can read more about what cookies are and how we use cookies in our
          <a
            href="https://esa-blueshell.nl/api/download/bsCookiePolicy.pdf"
            class="text-decoration-none"
            target="_blank"
          >Cookie Policy</a>.
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-btn
            color="primary"
            variant="text"
            block
            @click="acceptCookies"
          >
            Got it
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import router from "@/plugins/router";
import xss from "xss";
import showdown from "showdown";
import store from "@/plugins/store";
import {$goto} from "@/plugins/goto";

export default {
  setup() {
    const converter = new showdown.Converter()
    converter.setOption('openLinksInNewWindow', true)
    converter.setOption('headerLevelStart', 2)
    converter.setOption('simplifiedAutoLink', true)
    converter.setOption('strikethrough', true)
    converter.setOption('tables', true)
    converter.setOption('emoji', true)
    converter.setOption('underline', true)
    return {converter}
  },
  data() {
    return {
      drawer: false,
      poggers: false,
      cookieDialog: false,
    }
  },
  computed: {
    networkErrorMessage: {
      get() {
        return this.$store.state.networkErrorMessage
      },
      set(message) {
        this.$store.commit('setNetworkErrorMessage', message)
      }
    },
    networkError: {
      get() {
        return !!this.$store.state.networkErrorMessage
      },
      set(value) {
        this.$store.commit('setNetworkErrorMessage', value)
      }
    },
    loggedIn: {
      get() {
        return this.$store.state.login
      },
    },
    loggedInSnackbar: {
      get() {
        return this.$store.state.loggedInSnackbar
      },
      set(loggedInSnackbar) {
        this.$store.commit('setLoggedInSnackbar', loggedInSnackbar)
      }
    },
    loginText: {
      get() {
        return this.loggedIn ? "Welcome back " + this.loggedIn.username + "!" : "You are now logged out."
      },
    }
  },
  mounted() {
    // Cookie garbage
    if (localStorage.getItem('esa-blueshell.nl:cookiesAccepted') !== 'true') {
      this.cookieDialog = true
    }

    // Get account data for the chance that the user's roles have been updated
    // (so they don't have to log in and out for it)
    const login = this.$store.getters.getLogin
    if (login) {
      this.$http
        .get(`users/${login.userId}`, {headers: {'Authorization': `Bearer ${login.token}`}})
        .then(response => {
          this.$store.commit('setRoles', response.data.roles)
        })
        .catch(e => {
          if (e.response.status === 401) {
            store.commit('setNetworkErrorMessage', 'Login expired. You have been logged out.')
            this.$store.commit('logout')
            if (this.$route.meta.requiresAuth) {
              $goto('/')
            }
          } else {
            this.$root.handleNetworkError(e)
          }
        })
    }


    let keysPressed = [];
    window.addEventListener('keydown', event => {
      if (event.key) {
        const key = event.key.toLowerCase();
        keysPressed.push(key);
        if (keysPressed.toString().endsWith("arrowup,arrowup,arrowdown,arrowdown,arrowleft,arrowright,arrowleft,arrowright,b,a,enter")) {
          this.poggers = true
          alert("BIG SITECIE ENERGY")
          //todo: make epic easter eggerino
        }
      }
    });

    // Check user's dark mode preference
    if (!localStorage.getItem('esa-blueshell.nl:darkMode')) {
      this.checkPrefersColorScheme();
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => this.checkPrefersColorScheme())

    this.$vuetify.theme.global.name = localStorage.getItem('esa-blueshell.nl:darkMode') === 'true' ? 'dark' : 'light'
  },
  methods: {
    checkPrefersColorScheme() {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.setDarkMode(true)
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        this.setDarkMode(false)
      }
    },
    setDarkMode(dark) {
      localStorage.setItem('esa-blueshell.nl:darkMode', dark)
      this.$vuetify.theme.global.name = dark ? 'dark' : 'light'
    },
    toggleDarkMode() {
      this.setDarkMode(!this.$vuetify.theme.global.current.dark)
    },
    logOut() {
      // Let the cookie expire and redirect if the page is logged in only
      document.cookie = 'login=;expires=Thu, 01 Jan 1970 00:00:01 GMT'
      this.$store.commit('logout')
      this.loggedInSnackbar = true;
      if (this.$route.meta.requiresAuth) {
        $goto('/')
      }
    },
    acceptCookies() {
      localStorage.setItem('esa-blueshell.nl:cookiesAccepted', 'true')
      this.cookieDialog = false
    },
    showSnackbar(message) {
      this.snackbar = true;
      this.snackbarText = message
    },
    markdownToHtml(text) {
      return xss(this.converter.makeHtml(text.replaceAll('<html-blob>', '').replaceAll('</html-blob>', '').trim()))
    },
    handleNetworkError(error) {
      // If the request got rejected, go to the login page to get some permissions
      // Otherwise, set the networkError value in vuex to show the snackbar saying there is an error and rethrow
      let errorMessage;
      switch (error.response.status) {
        case 400:
          errorMessage = "Uhhhh, looks like a bad request (error 400)... Not sure how this happened. Please report this in the <a href='https://discord.com/channels/324285132133629963/1020245710987350047' target=\"_blank\" class=\"text-decoration-none\">Sitecie suggestions channel on discord</a>."
          break;
        case 401:
          errorMessage = "Woah there, looks like you're not logged in (anymore). Just log in and try again."
          if (!this.$route.fullPath.startsWith("/login")) {
            router.push({
              path: '/login',
              query: {redirect: this.$route.query.redirect || this.$route.fullPath}
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
      this.$store.commit('setNetworkErrorMessage', errorMessage)
      throw error
    }
  }
}
</script>

<style>

.v-btn.bar-button {
  margin: 0 2px;
  height: 100% !important;
}
.v-footer > .v-btn {
  margin: 0 2px;
}

.roll-off {
  animation: rotate-out 0.5s both;
}

.roll-on {
  animation: rotate-in 0.5s both;
}

@keyframes rotate-in {
  0% {
    transform: rotate(-45deg);
  }
  50% {
    transform: rotate(22.5deg);
  }
  100% {
    transform: rotate(0);
  }
}


@keyframes rotate-out {
  0% {
    transform: rotate(-45deg);
  }
  50% {
    transform: rotate(22.5deg);
  }
  100% {
    transform: rotate(0);
  }
}


</style>
