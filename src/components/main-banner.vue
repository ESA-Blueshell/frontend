<template>
  <div>
    <div class="banner">
      <div class="mx-auto text-center" style="top: 300px; position: relative">
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
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("../assets/gaming.jpg") center/cover fixed;
}
</style>
