<template>
  <v-parallax :src="gaming" height="364">
    <v-container fill-height fluid style="background: rgba(0,0,0,0.5)">
      <v-row>
        <v-col>
          <div class="text-h2 font-weight-bold white--text text-center mt-16"
               style="letter-spacing: 5px !important">
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
  props: ["title"],
  data: function () {
    return {
      gaming: require("../assets/gaming.jpg"),

    }
  }
}
</script>


<style scoped lang="scss">

</style>
