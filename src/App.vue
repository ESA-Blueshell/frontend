<template>
  <v-app>
    <v-app-bar theme="dark">
      <v-app-bar-nav-icon
        v-if="$vuetify.display.mdAndDown"
        @click="drawer = true"
      />

      <router-link to="/">
        <img
          src="./assets/topbarlogo.png"
          alt="Blueshell logo"
          style="max-height: 64px;max-width: 260px;width: 100%"
          class="mr-3"
        >
      </router-link>

      <div
        v-if="$vuetify.display.lgAndUp"
        style="height: 100%"
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
          open-on-hover
          offset-y
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
          open-on-hover
        >
          <template #activator="{ props }">
            <v-btn
              class="bar-button"
              v-bind="props"
              to="/events/calendar"
            >
              events
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/events/calendar">
              Events calendar
            </v-list-item>
            <v-list-item to="/events/upcoming">
              Upcoming events
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
          to="/events/calendar"
        >
          Event calendar
        </v-btn>


        <v-menu
          open-on-hover
          offset-y
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
            <v-list-item to="/esports/counter-strike-global-offensive">
              Counter Strike: Global
              Offensive
            </v-list-item>
            <v-list-item to="/esports/rocketleague">
              Rocket League
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          class="bar-button"

          to="/news"
        >
          News
        </v-btn>
        <v-menu
          open-on-hover
          offset-y
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
            <v-list-item to="/partners/dekimo">
              Dekimo
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

      <!--  Dark mode toggle    -->
      <transition
        name="roll"
        mode="out-in"
      >
        <v-btn
          size="small"
          :icon="$vuetify.theme.global.name.value === 'dark' ? 'mdi-moon-waxing-crescent' : 'mdi-white-balance-sunny'"
          color="accent"
          class="mr-4"
          @click="darkMode"
        />
        <!--        :color="$vuetify.theme.current.value === 'dark' ? 'accent' : 'white'"-->
      </transition>

      <!-- LOGIN BUTTON/ACCOUNT DROPDOWN MENU -->
      <v-btn
        v-if="!loggedIn"
        class="bar-button"

        to="/login"
      >
        Log In
      </v-btn>
      <v-menu
        v-else
        offset-y
      >
        <template #activator="{ props }">
          <v-btn
            class="bar-button"
            v-bind="props"
          >
            <v-icon size="large">
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
          <v-list-item @click="logOut">
            Log Out
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
    >
      <v-list nav>
        <v-list-item
          text
          to="/"
        >
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item
          text

          to="/membership"
        >
          <v-list-item-title>Membership</v-list-item-title>
        </v-list-item>
        <v-list-group
          :value="false"
          color="blue-lighten-1"
          class="mb-2"
        >
          <!-- why the fuck do list-groups not get a bottom margin but list items do what the fuck it's like they don't want us to use them in a navbar aaaaa -->
          <template #activator>
            <v-list-item-title>
              Association
            </v-list-item-title>
          </template>
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
          <v-divider dark />
        </v-list-group>


        <v-list-group
          v-if="$store.getters.isLoggedIn"
          :value="false"
          color="blue-lighten-1"
          class="mb-2"
        >
          <!-- why the fuck do list-groups not get a bottom margin but list items do what the fuck it's like they don't want us to use them in a navbar aaaaa -->
          <template #activator>
            <v-list-item-title>
              Events
            </v-list-item-title>
          </template>
          <v-list-item to="/events/calendar">
            Event Calendar
          </v-list-item>
          <v-list-item to="/events/upcoming">
            Upcoming events
          </v-list-item>
          <v-list-item
            v-if="$store.getters.isActive"
            to="/events/manage"
          >
            Manage events
          </v-list-item>
          <v-divider dark />
        </v-list-group>
        <v-list-item
          v-else
          text
          dark
          to="/events/calendar"
        >
          <v-list-item-title>Event calendar</v-list-item-title>
        </v-list-item>


        <v-list-group
          :value="false"
          color="blue-lighten-1"
          class="mb-2"
        >
          <template #activator>
            <v-list-item-title>
              Esports
            </v-list-item-title>
          </template>
          <v-list-item to="/esports/competitive-scene">
            Competitive scene
          </v-list-item>
          <v-list-item to="/esports/league-of-legends">
            League of Legends
          </v-list-item>
          <v-list-item to="/esports/counter-strike-global-offensive">
            Counter Strike: Global
            Offensive
          </v-list-item>
          <v-list-item to="/esports/rocketleague">
            Rocket League
          </v-list-item>
          <v-divider dark />
        </v-list-group>
        <v-list-item
          text
          dark
          to="/news"
        >
          <v-list-item-title>News</v-list-item-title>
        </v-list-item>
        <v-list-group
          :value="false"
          color="blue-lighten-1"
          class="mb-2"
        >
          <template #activator>
            <v-list-item-title>
              Partners
            </v-list-item-title>
          </template>
          <v-list-item to="/partners/become-a-partner">
            Become a partner!
          </v-list-item>
          <v-list-item to="/partners/el-nino">
            El Niño – Digital Development
          </v-list-item>
          <v-list-item to="/partners/dekimo">
            Dekimo
          </v-list-item>
          <v-divider dark />
        </v-list-group>
        <v-list-item
          text
          dark
          to="/contact"
        >
          <v-list-item-title>Contact</v-list-item-title>
        </v-list-item>
        <!--        <v-list-item text dark to="/login">-->
        <!--          <v-list-item-title>Login</v-list-item-title>-->
        <!--        </v-list-item>-->
      </v-list>
      <template #append>
        <div class="mx-4">
          <v-row
            align="center"
            justify="center"
          >
            <v-col cols="4">
              <v-btn
                icon
                href="mailto:board@blueshell.utwente.nl"
              >
                <v-icon>mdi-email</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                icon
                href="https://www.instagram.com/blueshellesports/"
                target="_blank"
              >
                <v-icon>mdi-instagram</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                icon
                href="https://www.facebook.com/BlueshellEsports/"
                target="_blank"
              >
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                icon
                href="https://www.twitch.tv/blueshellesports"
                target="_blank"
              >
                <v-icon>mdi-twitch</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                icon
                href="https://twitter.com/BlueshellESA"
                target="_blank"
              >
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                icon
                href="https://www.linkedin.com/company/blueshell-esports"
                target="_blank"
              >
                <v-icon>mdi-linkedin</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </template>
    </v-navigation-drawer>
    <!--    <v-main>-->
    <router-view />
    <!--    </v-main>-->
    <v-footer dark>
      <v-btn
        icon
        href="mailto:board@blueshell.utwente.nl"
      >
        <v-icon>mdi-email</v-icon>
      </v-btn>
      <v-btn
        icon
        href="https://www.instagram.com/blueshellesports/"
        target="_blank"
      >
        <v-icon>mdi-instagram</v-icon>
      </v-btn>
      <v-btn
        icon
        href="https://www.facebook.com/BlueshellEsports/"
        target="_blank"
      >
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      <v-btn
        icon
        href="https://www.twitch.tv/blueshellesports"
        target="_blank"
      >
        <v-icon>mdi-twitch</v-icon>
      </v-btn>
      <v-btn
        icon
        href="https://twitter.com/BlueshellESA"
        target="_blank"
      >
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn
        icon
        href="https://www.linkedin.com/company/blueshell-esports"
        target="_blank"
      >
        <v-icon>mdi-linkedin</v-icon>
      </v-btn>
      <v-btn
        href="https://www.elnino.tech/"
        target="_blank"
      >
        El Niño
      </v-btn>
      <v-btn
        href="https://www.dekimo.com/"
        target="_blank"
      >
        Dekimo
      </v-btn>
      <v-btn
        href="https://esportsteamtwente.nl/"
        target="_blank"
      >
        ETT
      </v-btn>
      <v-btn
        href="https://connectworks.nl/"
        target="_blank"
      >
        Connectworks
      </v-btn>
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
      <template #action="{ attrs }">
        <v-btn
          color="blue"
          variant="text"
          v-bind="attrs"
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

      <template #action="{ attrs }">
        <v-btn
          color="blue"
          variant="text"
          v-bind="attrs"
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
        <v-card-title class="text-h2">
          {{ $vuetify.display.xs ? 'Cookies' : 'Accept cookies' }}
        </v-card-title>

        <v-card-text class="text-body-1">
          We know these cookie popups are getting insane but don't worry, this is the only time you'll see this. We use
          cookies for saving your login and possibly some other useful stuff that we will forget to write about here
          when we make it. You can read more about what cookies are and how we use cookies in our <a
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
            @click="$store.commit('acceptCookies');cookieDialog = false"
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
import {useTheme} from "vuetify";

