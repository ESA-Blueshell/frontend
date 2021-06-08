<template>
  <v-main>
    <top-banner title="Counter-Strike: Global Offensive"></top-banner>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <p class="body-1">
          With shooters’ prevalence in the global esports scene, Blueshell Esports’s CS:GO teams are
          trying to climb up the charts with those sweet headshots! Below you can find our
          competitive CS:GO team(s).
        </p>
      </div>
    </div>
    <team :team="hypers"></team>
  </v-main>
</template>

<script>
import TopBanner from "../../components/top-banner";
import Team from "@/components/team";

export default {
  components: {Team, TopBanner},
  data: () => {
    return {
      hypers: {
        name: 'BS HyperS',
        bg: require('../../assets/csgoesports1.jpg'),
        players: [
          {
            name: 'Thomas Rijgersberg',
            ign: 'LpC'
          },
          {
            name: 'Jonas Valentijn',
            ign: 'Clunky'
          },
          {
            name: 'Gorkem Cardak',
            ign: 'SonGoku'
          },
          {
            name: 'Reinier Algra',
            ign: 'Reign'
          },
          {
            name: 'Wilco Strijker',
            ign: 'FreeFall'
          },
          {
            name: 'Ivo Heitlager',
            ign: 'King Cookie'
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>