<template>
  <div>
  <div class="banner">
    <div class="mx-auto text-center" style="top: 300px; position: relative">
      <p class="white--text text-h1">
        BLUESHELL
      </p>
      <p class="white--text text-h5 font-weight-light">
        The largest student esports association in the Netherlands!
      </p>
      <v-btn rounded color="primary">
        join now!
      </v-btn>
    </div>
  </div>
  <div style="height: 50px"></div></div>
</template>

<script>
export default {
  name: 'main-banner'
}
</script>


<style scoped lang="scss">
.banner {
  height: 900px;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("../assets/gaming.jpg") center/cover fixed;
}
</style>
