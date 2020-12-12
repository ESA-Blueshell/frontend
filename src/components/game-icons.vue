<template>
  <div>
    <v-row wrap align="center" justify="center" align-content="center" class="mx-auto mb-6"
           style="max-width: 1400px">
      <v-col class="mx-1 transition-swing"
             style="border-radius: 15px;padding: 4px"
             cols="2" sm="2" md="1" lg="1" xl="1"
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
      <v-carousel id="carousel"
                  class="mx-auto elevation-8"
                  style="max-height: 337.5px;max-width: 600px;border-radius: 30px"
                  hide-delimiters
                  :show-arrows="false"
                  v-show="showPopup || hoverCarousel"
                  v-model="currentGame"
                  light
                  :height="9.0 * $vuetify.breakpoint.width / 16.0"
      >
        <v-carousel-item
            v-for="game in games"
            v-bind:key="game.title"
            @mouseenter="hover(null)"
            @mouseleave="unhover"
        >
          <v-responsive :aspect-ratio="16/9">
            <v-sheet height="100%" tile>
              <v-img :src="game.bg"
                     eager
                     style="position: absolute;top: 0;z-index: 400;height: 100%"/>
              <div style="display: table" class="overlay">
                <p style="display: table-cell; vertical-align: middle;"
                   class="mx-auto my-4 text-center text-h4 font-weight-light white--text">
                  {{ game.title }}
                </p>
              </div>
            </v-sheet>
          </v-responsive>
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

<style scoped lang="scss">
.overlay {
  position: absolute;
  bottom: 60px;
  height: 40%;
  width: 100%;
  z-index: 500;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 30px;
  overflow: hidden;
}
</style>