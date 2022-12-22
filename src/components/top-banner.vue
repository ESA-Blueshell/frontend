<template>
  <v-container
    fluid
    fill-height
    style="background-position: center;background-size: cover"
    :style="{ 'background-image': `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${require('../assets/banner.jpg')})`,
              height: $vuetify.display.lgAndUp ? '364px' : '264px'}"
  >
    <v-row>
      <v-col>
        <div
          class="text-h1 font-weight-bold text-white text-center mt-16"
          style="letter-spacing: 5px !important;line-height: normal !important;"
          :style="$vuetify.display.lgAndUp? {} : $vuetify.display.mdOnly?{ 'font-size': '70px !important'} : $vuetify.display.smOnly? { 'font-size': '50px !important'} : { 'font-size': '40px !important'}"
        >
          {{ title.toUpperCase() }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TopBanner',
  props: ["title"],
  data: () => ({
    gaming: require("../assets/banner.jpg"),
  })
}
</script>


<style lang="scss" scoped>
.custom-image {
  z-index: -99;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto
}
</style>
