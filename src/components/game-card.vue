<template>
  <v-col cols="10" sm="9" md="6" lg="5" xl="4"
         class="transition-swing">
    <v-hover v-slot:default="{ hover }">
      <v-card :color="color"
              height="250px"
              :class="'elevation-${hover ? 20 : 4}'"
              style="cursor: default; overflow: hidden;border-radius: 15px">

        <v-card-title style="display:block">
          <img class="game-icon"
               v-bind:class="game.hideLogo? '' :'front'"
               :src="game.icon"
               :alt="game.title + ' icon'">
          <h2 class="game-title white--text font-weight-bold" v-text="game.title"></h2>
        </v-card-title>

        <v-card-subtitle class="white--text" v-if="game.esportsLink">
          <p style="margin-top: 20px">COMPETITIVE</p>
        </v-card-subtitle>

        <v-btn class="game-button front white--text"
               v-if="game.esportsLink"
               :color="color"
               :to="game.esportsLink"
               rounded>
          Go to e-sports page
        </v-btn>

        <v-slide-y-transition>
          <v-img class="game-bg" :src="game.bg" v-if="hover"></v-img>
        </v-slide-y-transition>
      </v-card>
    </v-hover>
  </v-col>
</template>

<script>
export default {
  name: "game-card",
  props: ["game", "color"]
}
</script>

<style scoped>

.front {
  z-index: 2;
}

.game-icon {
  position: relative;
  max-width: 75px;
  max-height: 75px;
  margin-right: 20px;
  margin-left: 7px;
}

.game-bg {
  position: absolute !important;
  top: 0;
  width: 100%;
  height: 100%
}

.game-title {
  word-break: break-word;
}

.game-button {
  position: absolute;
  margin-right: 10px;
  margin-bottom: 10px;
  bottom: 0;
  right: 0;

}
</style>