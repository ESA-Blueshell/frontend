<template>
    <v-container fluid fill-height
                 style="background-position: center;background-size: cover"
                 :style="{ 'background-image': `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${require('../assets/banner.jpg')})`,
                            height: $vuetify.breakpoint.lgAndUp ? '364px' : '264px'}">
      <v-row>
        <v-col>
          <div class="text-h1 font-weight-bold white--text text-center mt-16"
               style="letter-spacing: 5px !important;line-height: normal !important;"
               v-bind:style="$vuetify.breakpoint.lgAndUp? {} : $vuetify.breakpoint.mdOnly?{ 'font-size': '70px !important'} : $vuetify.breakpoint.smOnly? { 'font-size': '50px !important'} : { 'font-size': '40px !important'}"
          >
            {{ title.toUpperCase() }}
          </div>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
  name: 'top-banner',
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
