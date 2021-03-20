<template>
  <div class="banner mt-16">
    <v-parallax :src="gaming" class="background"></v-parallax>
    <div class="black overlay"></div>
    <div style="text-align: center;height: 100%">
      <div class="text-h2 font-weight-bold white--text title "
      style="letter-spacing: 5px !important">
        {{ title.toUpperCase() }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top-banner',
  props: ["title"],
  data: function () {
    return {
      gaming: require("../assets/gaming.jpg"),

    }
  }
}
</script>


<style scoped lang="scss">


.banner {
  height: 300px;
  overflow: hidden;
  display: block;
  position: relative;
}

.background {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
}

.title {
  position: relative;
  z-index: 2;
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
