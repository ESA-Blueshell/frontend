<template>
  <div class="banner mt-16">
    <v-parallax :src="gaming" class="background">
      <div class="black overlay"></div>
      <div style="text-align: center;height: 100%">
        <div class="text-h2 font-weight-bold white--text title "
             style="letter-spacing: 20px !important;font-family: 'Shitfont',serif !important;font-weight: bold !important;">
          {{ title.toUpperCase() }}
        </div>
      </div>
    </v-parallax>


  </div>
</template>

<script>
export default {
  name: 'top-banner',
  props: ["title"],
  data: function () {
    return {
      gaming: require("../assets/banner.jpg"),

    }
  }
}
</script>


<style scoped>


.banner {
  height: 300px;
  overflow: hidden;
  display: block;
  position: relative;
}

.background {
  position: relative;
  width: 100%;
  bottom: 0;
  z-index: 1;
}

.title {
  position: relative;
  z-index: 3;
  top: 120px;
  letter-spacing: 5px !important;
}

.overlay {
  position: absolute;
  opacity: 0.4;
  width: 100%;
  height: 100%;
  z-index: 2;
}


</style>
