<template>
  <v-flex xs10 sm5 md4 lg4 xl3 v-bind:key="game.title"
          class="ma-3" style="overflow: hidden; border-radius: 15px">
    <v-hover v-slot:default="{ hover }">

      <v-card :color="i%3===0 ? `#6bd098` : i%3===1 ? `#fbc658` : `#e91e63`" height="250px" hover>

        <v-card-title style="display:block;" class="front">
          <img class="front game-icon" :src="game.icon" :alt="game.title">
          <h2 class="game-title white--text font-weight-bold" v-text="game.title"></h2>
        </v-card-title>

        <v-card-subtitle class="front white--text" v-if="game.competitive">
          <p class="front" style="margin-top: 20px">COMPETITIVE</p>
        </v-card-subtitle>

        <v-slide-y-transition>
          <v-img class="game-bg" :src="game.bg" v-show="hover"></v-img>
        </v-slide-y-transition>

      </v-card>

    </v-hover>
  </v-flex>
</template>

<script>
export default {
  name: "game-card",
  props: ["game", "i"]
}
</script>

<style scoped>

.front {
  z-index: 10;
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
</style>