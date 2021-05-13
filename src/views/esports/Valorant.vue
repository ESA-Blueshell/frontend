<template>
  <v-main>
    <top-banner title="Valorant"></top-banner>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <p class="body-1">
          Despite its recent entry to competitive gaming, Valorant has garnered its spot within
          Blueshell Esports community. Below you can find our competitive Valorant team(s).
        </p>


      </div>
    </div>
    <team :team="huge"></team>
  </v-main>
</template>

<script>
import TopBanner from "../../components/top-banner";
import Team from "@/components/team";

export default {
  components: {Team, TopBanner},
  data: () => {
    return {
      huge: {
        name: 'BS Huge',
        bg: require('../../assets/valorantesports1.jpg'),
        players: [
          {
            name: 'Teun Kok',
            ign: 'Hyzaq'
          },
          {
            name: 'Ivo Heitlager',
            ign: 'King Cookie'
          },
          {
            name: 'Thomas Rijgersberg',
            ign: 'LpC'
          },
          {
            name: 'Gorkem Cardak',
            ign: 'SonGoku'
          },
          {
            name: 'Mario Wal',
            ign: 'TheCheeser'
          },
          {
            name: 'Ziad Elleithy',
            ign: 'ZenoXed'
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>