<template>
  <v-app>
    <v-app-bar dark elevate-on-scroll fixed>
      <v-app-bar-nav-icon @click="drawer = true"
                          v-if="$vuetify.breakpoint.mdAndDown">
      </v-app-bar-nav-icon>
      <v-toolbar-title class="ml-sm-n5 ml-md-0 ml-lg-0 ml-xl-0 ">
        <router-link to="/">
          <v-img contain :src="require('./assets/topbarlogo.png')" alt="Blueshell logo"
                 style="height: 50px;width: 144px" class="mr-4">
          </v-img>
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
            <v-btn class="bar-button" v-bind="attrs" v-on="on" text dark to="/esports">Esports
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/esports">Competitive scene</v-list-item>
            <v-list-item to="/esports/league-of-legends">League of Legends</v-list-item>
            <v-list-item to="/esports/counter-strike-global-offensive">Counter Strike: Global
              Offensive
            </v-list-item>
            <v-list-item to="/esports/rocket-league">Rocket League</v-list-item>
            <v-list-item to="/esports/super-smash-bros">Super Smash Bros.</v-list-item>
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
            <v-list-item to="/partners/ogd-ict">OGD ICT-diensten</v-list-item>
          </v-list>
        </v-menu>
        <v-btn class="bar-button" text dark to="/contact">Contact</v-btn>
      </div>
      <!--      <v-spacer/>-->
      <!--      <v-btn class="bar-button" text dark to="/login">Login</v-btn>-->
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
          <v-list-item to="/esports">Competitive scene</v-list-item>
          <v-list-item to="/esports/league-of-legends">League of Legends</v-list-item>
          <v-list-item to="/esports/counter-strike-global-offensive">Counter Strike: Global
            Offensive
          </v-list-item>
          <v-list-item to="/esports/rocket-league">Rocket League</v-list-item>
          <v-list-item to="/esports/super-smash-bros">Super Smash Bros.</v-list-item>
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
          <v-list-item to="/partners/ogd-ict">OGD ICT-diensten</v-list-item>
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
      <v-btn href="https://www.ogd.nl/" target="_blank">
        OGD
      </v-btn>
      <v-spacer></v-spacer>
      <div class="white--text">SITECIE GANG &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
    <v-snackbar rounded v-model="poggers" timeout="105000">
      <audio controls autoplay v-if="poggers">
        <source src="./assets/blueshellanthem.mp3" type="audio/mpeg">
      </audio>
    </v-snackbar>
    <audio id="discord">
      <source src="./assets/discord.mp3" type="audio/mpeg">
    </audio>
    <audio id="knocking">
      <source src="./assets/knocking.mp3" type="audio/mpeg">
    </audio>
  </v-app>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      drawer: false,
      shellyLogo: require("./assets/shelly.png"),
      poggers: false,
    }
  },
  methods: {
    goto(url) {
      router.push(url)
    },
  },
  mounted() {
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

    playDiscord()
    playKnocking()


    function playDiscord() {
      setTimeout(() => {
        document.getElementById('discord').play()
        console.log('get fucked')
        playDiscord()
      }, 1000 * (15 + Math.random() * 120))
    }
    function playKnocking() {
      setTimeout(() => {
        document.getElementById('knocking').play()
        console.log('get fucked')
        playKnocking()
      }, 1000 * (20 + Math.random() * 120))
    }
  }
}
</script>

<style>

.bar-button {
  margin: 2px;
  height: 100% !important;
}

</style>
