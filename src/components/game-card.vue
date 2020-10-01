<template>
  <v-flex xs10 sm5 md4 lg4 xl3 v-bind:key="game.title"
          class="ma-3" style="overflow: hidden; border-radius: 15px">
    <v-hover v-slot:default="{ hover }">

      <v-card :color="color" height="250px" hover>

        <v-card-title style="display:block">
          <img class="front game-icon" :src="game.icon" :alt="game.title">
          <h2 class="game-title white--text font-weight-bold" v-text="game.title"></h2>
        </v-card-title>

        <v-card-subtitle class="white--text" v-if="game.competitive">
          <p style="margin-top: 20px">COMPETITIVE</p>
        </v-card-subtitle>

        <v-btn class="game-button front white--text" v-if="game.competitive" rounded :color="color">
          Go to e-sports page
        </v-btn>

        <v-slide-y-transition>
          <v-img class="game-bg" :src="game.bg" v-if="hover"></v-img>
        </v-slide-y-transition>

      </v-card>

    </v-hover>
  </v-flex>
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