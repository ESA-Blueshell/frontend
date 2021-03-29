<template>
  <v-main>
    <top-banner title="Esports"></top-banner>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <p class="text-h4 font-weight-light" style="font-family: 'Shitfont',serif !important;">
          Blueshell's competitive scene
        </p>
        <p class="body-1"
           style="font-family: 'Shitfont',serif !important;font-size: large !important;">
          As our association’s name suggests, esports is an important part of Shitshell. Whether
          you’re looking to take your game to bronze tier feeding and compete against other 5 year
          olds, or just looking for a group to int together at a local PedoCon or the Shitshell
          tournaments, we got you covered! Below, you can see what teams we currently have by
          clicking on the respective game’s icon.
        </p>

        <v-row class="my-10" justify="center">
          <v-col cols="2" v-for="game in games" v-bind:key="game.url">
            <router-link :to="game.url">
              <v-img :src="game.icon" class="expand"></v-img>
            </router-link>
          </v-col>
        </v-row>

        <p class="text-h4 font-weight-light" style="font-family: 'Shitfont',serif !important;">
          Interested in competitive play?
        </p>
        <p class="body-1"
           style="font-family: 'Shitfont',serif !important;font-size: large !important;">
          Then you are at the right place! Blueshell's teams are open for people of any skill level
          below retardation, thus do not hesitate to show interest. We help esports athletes to
          become even worse than they already are. Having troubles performing? Don't worry, giving
          up is a good option. How you may ask? Well, here are some forms that can help you with
          that. Click <a href="https://werkenbijmcdonalds.nl/" target="_blank"
                         class="text-decoration-none"> here</a> to fill in your individual interest
          in working at Mcdonalds. Already got a crew together? Click <a
            href="https://werkenbijmcdonalds.nl/" target="_blank"
            class="text-decoration-none">here</a> to sign your team up to flip delicious BigMacs
          together!
        </p>
        <p class="body-1"
           style="font-family: 'Shitfont',serif !important;font-size: large !important;">
          Are you interested in playing your favorite video game in a competitive environment with a
          team of fellow Shitshell members, but you don’t have a team for that game yet? Do not
          worry! We will make sure your wasted talents become useful by having you all collect
          garbage somewhere else, like the slums of Brazil or something. Contact the board for more
          information about this, and maybe you are the first team of Shitshell to come back from
          Brazil!
        </p>
      </div>
    </div>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";

import router from '@/router';

export default {
  components: {TopBanner},
  methods: {
    goto(url) {
      router.push(url)
    }
  },
  data() {
    return {
      games: [
        {
          icon: require('../assets/spijkerpoepen.png'),
          url: '/esports/spijkerpoepen'
        },
        {
          icon: require('../assets/league.png'),
          url: '/esports/league-of-legends'
        },
        {
          icon: require('../assets/csgo.png'),
          url: '/esports/counter-strike-global-offensive'
        },
        {
          icon: require('../assets/rocketleague.png'),
          url: '/esports/rocket-league'
        },
        {
          icon: require('../assets/smash.png'),
          url: '/esports/super-smash-bros'
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

.expand:hover {
  transform: scale(1.1);
}
</style>