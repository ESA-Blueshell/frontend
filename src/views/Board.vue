<template>
  <v-main>
    <top-banner title="Board"></top-banner>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <p class="text-h4 font-weight-bold text-center">
          Current board
        </p>
        <!-- TODO: write about board-->
        <p class="body-1">
          uhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
        </p>
      <v-expansion-panels accordion>
        <v-expansion-panel>
          <v-expansion-panel-header class="text-h5 font-weight-light">3rd board
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            Chairman: Jander “Thoran” Gilbers<br>
            Secretary/Treasurer: Joran “MacVanish” Hagen<br>
            Commissioner of Esports: Andrei “ElDonte” Raureanu<br>
            Commissioner of internal affairs: William “Lampekap88” Schaarman<br>
            Commissioner of external affairs: Allysha “Meavis” Sewradj
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="text-h5 font-weight-light">2nd board
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            Chairman: Jasper “JappieXD” van Harten<br>
            Secretary: Kimberly “Agile Manifesto” Evertz<br>
            Treasurer: Mauk “Dawarfmaster” Muller<br>
            Commissioner of Internal affairs: Antal “TheMadJokerHD” van Dongen<br>
            Commissioner of external affairs: Maiander “Maiantie” Eigenraam
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="text-h5 font-weight-light">1st board
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            Chairman: Thijs “Grootbuik” Lieverse<br>
            Secretary: Jan-Berend “JB” Mooijaart<br>
            Treasurer: Anne “Iadri” Schrader<br>
            Commissioner of internal affairs: Stijn “Salish” Overduin<br>
            Commissioner of external affairs: Idwer “Fangedsheep” de Vries
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      </div>
    </div>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";

export default {
  components: {TopBanner}
}
</script>

<style scoped>

</style>