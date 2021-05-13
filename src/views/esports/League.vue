<template>
  <v-main>
    <top-banner title="League of Legends"></top-banner>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <p class="body-1">
          As it is around the globe, League of Legends as a competitive ground holds a special
          place in Blueshell Esports. Below you can find our competitive League of Legends
          team(s).
        </p>
      </div>
    </div>

    <team :team="primus" :name-right="false"></team>
    <team :team="fristiFighters" :name-right="true"></team>
  </v-main>
</template>

<script>
import TopBanner from "../../components/top-banner";
import Team from "@/components/team";

export default {
  components: {Team, TopBanner},
  data: () => {
    return {
      primus: {
        name: 'BS Primus',
        bg: require('../../assets/leagueesportsbg1.jpg'),
        players: [
          {
            name: 'Enzo Vicento',
            ign: 'DepressedBySoloQ'
          },
          {
            name: 'Swen Vosslamber',
            ign: 'Swirliix'
          },
          {
            name: 'Hidde Veldkamp',
            ign: 'Lateralus'
          },
          {
            name: 'Ziad Elleithy',
            ign: 'ZenoXed'
          },
          {
            name: 'Mart Ordelmans',
            ign: 'Vis Soepje'
          }
        ],
        coaches: [
          {
            name: 'Mark Ganzefles',
            ign: 'Magaera'
          }
        ],
        substitutes: [
          {
            name: 'Max Traas',
            ign: 'Captain Maxwell'
          }
        ]
      },
      fristiFighters: {
        name: 'BS Fristi Fighters',
        bg: require('../../assets/leagueesportsbg2.jpg'),
        players: [
          {
            name: 'Jasper Ligthart',
            ign: 'ShyGuy2328'
          },
          {
            name: 'Jari van Ravenstein',
            ign: 'j8stars'
          },
          {
            name: 'Lars Bossink',
            ign: 'Rallyman888'
          },
          {
            name: 'Ward Gesthuizen',
            ign: 'WARDSTRIDER'
          },
          {
            name: 'Mikaël Bos',
            ign: 'TheDarkSoul12'
          }
        ],
        substitutes: [
          {
            name: 'Alexander de Ranitz',
            ign: 'xXswaglordzXx'
          },
          {
            name: 'Otto Hajenius',
            ign: 'Th0tto'
          },
          {
            name: 'Maarten Dekker',
            ign: 'Bl4ckdragonn'
          },
          {
            name: 'Raymon de Lange',
            ign: 'Ironbone99'
          },
        ]
      }
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