<template>
  <div>
    <v-row wrap align="center" justify="center" align-content="center" class="mx-auto mb-6" style="max-width: 1400px">
      <v-col class="mx-1 transition-swing"
             style="border-radius: 15px;padding: 4px"
             cols="2" sm="1" md="1" lg="1" xl="1"
             align-self="center"
             v-for="(game,i) in games"
             v-bind:key="game.title"
             v-bind:class="{ 'elevation-8': (showPopup || hoverCarousel) && i===currentGame }"
             @mouseenter="hover(i)"
             @mouseleave="unhover"
      >
        <v-img :src="game.icon" @click="goto(game.esportsLink)"/>
      </v-col>
    </v-row>


    <v-expand-transition>
      <v-carousel class="mx-auto" style="max-height: 400px;max-width: 1000px"
                  hide-delimiters
                  :show-arrows="false"
                  v-show="showPopup || hoverCarousel"
                  v-model="currentGame"
                  light
      >
        <v-carousel-item
            v-for="game in games"
            v-bind:key="game.title"
            @mouseenter="hoverCarousel=true"
            @mouseleave="hoverCarousel=false"
        >
          <v-sheet height="100%" tile>
            <v-row class="fill-height">
              <v-col>
                <v-img class="mx-auto" :src="game.bg" width="400" :aspect-ratio="16/9"/>
                <p class="mx-auto my-4 text-center text-h3 font-weight-light">
                  {{ game.title }}
                </p>
              </v-col>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-expand-transition>

  </div>
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
        this.currentGame = i;
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