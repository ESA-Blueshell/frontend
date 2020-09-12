<template>
  <v-app>
    <v-toolbar class="grey darken-3">
      <v-toolbar-title>
        <div>

          <v-img contain :src="shellyLogo" alt="Blueshell logo" height="40" style="float: left">
          </v-img>

          <h2 class="align-center" style="float: right;color: white">
            Bluehell Ease Ports
          </h2>
        </div>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn text dark to="/">Home</v-btn>
        <v-btn text dark to="/news">News</v-btn>
        <v-btn text dark to="/events">Events</v-btn>
        <v-btn text dark to="/contact">Contact</v-btn>
        <v-btn text dark to="/committees">Committees</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-main>
      <router-view/>
    </v-main>
    <v-footer class="grey darken-3">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
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


</style>
