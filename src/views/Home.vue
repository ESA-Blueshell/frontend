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

    <v-container>
      <v-row class="text-center" justify="center">
        <v-col v-for="col in columns" v-bind:key="col.title"
               class="mx-4" style="max-width:450px;min-width: 350px;min-height: 250px" align-self="center">
          <div class="expand" style="width: 100%" @click="goto(col.url)">
            <v-icon x-large :color="col.color" class="icon" v-html="col.icon"></v-icon>
            <p class="text-h3 ma-3 font-weight-thin" v-html="col.title"></p>
          </div>
          <p class="font-weight-light mx-auto" style="max-width: 400px" v-html="col.text"></p>
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
import router from "@/router";

export default {
  components: {TopBanner, GameCard},
  methods: {
    goto(url) {
      router.push(url)
    }
  },
  data() {
    return {
      games: [
        {
          title: "League of Legends",
          bg: require("../assets/leaguebg.jpg"),
          icon: require("../assets/league.png"),
          esportsLink: "/esports/league-of-legends"
        },
        {
          title: "Counter-Strike: Global Offensive",
          bg: require("../assets/csgobg.jpg"),
          icon: require("../assets/csgo.png"),
          esportsLink: "/esports/counter-strike-global-offensive"
        },
        {
          title: "Rocket League",
          bg: require("../assets/rocketleaguebg.jpg"),
          icon: require("../assets/rocketleague.png"),
          esportsLink: "/esports/rocket-league"
        },
        {
          title: "Super Smash Bros",
          bg: require("../assets/smashbg.jpg"),
          icon: require("../assets/smash.png"),
          esportsLink: "/esports/super-smash-bros"
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
      ],
      columns: [
        {
          icon: "mdi-account-group",
          color: "red darken-2",
          title: "About us",
          url: "/aboutus",
          text: "Despite its memberbase, Blueshell Esports is a relatively young student association with only 4 years since its inception. Learn all about our association by clicking above!"
        },
        {
          icon: "mdi-trophy",
          color: "yellow darken-2",
          title: "Esports",
          url: "/esports",
          text: "As the name of our association suggests, esports is an integral part of Blueshell. Click the icon above to find more information on what we offer!"
        },
        {
          icon: "mdi-calendar",
          color: "blue darken-2",
          title: "Events",
          url: "/events",
          text: "To keep our community entertained, Blueshell hosts events of many kinds with the help of member-run committees. Click above to see the upcoming events!"
        },
      ]
    }
  }
}
</script>
<style>
.expand {
  transition: transform .2s;
}

.expand:hover .icon {
  transform: scale(1.1) translateY(-10px);
}
</style>
