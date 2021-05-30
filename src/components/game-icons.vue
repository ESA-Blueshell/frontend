<template>
  <v-main>
    <v-row wrap align="center" justify="center" align-content="center" class="mx-auto mb-6"
           style="max-width: 1400px;z-index: 10000">
      <v-col class="mx-3 my-2 transition-swing"
             style="border-radius: 15px;padding: 4px; background-color: #f5f5f5;z-index: 10000000"
             cols="2" sm="1" md="1" lg="1" xl="1"
             align-self="center"
             v-for="(game,i) in games"
             v-bind:key="game.title"
             v-bind:class="{ 'elevation-8': (showPopup || hoverCarousel) && i===currentGame }"
             @mouseenter="hover(i)"
             @mouseleave="unhover"
      >
        <v-img class="ma-2" :src="game.icon" @click="goto(game.esportsLink)"/>
      </v-col>
    </v-row>
    <div style="top:0px;left:0px;width:100%;height:100%;position: absolute">
      <v-carousel id="carousel"
                  hide-delimiters
                  :show-arrows="false"
                  v-model="currentGame"
                  light
                  style="height: 100%"
      >
        <v-carousel-item v-for="game in games"
                         v-bind:key="game.title"
                         @mouseenter="hover(null)"
                         @mouseleave="unhover"
        >
          <v-sheet height="100%" tile>
            <v-img :src="game.bg"
                   eager
                   style="position: absolute;top: 0;height: 100%;width: 100%"/>
            <div style="display: table" class="overlay">
              <p style="display: table-cell; vertical-align: middle;"
                 class="mx-auto my-4 text-center text-h4 font-weight-light white--text">
                {{ game.title }}
              </p>
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
  </v-main>
</template>

<script>
import router from "@/router";

export default {
  name: "game-icons",
  props: ["games", "color"],
  data: () => {
    return {
      showPopup: 0,
      currentGame: null,
      hoverCarousel: false
    }
  },
  methods: {
    hover(i) {
      setTimeout(() => {
        this.showPopup++;
        if (i !== null) {
          this.currentGame = i;
        }
      }, 1)
    },
    unhover() {
      setTimeout(() => {
        this.showPopup--;
      }, 1000)
    },
    goto(link) {
      if (link) {
        router.push(link);
      }
    }
  }
}
</script>

<style lang="scss">
.overlay {
  position: absolute;
  bottom: 0;
  height: 60px;
  width: 100%;
  //z-index: 500;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 30px;
  overflow: hidden;
}

// hackerman
.v-carousel__item {
  height: 100% !important;
}
</style>