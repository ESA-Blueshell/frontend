<template>
  <v-app>
    <v-app-bar class="theme--dark" elevate-on-scroll fixed>
      <h2 class="align-center white--text">
        <v-img contain :src="shellyLogo" alt="Blueshell logo" height="40">
        </v-img>
        Bluehell Ease Ports
      </h2>
      <v-btn class="bar-button" text dark to="/">Home</v-btn>
      <v-btn class="bar-button" text dark to="/news">News</v-btn>
      <v-btn class="bar-button" text dark to="/events">Events</v-btn>
      <v-btn class="bar-button" text dark to="/contact">Contact</v-btn>
      <v-btn class="bar-button" text dark to="/committees">Committees</v-btn>
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
  }
}
</script>

<style>

.bar-button {
  margin: 2px;
  height: 100% !important;
}

</style>
