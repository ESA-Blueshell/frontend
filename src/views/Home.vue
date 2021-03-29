<template>
  <v-main>
    <main-banner/>

    <v-container>
      <div class="mx-auto my-10" style="max-width: 600px">
        <p class="text-center text-h2 font-weight-light"
           style="font-family: 'Shitfont',serif !important;font-weight: bold !important;">
          WHO WE WUZ?
        </p>

        <p class="text-center subtitle-1"
           style="font-family: 'Shitfont',serif !important;font-weight: bold !important;">
          This website has been hijacked by the one and only Shitshell. DAS RITE, WE WUZ DA KANGZ OF
          BLUESHELL NOW. GAMING IS NO MORE. FIND THE EASTER EGG TO GET THIS SHITTY SITE BACK
          HARHARHARHAR
        </p>
      </div>
    </v-container>

    <v-container class="mb-10">
      <v-row class="text-center" justify="center">
        <v-col v-for="col in columns" v-bind:key="col.title"
               class="mx-4" style="max-width:450px;min-width: 350px;min-height: 250px"
               align-self="center"
               :id="'column '+ col.title">
          <div class="expand" style="width: 100%" @click="goto(col.url)">
            <v-icon x-large :color="col.color" class="icon" v-html="col.icon"></v-icon>
            <p class="text-h3 ma-3 font-weight-thin" v-html="col.title"
               style="font-family: 'Shitfont',serif !important;font-weight: bold !important;"></p>
          </div>
          <p class="font-weight-light mx-auto" style="max-width: 400px" v-html="col.text"></p>
        </v-col>
      </v-row>
    </v-container>

    <discord-banner/>

    <!--    <v-container>-->
    <p class="mx-auto text-center text-h2 mt-10"
       style="font-family: 'Shitfont',serif !important;font-weight: bold !important;">
      Games we play
    </p>
    <p class="mx-auto text-center text-h4 font-weight-light mb-3"
       style="font-family: 'Shitfont',serif !important;">
      Competitive
    </p>
    <game-icons :games="games"></game-icons>

    <p class="mx-auto text-center text-h4 font-weight-light mt-4 mb-3"
       style="font-family: 'Shitfont',serif !important;">
      Community
    </p>
    <game-icons :games="communityGames"></game-icons>
    <!--    </v-container>-->

    <socials-banner class="mt-10"></socials-banner>

  </v-main>
</template>

<script>

import MainBanner from "@/components/main-banner";
import router from "@/router";
import DiscordBanner from "@/components/discord-banner";
import GameIcons from "@/components/game-icons";
import SocialsBanner from "@/components/socials-banner";

