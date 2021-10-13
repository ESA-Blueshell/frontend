<template>
  <v-main>
    <top-banner title="Esports"></top-banner>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <p class="text-h4 font-weight-light">
          Blueshell's Competitive Scene
        </p>

        <p class="body-1">
          Esports is an important component of Blueshell. There are several student leagues that
          serves the purpose of bringing student teams together in fiery competitive play. We make a
          distinction between <i>College Leagues</i> and <i>Tournaments</i>.
        </p>
        <p class="body-1">
          We have teams for Student League such as League of Legends' Dutch College League (DCL).
          These leagues are played in a series of games and seasons to determine which university
          has the best and strongest team. For current leagues, we recruit members and make teams.
          The number of teams depends on how the college leagues are structured and whether they
          have multiple divisions. Furthermore, we will always try to look for more opportunities on
          a national level and find new games.
        </p>
        <p class="body-1">
          Tournaments are a rare or yearly occurrence where third party organizations (LAN parties,
          non-profit organizations, companies, football clubs) organize an event catered to one or
          more competitive games. They have no 'seasons' of competitive play. For these types of
          tournaments, we unfortunately do not have any active teams yet.
        </p>
        <p class="body-1">
          Click on one of the icons below to check out the teams we have for these games.
        </p>

        <v-row class="my-10" justify="center">
          <v-col cols="3" v-for="game in games" v-bind:key="game.url">
            <router-link :to="game.url">
              <v-img :src="game.icon" class="expand"></v-img>
            </router-link>
          </v-col>
        </v-row>

        <p class="text-h4 font-weight-light">
          Interested in competitive play?
        </p>
        <p class="body-1">
          Are you interested representing Blueshell Esports in your competitive pursuit? Whether you
          have a team or not, we would gladly welcome you and help you become the best version of
          yourself! Please contact <a href="mailto:esports@blueshell.utwente.nl" target="_blank"
                                      class="text-decoration-none">esports@blueshell.utwente.nl</a>
          to discuss the details.
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
          icon: require('../assets/league.png'),
          url: '/esports/league-of-legends'
        },
        {
          icon: require('../assets/csgo.png'),
          url: '/esports/counter-strike-global-offensive'
        },
        {
          icon: require('../assets/valorant.png'),
          url: '/esports/valorant'
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