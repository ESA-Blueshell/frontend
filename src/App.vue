<template>
  <v-app>
    <v-toolbar class="grey darken-3">
      <v-toolbar-items>
        <v-btn flat dark to="/">Home</v-btn>
        <v-btn flat dark to="/news">News</v-btn>
        <v-btn flat dark to="/events">Events</v-btn>
        <v-btn flat dark to="/contact">Contact</v-btn>
        <v-btn flat dark to="/committees">Committees</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer class="grey darken-3">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
  export default {

  }
</script>

<style>

</style>
