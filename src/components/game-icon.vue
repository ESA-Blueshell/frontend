<template>
  <v-col v-bind:key="game.title"
         class="ma-3 transition-swing"
         style="border-radius: 15px;overflow: visible"
         cols="1"
         align-self="center"
         :style="'background: '+ color">
    <v-img :src="game.icon" @click="goto" style="overflow: visible"></v-img>
  </v-col>
</template>

<script>
import router from "@/router";

export default {
  name: "game-icon",
  props: ["game", "color"],
  methods: {
    goto() {
      if (this.game.esportsLink) {
        router.push(this.game.esportsLink);
      }
    }
  }
}
</script>