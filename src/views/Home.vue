<template>
  <v-app>
    <h1>Home</h1>

    <v-container>
      <v-layout row wrap justify-center>
        <v-flex xs10 sm5 md4 lg4 xl3 v-for="game in games" v-bind:key="game.title"
                class="ma-3" style="overflow: hidden; border-radius: 15px">
          <v-hover v-slot:default="{ hover }">

            <v-card color="#6bd098" height="250px" hover>

              <v-card-title style="display:block;" class="front">
                <img :src="game.icon"
                     class="front game-icon"
                     style="position: relative;"
                     :alt="game.title">

                <h2 class="game-title white--text font-weight-bold" v-text="game.title"></h2>
              </v-card-title>

              <v-card-subtitle v-if="game.competitive" class="front white--text">
                <p class="front" style="margin-top: 20px">COMPETITIVE</p>
              </v-card-subtitle>

              <v-slide-y-transition>
                <v-img :src="game.bg" v-show="hover" class="game-bg"></v-img>
              </v-slide-y-transition>

            </v-card>

          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>

  </v-app>
</template>

<script>

export default {

  data() {
    return {
      games: [
        {
          title: "League of Legends",
          bg: require("../assets/leaguebg.jpg"),
          icon: require("../assets/league.png"),
          competitive: true
        },
        {
          title: "Counter-Strike: Global Offensive",
          bg: require("../assets/csgobg.jpg"),
          icon: require("../assets/csgo.png"),
          competitive: true
        },
        {
          title: "Rocket League",
          bg: require("../assets/rocketleaguebg.jpg"),
          icon: require("../assets/rocketleague.png"),
          competitive: true
        },
        {
          title: "Super Smash Bros",
          bg: require("../assets/smashbg.jpg"),
          icon: require("../assets/smash.png"),
          competitive: true
        },
        // {
        //   title: "Overwatch",
        //   bg: require("../assets/.jpg"),
        //   icon: require("../assets/.png"),
        // },
        // {
        //   title: "Hearthstone",
        //   bg: require("../assets/.jpg"),
        //   icon: require("../assets/.png"),
        // },
        // {
        //   title: "Animal Crossing",
        //   bg: require("../assets/.jpg"),
        //   icon: require("../assets/.png"),
        // },
        // {
        //   title: "Dota 2",
        //   bg: require("../assets/.jpg"),
        //   icon: require("../assets/.png"),
        // },
        // {
        //   title: "Minecraft",
        //   bg: require("../assets/.jpg"),
        //   icon: require("../assets/.png"),
        // },
        // {
        //   title: "Pokémon",
        //   bg: require("../assets/.jpg"),
        //   icon: require("../assets/.png"),
        // },
        // {
        //   title: "Team Fight Tactics",
        //   bg: require("../assets/.jpg"),
        //   icon: require("../assets/.png"),
        // },
        // {
        //   title: "Valorant",
        //   bg: require("../assets/.jpg"),
        //   icon: require("../assets/.png"),
        // },
        // {
        //   title: "World of Warcraft",
        //   bg: require("../assets/.jpg"),
        //   icon: require("../assets/.png"),
        // },
      ]
    }
  }
}
</script>
<style>
.front {
  z-index: 10;
}

.game-icon {
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
