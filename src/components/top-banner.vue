<template>
  <div class="banner">
    <v-parallax :src="gaming" class="background"></v-parallax>
    <div class="black overlay"></div>
    <div style="text-align: center;height: 100%">
      <div class="title text-h4 font-weight-light white--text">
        {{ title }}
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
  top: 134px;
}

.overlay {
  position: absolute;
  opacity: 0.4;
  width: 100%;
  height: 100%;
  z-index: 2;
}
</style>
