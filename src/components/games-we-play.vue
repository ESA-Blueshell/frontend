<template>
  <v-main>
    <!--    <v-container>-->
    <p class="mx-auto text-center text-h2 mt-10 white--text"
       style="z-index: 3;position: relative;">
      Games we play
    </p>

    <div v-for="(category,i) in games" v-bind:key="category.categoryName">
      <p class="mx-auto text-center text-h4 font-weight-light mb-3 white--text"
         style="z-index: 3;position: relative;">
        {{ category.categoryName }}
      </p>

      <v-row wrap align="center" justify="center" align-content="center" class="mx-auto mb-6"
             style="max-width: 1400px">
        <v-col class="mx-3 my-2 transition-swing"
               style="border-radius: 15px;padding: 4px; background-color: #f5f5f5;z-index: 3"
               cols="2" sm="1" md="1" lg="1" xl="1"
               align-self="center"
               v-for="(game,j) in category.titles"
               v-bind:key="game.title"
               v-bind:class="{ 'elevation-8': (showPopup || hoverCarousel) && currentGame!==null && i===currentGame.y && j===currentGame.x }"
               @mouseenter="hover(i,j)"
               @mouseleave="unhover"
        >
          <v-img class="ma-2" :src="game.icon" @click="goto(game.esportsLink)"/>
        </v-col>
      </v-row>
    </div>

    <div
        style="top:0;left:0;width:100%;height:100%;position: absolute;z-index: 2;background: rgba(0, 0, 0, 0.6)"/>

    <div
        style="top:0;left:0;width:100%;height:100%;position: absolute;z-index: 0;background: rgba(0, 0, 0, 1)"/>

    <div style="top:0;left:0;width:100%;height:100%;position: absolute;z-index: 1;">
      <v-carousel id="carousel"
                  hide-delimiters
                  :show-arrows="false"
                  v-model="currentGameIndex"
                  light
                  style="height: 100%;z-index: 1;"
      >
        <v-carousel-item v-for="game in games.map(it => it.titles).flat()"
                         v-bind:key="game.title"
                         @mouseenter="hover(null,null)"
                         @mouseleave="unhover" style="z-index: 1;"
                         eager
        >
          <v-sheet height="100%" tile style="z-index: 1;background: rgba(0, 0, 0, 1)">
            <v-img :src="game.bg" eager
                   style="position: absolute;top: 0;height: 100%;width: 100%;z-index: 1;filter: blur(4px);-webkit-filter: blur(4px);"/>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
  </v-main>
</template>

<script>
import router from "@/router";

export default {
  name: "games-we-play",
  props: ["games", "color"],
  data: () => {
    return {
      showPopup: 0,
      currentGame: null,
      currentGameIndex: null,
      hoverCarousel: false
    }
  },
  methods: {
    hover(i, j) {
      setTimeout(() => {
        this.showPopup++;
        if (i !== null && j !== null) {
          this.currentGame = {y: i, x: j};

          var newIndex = 0
          for (let k = 0; k < i; k++) {
            newIndex += this.games[k].titles.length;
          }
          newIndex += j;
          this.currentGameIndex = newIndex;
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