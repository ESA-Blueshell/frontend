<template>
  <v-app>
    <v-app-bar dark elevate-on-scroll fixed>
      <v-app-bar-nav-icon @click="drawer = true"
                          v-if="$vuetify.breakpoint.mdAndDown">
      </v-app-bar-nav-icon>
      <v-toolbar-title class="ml-sm-n5 ml-md-0 ml-lg-0 ml-xl-0 ">
        <router-link to="/">
          <img :src="require('./assets/topbarlogo.png')" alt="Blueshell logo"
               style="max-height: 64px;max-width: 260px; width: 100%" class="mr-3">
        </router-link>
      </v-toolbar-title>
      <div v-if="$vuetify.breakpoint.lgAndUp"
           style="height: 100%">
        <v-btn class="bar-button" text dark to="/">Home</v-btn>
        <v-btn class="bar-button" text dark to="/membership">Membership</v-btn>
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="bar-button" v-bind="attrs" v-on="on" text dark to="/aboutus">Association
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/aboutus">About us</v-list-item>
            <v-list-item to="/board">Board</v-list-item>
            <v-list-item to="/committees">Committees</v-list-item>
            <v-list-item to="/documents">Documents</v-list-item>
          </v-list>
        </v-menu>
        <v-btn class="bar-button" text dark to="/events">Events</v-btn>
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="bar-button" v-bind="attrs" v-on="on" text dark
                   to="/esports/competitive-scene">Esports
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/esports/competitive-scene">Competitive scene</v-list-item>
            <v-list-item to="/esports/league-of-legends">League of Legends</v-list-item>
            <v-list-item to="/esports/counter-strike-global-offensive">Counter Strike: Global
              Offensive
            </v-list-item>
            <v-list-item to="/esports/valorant">Valorant</v-list-item>
          </v-list>
        </v-menu>
        <v-btn class="bar-button" text dark to="/news">News</v-btn>
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="bar-button" v-bind="attrs" v-on="on" text dark
                   to="/partners/become-a-partner">Partners
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/partners/become-a-partner">Become a partner!</v-list-item>
            <v-list-item to="/partners/el-nino">El Niño – Digital Development</v-list-item>
            <v-list-item to="/partners/brunen">Brunen</v-list-item>
            <v-list-item to="/partners/dekimo">Dekimo</v-list-item>
          </v-list>
        </v-menu>
        <v-btn class="bar-button" text dark to="/contact">Contact</v-btn>
      </div>

      <v-spacer/>

      <!--  Dark mode toggle    -->
      <v-btn small icon @click="darkMode" rounded class="mr-4">
        <transition name="roll" mode="out-in">
          <v-icon key="1" color="white" v-if="!$vuetify.theme.dark" style="transition: unset">
            mdi-moon-waxing-crescent
          </v-icon>
          <v-icon key="2" color="accent" v-else style="transition: unset">
            mdi-white-balance-sunny
          </v-icon>
        </transition>
      </v-btn>

      <!-- LOGIN BUTTON/ACCOUNT DROPDOWN MENU -->
      <v-btn class="bar-button" text dark to="/login" v-if="!loggedIn">Log In</v-btn>
      <v-menu offset-y v-else>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="bar-button" v-bind="attrs" v-on="on" text dark>
            <v-icon large>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/account">Account</v-list-item>
          <v-list-item to="/events/upcoming">Upcoming events</v-list-item>
          <v-list-item to="/events/manage" v-if="$store.getters.isActive">Manage events</v-list-item>
          <v-list-item to="/committees/manage" v-if="$store.getters.isBoard">Manage committees</v-list-item>
          <v-list-item @click="logOut">Log Out</v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary dark>
      <v-list nav>
        <v-list-item text dark to="/">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item text dark to="/membership">
          <v-list-item-title>Membership</v-list-item-title>
        </v-list-item>
        <v-list-group :value="false" color="blue lighten-1" class="mb-2">
          <!-- why the fuck do list-groups not get a bottom margin but list items do what the fuck it's like they don't want us to use them in a navbar aaaaa -->
          <template v-slot:activator>
            <v-list-item-title>
              Association
            </v-list-item-title>
          </template>
          <v-list-item to="/aboutus">About us</v-list-item>
          <v-list-item to="/board">Board</v-list-item>
          <v-list-item to="/committees">Committees</v-list-item>
          <v-list-item to="/documents">Documents</v-list-item>
          <v-divider dark></v-divider>
        </v-list-group>
        <v-list-item text dark to="/events">
          <v-list-item-title>Events</v-list-item-title>
        </v-list-item>
        <v-list-group :value="false" color="blue lighten-1" class="mb-2">
          <template v-slot:activator>
            <v-list-item-title>
              Esports
            </v-list-item-title>
          </template>
          <v-list-item to="/esports/competitive-scene">Competitive scene</v-list-item>
          <v-list-item to="/esports/league-of-legends">League of Legends</v-list-item>
          <v-list-item to="/esports/counter-strike-global-offensive">Counter Strike: Global
            Offensive
          </v-list-item>
          <v-list-item to="/esports/valorant">Valorant</v-list-item>
          <v-divider dark></v-divider>
        </v-list-group>
        <v-list-item text dark to="/news">
          <v-list-item-title>News</v-list-item-title>
        </v-list-item>
        <v-list-group :value="false" color="blue lighten-1" class="mb-2">
          <template v-slot:activator>
            <v-list-item-title>
              Partners
            </v-list-item-title>
          </template>
          <v-list-item to="/partners/become-a-partner">Become a partner!</v-list-item>
          <v-list-item to="/partners/el-nino">El Niño – Digital Development</v-list-item>
          <v-list-item to="/partners/brunen">Brunen</v-list-item>
          <v-list-item to="/partners/dekimo">Dekimo</v-list-item>
          <v-divider dark></v-divider>
        </v-list-group>
        <v-list-item text dark to="/contact">
          <v-list-item-title>Contact</v-list-item-title>
        </v-list-item>
        <!--        <v-list-item text dark to="/login">-->
        <!--          <v-list-item-title>Login</v-list-item-title>-->
        <!--        </v-list-item>-->

      </v-list>
      <template v-slot:append>
        <div class="mx-4">
          <v-row>
            <v-col>
              <v-btn icon href="mailto:board@blueshell.utwente.nl">
                <v-icon>mdi-email</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn icon href="https://www.facebook.com/BlueshellEsports/" target="_blank">
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn icon href="https://www.instagram.com/blueshellesports/" target="_blank">
                <v-icon>mdi-instagram</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn icon href="https://twitter.com/BlueshellESA" target="_blank">
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
            </v-col>
          </v-row>

        </div>
      </template>
    </v-navigation-drawer>
    <!--    <v-main>-->
    <router-view/>
    <!--    </v-main>-->
    <v-footer dark>
      <v-btn icon href="mailto:board@blueshell.utwente.nl">
        <v-icon>mdi-email</v-icon>
      </v-btn>
      <v-btn icon href="https://www.facebook.com/BlueshellEsports/" target="_blank">
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      <v-btn icon href="https://www.instagram.com/blueshellesports/" target="_blank">
        <v-icon>mdi-instagram</v-icon>
      </v-btn>
      <v-btn icon href="https://twitter.com/BlueshellESA" target="_blank">
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn href="https://www.elnino.tech/" target="_blank">
        El Niño
      </v-btn>
      <v-btn href="https://www.brunen.nl/" target="_blank">
        Brunen
      </v-btn>
      <v-btn href="https://www.dekimo.com/" target="_blank">
        Dekimo
      </v-btn>
      <v-btn href="https://esportsteamtwente.nl/" target="_blank">
        ETT
      </v-btn>
      <v-spacer></v-spacer>

      <div class="white--text mr-4">SITECIE GANG &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
    <v-snackbar rounded v-model="poggers" timeout="105000">
      <audio controls autoplay v-if="poggers">
        <source src="./assets/blueshellanthem.mp3" type="audio/mpeg">
      </audio>
    </v-snackbar>
    <v-snackbar v-model="networkError" timeout="10000">
      Something went wrong when trying to communicate with the server :/ <br>
      Just ping @SiteCie on Discord and we'll look into it
      <template v-slot:action="{ attrs }">
        <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="networkError = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>


    <!-- Cookie dialog -->
    <v-dialog v-model="cookieDialog" width="560">
      <v-card>
        <v-card-title class="text-h2">
          {{ $vuetify.breakpoint.xs ? 'Cookies' : 'Accept cookies' }}
        </v-card-title>

        <v-card-text class="body-1">
          We know these cookie popups are getting insane but don't worry, this is the only time you'll see this. We use
          cookies for saving your login and possibly some other useful stuff that we will forget to write about here
          when we make it. You can read more about our Cookie Policy on
          <router-link to="/documents">the documents page</router-link>
          .
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text
                 @click="$store.commit('acceptCookies');cookieDialog = false">
            Got it
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      drawer: false,
      poggers: false,
      cookieDialog: false,
    }
  },
  computed: {
    networkError: {
      get() {
        return this.$store.state.networkError
      },
      set(value) {
        this.$store.commit('setNetworkError', value)
      }
    },
    loggedIn: {
      get() {
        return this.$store.state.login
      },
    },
  },
  methods: {
    goto(url) {
      router.push(url)
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem('esa-blueshell.nl:darkMode', this.$vuetify.theme.dark.toString())
    },
    logOut() {
      // Let the cookie expire and redirect if the page is logged in only
      document.cookie = 'login=;expires=Thu, 01 Jan 1970 00:00:01 GMT'
      this.$store.commit('setLogin', null)
      if (this.$route.meta.requiresAuth) {
        this.goto('/')
      }
    }
  },
  mounted() {
    //Cookie garbage
    if (!this.$store.getters.cookiesAccepted) {
      this.cookieDialog = true
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
