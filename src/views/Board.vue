<template>
  <v-main>
    <top-banner title="Board"></top-banner>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <p class="text-h4 font-weight-bold text-center">
          Current board
        </p>
        <p class="body-1">
          Every year our association grows and takes a new shape, and in its 4th year, the board
          ensures the trend of evolution continues! We present you with the 4th board of Blueshell
          Esports!
        </p>
        <ul>
          <li>Ali Kalbiyev as the Chairman</li>
          <li>Ivo Heitlager as the Secretary and Commissioner of Esports</li>
          <li>Iskander Sterck as the Treasurer</li>
          <li>Lucia Kim as the Commissioner of Internal Affairs</li>
          <li>Jose Pratdesaba as the Commissioner of External Affairs</li>
        </ul>
        <v-expansion-panels accordion class="mt-8">
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
