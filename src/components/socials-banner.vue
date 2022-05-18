<template>
  <div  :style="{background: $vuetify.theme.dark?$vuetify.theme.themes.dark.background:$vuetify.theme.themes.light.background}"
  ><!--v-bind:style="$vuetify.breakpoint.smAndUp?{ height: '120px'}:{ height: '200px' }"-->
    <v-row class="mx-auto container flex-nowrap" align="center" justify="space-between" >
      <v-col  md="auto" cols="120">
        <p class="white--text text-h4 font-weight-thin mb-0" style="float: left">
          Follow us on Social Media
        </p>
      </v-col>
      <v-spacer></v-spacer>
      <v-col md="auto">
        <div>
          <v-btn color="primary" href="https://www.instagram.com/blueshellesports/" target="_blank"
                 class="ml-5 my-3 ">
            <v-icon dark x-large>mdi-instagram</v-icon>
          </v-btn>
          <v-btn color="primary" href="https://www.facebook.com/BlueshellEsports/" target="_blank"
                 class="ml-5 my-3  ">
            <v-icon dark x-large>mdi-facebook</v-icon>
          </v-btn>
          <v-btn color="primary" href="https://twitter.com/BlueshellESA" target="_blank"
                 class="ml-5 my-3  ">
            <v-icon dark x-large>mdi-twitter</v-icon>
          </v-btn>
          <v-btn color="primary" href="https://www.linkedin.com/company/blueshell-esports" target="_blank"
                 class="ml-5 my-3  ">
            <v-icon dark x-large>mdi-linkedin</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "socials-banner"
}
</script>

<style scoped>

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