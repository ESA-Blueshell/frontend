<template>
  <div class="banner" v-bind:style="$vuetify.breakpoint.smAndUp?{ height: '150px'}:{ height: '200px' }">
    <v-row class="mx-auto container" align="center" justify="center"
           v-if="$vuetify.breakpoint.mdAndUp">
      <v-col>
        <div>
          <p class="white--text text-h4 font-weight-thin mb-0" style="float: left">
            Want to get to know us better?
          </p>
          <v-btn rounded color="primary" class="text--white"
                 href="https://discord.gg/23YMFQy" target="_blank" style="float: right">
            JOIN OUR DISCORD SERVER!
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
</style>