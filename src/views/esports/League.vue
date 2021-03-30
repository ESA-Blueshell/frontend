<template>
  <v-main>
    <top-banner title="League of Legends"></top-banner>

    <div>
      <div class="mx-auto my-10">

        <p class="mx-auto body-1 mb-10" style="max-width: 800px">
          As it is around the globe, League of Legends as a competitive ground holds a special
          place in Blueshell Esports. Below you can find our competitive League of Legends
          team(s).
        </p>
        <v-parallax :src="require('../../assets/leagueesportsbg.jpg')" height="400">
          <div style="background: rgba(0,0,0,0.5);width: 100%;height: 100%">


            <v-row justify="center" align-content="center" align="center">
              <v-col cols="3">
                <p class="text-h3 font-italic text-center" >
                  BS Primus
                </p>
              </v-col>
              <v-col cols="3" >
                <v-row v-for="(player,i) in this.primus.players" :key="player.ign" style="width: 100%">
                  <v-col cols="1">
                    {{ i === 0 ? 'Players' : '' }}
                  </v-col>
                  <v-col cols="5">
                    {{ player.name }}
                  </v-col>
                  <v-col class="text-right" cols="5">
                    {{ player.ign }}
                  </v-col>
                </v-row>
<!--                <v-row v-for="(player,i) in this.primus.coaches" :key="player.ign">-->
<!--                  <v-col>-->
<!--                    {{ i === 0 ? 'Coaches' : '' }}-->
<!--                  </v-col>-->
<!--                  <v-col>-->
<!--                    {{ player.name }}-->
<!--                  </v-col>-->
<!--                  <v-col>-->
<!--                    {{ player.ign }}-->
<!--                  </v-col>-->
<!--                </v-row>-->
<!--                <v-row v-for="(player,i) in this.primus.substitutes" :key="player.ign">-->
<!--                  <v-col>-->
<!--                    {{ i === 0 ? 'Substitutes' : '' }}-->
<!--                  </v-col>-->
<!--                  <v-col>-->
<!--                    {{ player.name }}-->
<!--                  </v-col>-->
<!--                  <v-col>-->
<!--                    {{ player.ign }}-->
<!--                  </v-col>-->
<!--                </v-row>-->
              </v-col>
            </v-row>
          </div>
        </v-parallax>
      </div>
    </div>


    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <v-img :src="require('../../assets/leaguebanner.png')" class="mb-5"></v-img>
        <p class="body-1">
          The game with one of the largest player bases worldwide, League of Legends, is a
          competitive environment. Because there are so many players, also at the UT, this
          is
          where Blueshell started. After an amazing LoL tournament at the end of 2017, we
          are now
          looking towards organizing an internal competition.
        </p>
        <p class="body-1">
          Moreover, the Dutch College League hosts a national League of Legends
          competition for
          associations. We would love to have Blueshell represented there, so if you are
          interested please contact the board or ask on <a href="https://discord.gg/WyDhbAP"
                                                           target="_blank"
                                                           class="text-decoration-none">Discord</a>.
        </p>
        <p class="body-1">
          We are also open to having more teams for League of Legends and we are actually
          looking to build a team for the next season of Talent League. If you are
          interested in trialing, contact the Commissioner of Esports,
          King Cookie#4902, on
          <a href="https://discord.gg/WyDhbAP" target="_blank"
             class="text-decoration-none">Discord</a>!
        </p>
        <p class="text-h4 font-weight-light">
          The Team
        </p>
        <v-container>
          <v-row v-for="player in players" v-bind:key="player.name" no-gutters>
            <v-col style="max-width: 100px">
              <p class="body-1">
                {{ player.role }}
              </p>
            </v-col>
            <v-col>
              <p class="body-1">
                {{ player.name }}
              </p>
            </v-col>
          </v-row>
        </v-container>

        <p class="text-h4 font-weight-light">
          Achievements
        </p>
        <ul>
          <li> 2nd place in DCL (Dutch College League) Talent League Season 4.</li>
          <li> 3rd place in DCL (Dutch College League) Premier League Season 5.</li>
        </ul>
      </div>
    </div>
  </v-main>
</template>

<script>
import TopBanner from "../../components/top-banner";

export default {
  components: {TopBanner},
  data: () => {
    return {
      primus: {
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