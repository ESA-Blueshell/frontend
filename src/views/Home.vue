<template>
  <v-main>
    <main-banner/>

    <v-container>
      <div class="mx-auto my-10" style="max-width: 600px">
        <p class="text-center text-h2 font-weight-light">Who are we?</p>

        <p class="text-center subtitle-1 font-weight-light">
          We are Blueshell Esports, the gaming and esports student association at the University of
          Twente. We house a bustling gaming community, organize regular online and offline events
          and present opportunities for competitive play.</p>
      </div>
    </v-container>

    <v-container>
      <v-row class="text-center" justify="center">
        <v-col v-for="col in columns" v-bind:key="col.title"
               class="mx-4" style="max-width:450px;min-width: 350px;min-height: 250px"
               align-self="center"
               :id="'column '+ col.title">
          <div class="expand" style="width: 100%" @click="goto(col.url)">
            <v-icon x-large :color="col.color" class="icon" v-html="col.icon"></v-icon>
            <p class="text-h3 ma-3 font-weight-thin" v-html="col.title"></p>
          </div>
          <p class="font-weight-light mx-auto" style="max-width: 400px" v-html="col.text"></p>
        </v-col>
      </v-row>
    </v-container>

    <discord-banner/>

    <!--    <v-container>-->
    <p class="mx-auto text-center text-h2 mt-6">
      Esports we play
    </p>
    <game-icons :games="games"></game-icons>

    <p class="mx-auto text-center text-h2 mt-4">
      Community games
    </p>
    <game-icons :games="communityGames"></game-icons>
    <!--    </v-container>-->

    <v-container>
      <v-row justify="center" align="center">
        <v-col v-for="partner in partners" v-bind:key="partner.url" md="3">
          <v-img :src="partner.logo"
                 max-width="400"
                 class="mx-auto expand"
                 @click="goto(partner.url)">
          </v-img>
        </v-col>
      </v-row>

    </v-container>

  </v-main>
</template>

<script>

import MainBanner from "@/components/main-banner";
import router from "@/router";
import DiscordBanner from "@/components/discord-banner";
import GameIcons from "@/components/game-icons";
import store from '@/store'

export default {
  components: {GameIcons, DiscordBanner, MainBanner},
  methods: {
    goto(url) {
      router.push(url)
    }
  },
  data() {
    return {
      hoveredGame: null,
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
      ],
      communityGames: [
        {
          title: "Overwatch",
          bg: require("../assets/overwatchbg.jpg"),
          icon: require("../assets/overwatch.png"),
        },
        {
          title: "Animal Crossing",
          bg: require("../assets/animalcrossingbg.jpg"),
          icon: require("../assets/animalcrossing.png"),
        },
        {
          title: "Minecraft",
          bg: require("../assets/minecraftbg.jpg"),
          icon: require("../assets/minecraft.png"),
        },
        {
          title: "Pokémon",
          bg: require("../assets/pokemonbg.jpg"),
          icon: require("../assets/pokemon.png"),
        },
        {
          title: "Team Fight Tactics",
          bg: require("../assets/tftbg.jpg"),
          icon: require("../assets/tft.png"),
        },
        {
          title: "Valorant",
          bg: require("../assets/valorantbg.jpg"),
          icon: require("../assets/valorant.png"),
        },
        {
          title: "World of Warcraft",
          bg: require("../assets/wowbg.jpg"),
          icon: require("../assets/wow.png"),
        },
        {
          title: "Card games",
          bg: require("../assets/cardgamesbg.jpg"),
          icon: require("../assets/hearthstone.png"),
        },
        {
          title: "Strategy games",
          bg: require("../assets/stratbg.jpg"),
          icon: require("../assets/strat.png"),
        },
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
      ],
      partners: [
        {
          logo: require("../assets/elnino.png"),
          url: "/partners/el-nino"
        },
        {
          logo: require("../assets/OGD.png"),
          url: "/partners/ogd-ict"
        }
      ]
    }
  },
  mounted() {

    console.log(store.state.shitSite)
    if (store.state.shitSite) {
      var ps = document.getElementsByTagName("p");
      for (let i = 0; i < ps.length; i++) {
        ps[i].style += ";font-family: 'Shitfont', sans-serif !important"
      }
      var lis = document.getElementsByTagName("li");
      for (let i = 0; i < lis.length; i++) {
        lis[i].style += ";font-family: 'Shitfont', sans-serif !important"
      }
      var buttonTexts = document.getElementsByClassName("v-btn__content");
      for (let i = 0; i < buttonTexts.length; i++) {
        buttonTexts[i].style += ";font-family: 'Shitfont', sans-serif !important"
      }
      // document.getElementById("column Esports").
    }
  }
}
</script>
<style>
.expand {
  transition: transform .2s;
  cursor: pointer;
}

.expand:hover .icon {
  transform: scale(1.1) translateY(-10px);
}
</style>
