<template>
    <v-parallax :src="image ? '' :gaming" :height="$vuetify.breakpoint.lgAndUp ? 364 :264">

      <v-img :src="image" class="custom-image"
             :height="$vuetify.breakpoint.lgAndUp ? 364 :264"></v-img>
      <v-container fill-height fluid style="background: rgba(0,0,0,0.5)">
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
    </v-parallax>
</template>

<script>
export default {
  name: 'top-banner',
  props: ["title", "image"],
  data: function () {
    return {
      gaming: require("../assets/gaming.jpg"),

    }
  }
}
</script>


<style scoped lang="scss">
.custom-image {
  z-index: -99;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto
}
</style>
