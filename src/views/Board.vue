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

        <div class="d-flex flex-column">
        <div>
        <p class="text-h4" style="text-align: left; font-weight: bold">
        Ali “Kelbinoh” Kalbiyev - Chairman
      </p>
        <div>
          <img style="float:left; width: 400px;" src="../assets/kelbi.png" alt="Chairman" class="mr-8 mb-8">
          <p>
            My name is Ali Kalbiyev, mostly referred to as Kelbi. I am a 22-year old Computer Science Master’s student at the University of Twente and I am the current Chairman of Blueshell Esports! Blueshell originally caught my interest with its Minecraft server, though soon after it turned into my primary social circle in my graduate years. There’s a lot to love about being a board member of this beautiful association, though the things I love the most about it are turning our community’s ideas for events and activities into reality and bonding further with the rest of the board. And yeah, before I forget to add, I quite like Borderlands and Chess.
          </p>
        </div>
        </div>

        <div>
        <p class="text-h4" style="text-align: left; font-weight: bold">
          Lucia "Luna" Kim - Commissioner of Internal Affairs
        </p>
        <div>
          <img style="float:right; width: 400px;" src="../assets/lucia.png" alt="Internal" class="mr-8 mb-8">
          <p>
            Hi y’all! My name is Lucia, the Commissioner of Internal Affairs of Blueshell Esports. I am a Biomedical Engineering Master’s student at the University of Twente. I initially joined the association to find people to play games with, but after being active in some committees I decided to become Commissioner of Internal Affairs, because I enjoy organizing events for the association and communicating with our members. I hope you enjoy our community as much as I do!          </p>
        </div>
        </div>

        <div>
          <p class="text-h4" style="text-align: left; font-weight: bold">
            Jose “Bear” Pratdesaba Lopez - Commissioner of External Affairs
          </p>
          <div>
            <img style="float:left; width: 500px;" src="../assets/jose.jpeg" alt="External" class="mr-8 mb-8">
            <p>
              Hey everyone! My name is Jose Pratdesaba and I am the commissioner of external affairs! I’m a 20 year old student at the University of Twente looking to do my master’s in Biorobotics. Originally found out about Blueshell from a League of Legends tournament, then met one of my best friends on their minecraft server and the rest is history! I love to play shooter and story games like The Last of Us, God of War (2018), and L4D2, but I also love me some classic indie games like FTL: Faster Than Light and Ori and the Blind Forest. I’ve lived across 4 different countries and 3 continents so I’ve talked to people from all different places in life, so I was naturally drawn to the external affairs role and I couldn’t be happier. I also LOVE to cook so hit me up and we can make some late night fried chicken!
            </p>
          </div>
        </div>

        <div>
          <p class="text-h4" style="text-align: left; font-weight: bold">
            Ivo “King Cookie” Heitlager
          </p>
          <div>
            <img style="float:right; width: 400px;" src="../assets/ivo.jpeg" alt="Esports/Secretary" class="mr-8 mb-8">
            <p>
              I’m King Cookie, but sometimes I go by Ivo. I am addicted to video games.
            </p>
          </div>
        </div>

        <div>
          <p class="text-h4" style="text-align: left; font-weight: bold">
            Tjebbe “Issie54” Iskander Sterck
          </p>
          <div>
            <img style="float:left; width: 500px;" src="../assets/iskander.png" alt="Treasurer" class="mr-8 mb-8">
            <p style="text-align: left">
              Hi all. I’m Iskander, current treasurer (aka mula meester) of Blueshell. And currently in my third year of Advanced Technology (If you like extensive theoretical explanations, don’t choose this study). I was baited into Blueshell through a League of Legends tournament by a friendly rat (although to be honest, stopping with actively playing League of Legends has been one of the best decisions in my life). I became treasurer because I like fucking around with numbers and in the hope of organising many offline activities for Blueshell - Iskander 2020… yea we know how that turned out… That aside I hope you all enjoy our (currently offline) activities! See you there!
            </p>
          </div>
        </div>
        </div>

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
