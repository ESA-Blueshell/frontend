<template>
  <div>
    <div class="banner">
      <v-parallax :src="require('../assets/gaming.jpg')" height="900">
        <v-container fill-height fluid style="background: rgba(0,0,0,0.6)">
          <v-row>
            <v-col>
              <div class="text-center mt-16">
                <p id="blueshell"
                   class="white--text text-h2 text-sm-h1 text-md-h1 text-lg-h1 text-xl-h1"
                   v-bind:style="$vuetify.breakpoint.mdAndUp?{ 'font-size': '200px !important'} : ($vuetify.breakpoint.smAndUp?{ 'font-size': '130px !important'}:{})">
                  BLUESHELL
                </p>
                <p class="white--text text-h5 font-weight-light font-italic">
                  The largest student esports association in the Netherlands!
                </p>
                <v-btn x-large color="primary" rounded @click="$router.push('/membership')"
                       class="mt-5"
                       style="font-size: 30px;height: 50px;">
                  join now
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-parallax>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main-banner'
}
</script>


<style scoped lang="scss">
@font-face {
  font-family: 'Blueshell';
  src: local("Blueshell"),
  url('../assets/Blueshell.woff2') format('woff2'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  url('../assets/Blueshell.ttf') format('truetype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
}

#blueshell {
  font-family: "Blueshell", sans-serif !important;
  height: 150px;
}

</style>
