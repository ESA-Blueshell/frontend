<template>
  <div class="banner"
  ><!--v-bind:style="$vuetify.breakpoint.smAndUp?{ height: '120px'}:{ height: '200px' }"-->
    <v-row class="mx-auto container flex-nowrap" align="center" justify="space-between" >
      <v-col md="auto" cols="120">
        <p class="white--text text-h4 font-weight-thin mb-0" style="float: left">
          Join us on our Discord server
        </p>
      </v-col>
      <v-spacer></v-spacer>
      <v-col md="auto">
        <div>
          <v-btn color="primary" href="https://discord.gg/23YMFQy" target="_blank"
                 class="ml-5">
            <v-icon dark x-large>mdi-discord</v-icon>
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
  /*background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("../assets/goom.jpg") fixed center;*/
  background: #1E1E1E
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