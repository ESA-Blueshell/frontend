<template>
  <v-main>
    <top-banner title="League of Legends"/>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <p class="body-1">
          As it is around the globe, League of Legends as a competitive ground holds a special
          place in Blueshell Esports. Below you can find our competitive League of Legends
          team(s).
        </p>
      </div>
    </div>

    <team :team="scaling"/>
  </v-main>
</template>

<script>
import TopBanner from "../../components/top-banner";
import Team from "@/components/team";

export default {
  components: {Team, TopBanner},
  data: () => {
    return {
      scaling: {
        name: 'BS Scaling',
        bg: require('../../assets/leagueesportsbg1.jpg'),
        players: [
          {
            name: 'Wilco Strijker',
            ign: 'Fill Main'
          },
          {
            name: 'Thomas van den Brink',
            ign: 'ThompieB'
          },
          {
            name: 'Bob Even',
            ign: 'Bobbus'
          },
          {
            name: 'Mark Ganzevles',
            ign: 'BS Magaera'
          },
          {
            name: 'Ivo Heitlager',
            ign: 'BS King Cookie'
          }
        ],
        coaches: [
          {
            name: 'Hielke Kleijsen',
            ign: 'OG Klutch'
          }
        ]
      },
    }
  }
}
</script>

<style>
.v-parallax__content {
  padding-left: 0 !important;
  padding-right: 0 !important;
}


</style>
