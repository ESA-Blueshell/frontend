<template>
  <div>
    <div class="banner">
      <v-parallax :src="require('../assets/banner.png')" height="900"
                  class="background"></v-parallax>
      <div class="black overlay"></div>
      <div class="mx-auto text-center" style="top: 300px; position: relative;z-index: 3;">
        <p id="blueshell"
           class="white--text text-h2 text-sm-h1 text-md-h1 text-lg-h1 text-xl-h1"
           v-bind:style="$vuetify.breakpoint.mdAndUp?{ 'font-size': '200px !important'} : ($vuetify.breakpoint.smAndUp?{ 'font-size': '130px !important'}:{})">
          SHITSHELL
        </p>
        <p class="white--text text-h5 font-weight-light font-italic">
          Welcome to my blog!
        </p>
        <v-btn x-large color="primary" rounded @click="$router.push('/membership')"
               class="mt-5"
               style="font-size: 30px;height: 50px;">
         pay me
        </v-btn>
      </div>
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

.banner {
  height: 900px;
  overflow: hidden;
  //  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("../assets/gaming.jpg") center/cover fixed;
}

.background {
  position: absolute;
  width: 100%;
  z-index: 1;
  height: 900px;
}

.overlay {
  position: absolute;
  opacity: 0.6;
  width: 100%;
  height: 900px;
  z-index: 2;
}
</style>
