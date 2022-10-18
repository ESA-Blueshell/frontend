<template>
  <v-main>
    <top-banner title="Valorant"/>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <p class="body-1">
          Despite its recent entry to competitive gaming, Valorant has garnered its spot within
          Blueshell Esports community. Below you can find our competitive Valorant team.
        </p>
      </div>
    </div>
    <team :team="huge"/>
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
        name: 'BS Valorant',
        bg: require('../../assets/valorantesports1.jpg'),
        players: [
          {
            name: 'Sam de Vos',
            ign: 'Vossie17'
          },
          {
            name: 'Ismail El Fechka',
            ign: 'Chani'
          },
          {
            name: 'Görkem Çardak',
            ign: 'SonGoku'
          },
          {
            name: 'Cas van Peer',
            ign: 'AWESOME614'
          },
          {
            name: 'Henry Woolley',
            ign: 'Heny'
          },
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
