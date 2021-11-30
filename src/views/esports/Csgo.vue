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
    <team :team="revenge"></team>
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
            name: 'Antons Naumenko',
            ign: 'DextoxTea'
          },
          {
            name: 'Jonas Valentijn',
            ign: 'Clunky'
          },
          {
            name: 'Mario Walvis',
            ign: 'TheCheeser'
          },
          {
            name: 'Reinier Algra',
            ign: 'Reign'
          },
          {
            name: 'Wilco Strijker',
            ign: 'FreeFall'
          },
        ],
        coaches: [
          {
            name: 'Horan Jagen',
            ign: 'DerpHagen'
          }
        ],
        substitutes: [
          {
            name: 'Tim Blok',
            ign: 'Sjonnie'
          },
          {
            name: 'Ivo Heitlager',
            ign: 'King Cookie'
          }
        ]
      },
      revenge: {
        name: 'BS Revenge',
        bg: require('../../assets/csgoesports2.jpg'),
        players: [
          {
            name: '',
            ign: 'Vinnyjj'
          },
          {
            name: '',
            ign: 'Mart10'
          },
          {
            name: '',
            ign: 'CaptainGork'
          },
          {
            name: '',
            ign: 'm1nml'
          },
          {
            name: '',
            ign: 'GuacamoleMen'
          },
        ],
        substitutes: [
          {
            name: '',
            ign: 'YSLyoungthug'
          },
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>