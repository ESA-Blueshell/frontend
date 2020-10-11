<template>
  <v-app>
    <v-app-bar dark elevate-on-scroll fixed>
      <v-app-bar-nav-icon @click="drawer = true"
                          v-if="$vuetify.breakpoint.name==='xs' || $vuetify.breakpoint.name==='sm'">
      </v-app-bar-nav-icon>
      <v-toolbar-title class="ml-sm-n5 ml-md-0 ml-lg-0 ml-xl-0 ">
        <router-link to="/">
          <v-img contain :src="require('./assets/topbarlogo.png')" alt="Blueshell logo"
                 style="height: 50px;width: 144px" class="mr-4">
          </v-img>
        </router-link>
      </v-toolbar-title>
      <div v-if="$vuetify.breakpoint.name!=='xs' && $vuetify.breakpoint.name!=='sm'"
           style="height: 100%">
        <v-btn class="bar-button" text dark to="/">Home</v-btn>
        <v-btn class="bar-button" text dark to="/membership">Membership</v-btn>
        <v-btn class="bar-button" text dark to="/news">News</v-btn>
        <v-btn class="bar-button" text dark to="/events">Events</v-btn>
        <v-btn class="bar-button" text dark to="/contact">Contact</v-btn>
        <v-btn class="bar-button" text dark to="/committees">Committees</v-btn>
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="bar-button" v-bind="attrs" v-on="on" text dark to="/esports">Esports
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/esports/league-of-legends">League of Legends</v-list-item>
            <v-list-item to="/esports/counter-strike-global-offensive">Counter Strike:Global
              Offensive
            </v-list-item>
            <v-list-item to="/esports/rocket-league">Rocket League</v-list-item>
            <v-list-item to="/esports/super-smash-bros">Super Smash Bros.</v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary dark>
      <v-list nav>
        <v-list-item text dark to="/">
          <v-list-item-title> Home</v-list-item-title>
        </v-list-item>
        <v-list-item text dark to="/membership">
          <v-list-item-title> Membership</v-list-item-title>
        </v-list-item>
        <v-list-item text dark to="/news">
          <v-list-item-title> News</v-list-item-title>
        </v-list-item>
        <v-list-item text dark to="/events">
          <v-list-item-title> Events</v-list-item-title>
        </v-list-item>
        <v-list-item text dark to="/contact">
          <v-list-item-title> Contact</v-list-item-title>
        </v-list-item>
        <v-list-item text dark to="/committees">
          <v-list-item-title> Committees</v-list-item-title>
        </v-list-item>


        <v-list-group :value="false" color="blue lighten-1">
          <template v-slot:activator>
            <v-list-item-title>
              Esports
            </v-list-item-title>
          </template>

          <v-list-item to="/esports">Competitive scene</v-list-item>
          <v-list-item to="/esports/league-of-legends">League of Legends</v-list-item>
          <v-list-item to="/esports/counter-strike-global-offensive">Counter Strike:Global
            Offensive
          </v-list-item>
          <v-list-item to="/esports/rocket-league">Rocket League</v-list-item>
          <v-list-item to="/esports/super-smash-bros">Super Smash Bros.</v-list-item>


        </v-list-group>
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
    <v-main>
      <router-view/>
    </v-main>
    <v-footer class="theme--dark">
      <v-spacer></v-spacer>
      <div class="white--text">&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import router from "@/router";

export default {
  data() {

    return {
      drawer: false,
      shellyLogo: require("./assets/shelly.png"),
    }
  },
  methods: {
    goto(url) {
      router.push(url)
    }
  },
  mounted: () => {
    let keysPressed = [];
    window.addEventListener('keydown', event => {
      const key = event.key.toLowerCase();
      keysPressed.push(key);
      if (keysPressed.toString().endsWith("arrowup,arrowup,arrowdown,arrowdown,arrowleft,arrowright,arrowleft,arrowright,a,b,enter")) {
        alert("BRUHHHHHHHHHHHHHHHHH")
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

</style>