export default {
  //?????????? i have no idea why we have to do this. see https://next.vuetifyjs.com/en/features/theme/#changing-theme
  setup() {
    const theme = useTheme()

    return {
      theme,
      // darkMode: () => {
      //   this.$vuetify.theme.global.name = this.$vuetify.theme.global.current.value.dark ? 'light' : 'dark'
      //   localStorage.setItem('esa-blueshell.nl:darkMode', this.$vuetify.theme.global.name.value)
      // }
    }
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
    //Cookie garbage
    if (!this.$store.getters.cookiesAccepted) {
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
        .catch(e => this.$root.handleNetworkError(e))
    }


    let keysPressed = [];
    window.addEventListener('keydown', event => {
      const key = event.key.toLowerCase();
      keysPressed.push(key);
      if (keysPressed.toString().endsWith("arrowup,arrowup,arrowdown,arrowdown,arrowleft,arrowright,arrowleft,arrowright,b,a,enter")) {
        this.poggers = true
        alert("BIG SITECIE ENERGY")
        //todo: make epic easter eggerino
      }

    });
  },
  methods: {
    goto(url) {
      router.push(url)
    },
    darkMode: () => {
      this.$vuetify.theme.global.name.value = this.$vuetify.theme.current.value.dark ? 'light' : 'dark'
      localStorage.setItem('esa-blueshell.nl:darkMode', this.$vuetify.theme.global.name.value)
    },
    logOut() {
      // Let the cookie expire and redirect if the page is logged in only
      document.cookie = 'login=;expires=Thu, 01 Jan 1970 00:00:01 GMT'
      this.$store.commit('logout')
      this.loggedInSnackbar = true;
      if (this.$route.meta.requiresAuth) {
        this.goto('/')
      }
    },
    showSnackbar(message) {
      this.snackbar = true;
      this.snackbarText = message
    }
  }
}
</script>

<style>

.bar-button {
  margin: 2px;
  height: 100% !important;
}

.roll-enter-active {
  animation: rotate-in 0.5s;
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


</style>