export default {
  components: {SocialsBanner, GameIcons, DiscordBanner, MainBanner},
  methods: {
    goto(url) {
      if (url.includes('https://')) {
        let win = window.open(url, '_blank');
        win.focus();
      } else {
        router.push(url)
      }
    }
  },
  data() {
    return {
      hoveredGame: null,
      games: [
        {
          title: "Huniepop",
          bg: require("../assets/huniepopbg.jpg"),
          icon: require("../assets/huniepop.png"),
        },
        {
          title: "Club Penguin ban any%",
          bg: require("../assets/clubpenguinbg.jpg"),
          icon: require("../assets/clubpenguin.png"),
        },
        {
          title: "VRchat",
          bg: require("../assets/vrchatbg.gif"),
          icon: require("../assets/vrchat.png"),
        },
        {
          title: "Competitive spijkerpoepen",
          bg: require("../assets/spijkerpoepenbg.jpg"),
          icon: require("../assets/spijkerpoepen.png"),
        },
      ],
      communityGames: [
        {
          title: "Cool meth games",
          bg: require("../assets/coolmathgamesbg.jpg"),
          icon: require("../assets/coolmathgames.png"),
        },
        {
          title: "Candy Crush Saga™",
          bg: require("../assets/candycrushbg.jpg"),
          icon: require("../assets/candycrush.png"),
        },
        {
          title: "E. T.",
          bg: require("../assets/etbg.jpg"),
          icon: require("../assets/et.png"),
        },
        {
          title: "Marvel's Avengers",
          bg: require("../assets/avengersbg.jpg"),
          icon: require("../assets/avengers.png"),
        },
        {
          title: "Click me",
          bg: require("../assets/bluechickenbg.jpg"),
          icon: require("../assets/bluechicken.png"),
        },
        {
          title: "Ring Fit Adventure",
          bg: require("../assets/ringfitbg.jpg"),
          icon: require("../assets/ringfit.png"),
        },
        {
          title: "Amoung us",
          bg: require("../assets/amongusbg.jpg"),
          icon: require("../assets/amongus.png"),
        },
        {
          title: "Among us",
          bg: require("../assets/amongusbg.jpg"),
          icon: require("../assets/amongus.png"),
        },
        {
          title: "Ş̸͙͇͕͔̤̱̩̯̮̰͈̯̠̰͉̩̿̊̅͜U̴̢͉̦̜͔̫̜̪̟̩̘͕̪̼͓̩̻̤͆͗̌̈́̊̒̕̕͝Ş̴͉̜̲̣͙̖̖̉̈́̐ ̷̛͇͖̰̊́̌̑̋͆̑͝S̶̤̞͙͙̩̗͚̋̏́̔̈́͊̾͛̀̌͘̚͜Ǔ̸̦̹͎̰͚̈̀͊̑̓͝S̷̡̨̛͈͇̝͖̩͇̩̙͉̹͙̏̑̇͐͒͌͊̅͌̿̋̓̔́͌̚͝ ̵̢̨̛̬̩̝̝̦͈̟̥̼̰̻̝͎̹͓́͋̄̈́́͋̏̓̎̈̈̔̾͆̽͝S̸̨̯̫͚̫̘͇͙̼̳̗̮̗̪̰̲̫̥̈́̎̓̋̉̅͌̏̕͜U̶̧̢̮̺̜̬̭͇̣̰̠͙̳̘͕̯̓̓͊̑̉̏́͆̿̅̑͛͗̃͛̌̚͝S̷̛̯͙̯̈́̑̾̈́͒́͊̂͋̂͊̈́̓̂͝ ̷̢̫̳̠̗̻̮̝̭̳̹̥̣̖̒̊͑́́̃͆̊̐S̴̪̩̯̗̞͇̙͖͈̖̥͋̃̊̔̾̌̓̔̿̅̄̕͝U̶͖͇̍͑̊̈́̌̀̐̔͊̀͑̂̋̌̀́̋͋͠ͅS̵̱͔̄̇̅̀͑̎͘ ̴̖͍͈̣͇̩͖̪̼̙̗̦͕̫̆̊͜ͅͅS̴̩̯͑̋͒̾̆͂̈̏̔́̈́́̇̓̆͌͠Ṵ̷̩̳̘̟̱̜̮̼̤͑̾̍̽̄͌̀́̑͐̐̈̾͝͝Ṣ̵̨̼̥̰͕̮̰̰͖̾̏͘ͅ ̵̨̱́̅̈́̾̊͗̀̄̔͝S̴̡̛͍͎̓̎́͗͒̈̅͌̄͋̅̈͊̈́̚̕̚͠U̷̧̝͎̙̜̥̫̥͉̇̓̌̍́̔͋̂͂̂͗͘͘͝Ş̶̹̣̞̩̺͙̩̻̦̫̗̎͜ͅ ̸̨̧͇̤̱̙̼̼̪͈̓͜S̸̡̧̢̗̱̗͈̪͚̰̽̓̏Ṳ̴̈́̈́̋͋̑̎̊͆̉̍̈̄̓̌͋͆͂̕̕S̶̛̹͕͈̝̗̠͇͂̏̎̾̒̉͒̿̈́̅̚͘͠",
          bg: require("../assets/susbg.jpg"),
          icon: require("../assets/amongus.png"),
        },
      ],
      columns: [
        {
          icon: "mdi-account-group",
          color: "red darken-2",
          title: "About me",
          url: "/aboutus",
          text: "Despite its memerbase, Shitshell Esports is a relatively young student association with only 4 years since its inception, unfortunately still not legal in any country. Learn all about me by clicking above!"
        },
        {
          icon: "mdi-trophy",
          color: "yellow darken-2",
          title: "Esports",
          url: "/esports",
          text: "As the name of our association suggests, E-Sports is an integral part of Shitshell. Click the icon above to find more information on what we offer!"
        },
        {
          icon: "mdi-calendar",
          color: "blue darken-2",
          title: "Events",
          url: "/events",
          text: "To keep our community entertained, Shitshell hosts events of many kinds with the help of incapable committees. Click above to see the upcoming events!"
        },
      ],
      partners: []
    }
  },
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
