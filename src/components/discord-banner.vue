<template>
  <div class="banner"
       v-bind:style="$vuetify.breakpoint.smAndUp?{ height: '120px'}:{ height: '200px' }">
    <v-row class="mx-auto container" align="center" justify="space-between"
           v-if="$vuetify.breakpoint.mdAndUp">
      <v-col md="auto">
        <p class="white--text text-h4 font-weight-thin mb-0" style="float: left">
          Want to leave hate messages?
        </p>
      </v-col>
      <v-spacer></v-spacer>
      <v-col md="auto">
        <div>
          <v-btn color="primary" href="https://twitter.com/BlueshellESA" target="_blank"
                 class="ml-5">
            <v-icon dark x-large>mdi-discord</v-icon>
          </v-btn>
          <v-btn color="primary" href="https://www.instagram.com/blueshellesports/" target="_blank"
                 class="ml-5">
            <v-icon dark x-large>mdi-instagram</v-icon>
          </v-btn>
          <v-btn color="primary" href="https://www.facebook.com/BlueshellEsports/" target="_blank"

                 class="ml-5">
            <v-icon dark x-large>mdi-facebook</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row class="mx-auto container" align="center" justify="center"
           v-else>
      <v-col>
        <div class="text-center">
          <p class="mx-auto white--text text-h4 font-weight-thin">
            Want to get to know us better?
          </p>
          <v-btn rounded color="primary"
                 href="https://discord.gg/23YMFQy" target="_blank">
            JOIN OUR DISCORD SERVER!
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "discord-banner"
}
</script>

<style scoped>
.banner {
  background-size: cover;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("../assets/goom.jpg") fixed center;
}

.container {
  max-width: 1100px;
  height: 100%;
}

.v-btn {
  padding: 10px !important;
  width: 65px !important;
  height: 65px !important;
  border-radius: 10px;
  min-width: 0 !important;
}

.v-icon {
  margin: 10px !important;
}
</style>