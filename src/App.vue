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
          v-if="!$store.getters.isLoggedIn"
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

    <bs-footer />


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
      v-model="statusSnackbarMessage"
      timeout="10000"
    >
      <span v-html="statusSnackbarMessage" />
      <template #actions>
        <v-btn
          color="blue"
          variant="text"
          @click="statusSnackbarMessage = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!-- Cookie snackbar -->
    <v-snackbar
      v-model="showCookieSnackbar"
      timeout="-1"
    >
      We're using cookies to keep you logged in. You can read more about how we use cookies in our
      <a
        href="https://esa-blueshell.nl/api/download/bsCookiePolicy.pdf"
        class="text-decoration-none"
        target="_blank"
      >Cookie Policy</a>.

      <template #actions>
        <v-btn
          color="primary"
          variant="text"
          @click="acceptCookies"
        >
          Got it
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import {$goto} from "@/plugins/goto";
import BsFooter from "@/components/bs-footer.vue";
import {$handleNetworkError} from "@/plugins/handleNetworkError";

export default {
  components: {BsFooter},
  data: ()=> ({
      drawer: false,
      poggers: false,
      showCookieSnackbar: false,
  }),
  computed: {
    statusSnackbarMessage: {
      get() {
        return this.$store.state.statusSnackbarMessage
      },
      set(message) {
        this.$store.commit('setStatusSnackbarMessage', message)
      }
    },
  },
  mounted() {
    // Cookie garbage
    if (localStorage.getItem('esa-blueshell.nl:cookiesAccepted') !== 'true') {
      this.showCookieSnackbar = true
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
          if (e.response?.status === 401) {
            this.$store.commit('statusSnackbarMessage', 'Login expired. You have been logged out.')
            this.$store.commit('logout')
            if (this.$route.meta.requiresAuth) {
              $goto('/')
            }
          } else {
            $handleNetworkError(e)
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
      if (this.$route.meta.requiresAuth) {
        $goto('/')
      }
    },
    acceptCookies() {
      localStorage.setItem('esa-blueshell.nl:cookiesAccepted', 'true')
      this.showCookieSnackbar = false
    },
    showSnackbar(message) {
      this.snackbar = true;
      this.snackbarText = message
    },
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
