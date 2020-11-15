<template>
  <div>
    <div class="banner">
      <v-parallax :src="require('../assets/gaming.jpg')" height="900" class="background"></v-parallax>
      <div class="black overlay"></div>
      <div class="mx-auto text-center" style="top: 300px; position: relative;z-index: 3;">
        <p id="blueshell" class="white--text text-h3 text-sm-h1 text-md-h1 text-lg-h1 text-xl-h1">
          BLUESHELL
        </p>
        <p class="white--text text-h5 font-weight-light">
          The largest student esports association in the Netherlands!
        </p>
        <v-btn rounded color="primary" @click="$router.push('/membership')">
          join now!
        </v-btn>
      </div>
    </div>
    <div style="height: 50px"></div>
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
