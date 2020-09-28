<template>
  <v-app>
    <top-banner title="Home"></top-banner>


    <div class="mx-auto my-10" style="max-width: 600px">
      <p class="text-center text-h2 ma-3 font-weight-light">Who are we?</p>

      <p class="text-center subtitle-1 font-weight-light">
        We are Blueshell Esports, the gaming and esports student association at the University of
        Twente. We house a bustling gaming community, organize regular online and offline events and
        present opportunities for competitive play.</p>

    </div>

    <v-container class="mx-3 justify-center" align="center" >
      <v-row align="center">
        <v-col>

          <p class="text-center text-h3 ma-3 font-weight-light">About us</p>

        </v-col>
        <v-col>
          <p class="text-center text-h3 ma-3 font-weight-light">Esports</p>

        </v-col>
        <v-col>
          <p class="text-center text-h3 ma-3 font-weight-light">Events</p>

        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-layout row wrap justify-center>
        <game-card :game="game"
                   :color="i%3===0 ? `#6bd098` : i%3===1 ? `#fbc658` : `#e91e63`"
                   v-for="(game,i) in games"
                   v-bind:key="game.title">
        </game-card>
      </v-layout>
    </v-container>

  </v-app>
</template>

<script>

import GameCard from "@/components/game-card";
import TopBanner from "@/components/top-banner";

export default {
  components: {TopBanner, GameCard},
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
        {
          title: "Overwatch",
          bg: require("../assets/overwatchbg.jpg"),
          icon: require("../assets/overwatch.png"),
        },
        {
          title: "Hearthstone",
          bg: require("../assets/hearthstonebg.jpg"),
          icon: require("../assets/hearthstone.png"),
        },
        // {
        //   title: "Animal Crossing",
        //   bg: require("../assets/.jpg"),
        //   icon: require("../assets/.png"),
        // },
        {
          title: "Dota 2",
          bg: require("../assets/dota2bg.jpg"),
          icon: require("../assets/dota2.png"),
        },
        {
          title: "Minecraft",
          bg: require("../assets/minecraftbg.jpg"),
          icon: require("../assets/minecraft.png"),
        },
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

</style>
