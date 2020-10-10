<template>
  <v-app>
    <v-app-bar class="theme--dark" elevate-on-scroll fixed>
      <h2 class="align-center white--text">
        <v-img contain :src="shellyLogo" alt="Blueshell logo" height="40">
        </v-img>
        Bluehell Ease Ports
      </h2>
      <v-btn class="bar-button" text dark to="/">Home</v-btn>
      <v-btn class="bar-button" text dark to="/membership">Membership</v-btn>
      <v-btn class="bar-button" text dark to="/news">News</v-btn>
      <v-btn class="bar-button" text dark to="/events">Events</v-btn>
      <v-btn class="bar-button" text dark to="/contact">Contact</v-btn>
      <v-btn class="bar-button" text dark to="/committees">Committees</v-btn>
      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="bar-button" v-bind="attrs" v-on="on" text dark to="/esports">Esports</v-btn>
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
    </v-app-bar>
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
export default {
  data() {

    return {
      shellyLogo: require("./assets/shelly.png"),
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
