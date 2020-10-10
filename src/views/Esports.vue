<template>
  <v-app>
    <top-banner title="Esports"></top-banner>
    <div class="mx-5">
      <div class="mx-auto my-10" style="max-width: 800px">
        <p class="text-h4 font-weight-bold">
          Blueshell's competitive scene
        </p>
        <p class="body-1">
          As our association’s name suggests, esports is an important part of Blueshell. Whether
          you’re looking to take your game to the next level and compete against other universities,
          or just looking for a group to compete together within Clash or the Blueshell tournaments,
          we got you covered! Below, you can see what teams we currently have by clicking on the
          respective game’s icon.
        </p>

        <v-row class="my-10">
          <v-col cols="3" v-for="game in games" v-bind:key="game.url">
            <router-link :to="game.url">
              <v-img :src="game.icon" class="expand"></v-img>
            </router-link>
          </v-col>
        </v-row>

        <p class="text-h4 font-weight-bold">
          Interested in competitive play?
        </p>
        <p class="body-1">
          Then you are at the right place! Blueshell's teams are open for people of any skill level,
          thus do not hesitate to show interest. How you may ask? Well, here are some forms that can
          help you with that. Click <a href="https://forms.gle/kXPGTU6kXvRjhXnc7" target="_blank"
                                       class="text-decoration-none">here</a> to fill in your
          individual interest in the esports scene. Already got a crew together? Click <a
            href="https://forms.gle/tJ8TkeQ6cD24hjm4A" target="_blank" class="text-decoration-none">here</a>
          to sign your team up! </p>
        <p class="body-1">
          Are you interested in playing your favorite video game in a competitive environment with a
          team of fellow Blueshell members, but we don’t have a team for that game yet? Do not
          worry! With your initiative and the help of Blueshell a lot is possible. Contact the board
          for more information about this, and maybe you are the first team of Blueshell to play for
          your favorite game.
        </p>
        <p class="body-1">
          Still got some questions left? Do not hesitate to send an email to us at
          <a href="mailto:esports@blueshell.utwente.nl" target="_blank"
             class="text-decoration-none">esports@blueshell.utwente.nl</a>!
        </p>
      </div>
    </div>
  </v-app>
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
        }
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