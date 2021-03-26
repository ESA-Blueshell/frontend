<template>
  <v-main>
    <top-banner title="Committees"></top-banner>
    <div class="mx-auto my-10" style="max-width: 800px">
      <div class="mx-3">
        <p class="body-1">
          Would you like to make the most of your student life, and experience what it is to work
          together with other students to make great things happen? If so, then perhaps joining a
          committee is something for you! Committees are groups of students that work together to
          organize events or provide services for the association, while also having a lot of fun
          and getting some professional experience. </p>
        <p class="body-1">
          If you would like to join a meeting to see if we are something for you, or if you have a
          question, feel free to contact the board at
          <a href="mailto:internal-affairs@blueshell.utwente.nl">internal-affairs@blueshell.utwente.nl</a>
          . You could also ask us on Discord or in person at one of the events.
        </p>
        <p class="body-1">
          Do you have a great idea for an event or a new committee, then be sure to contact us!
        </p>
      </div>
      <v-expansion-panels accordion>
        <v-expansion-panel v-for="committee in committees" v-bind:key="committee.name">
          <v-expansion-panel-header class="text-h5 font-weight-light" style="font-family: 'Shitfont',serif !important;font-weight: bold !important;">
            {{ committee.name }}
          </v-expansion-panel-header>
          <v-expansion-panel-content style="font-size: larger !important;">
            <p v-if="committee.name !=='DegeneraCie'">
              {{ committee.description }}
            </p>
            <video autoplay loop controls v-else height="500">
              <source src="../assets/fuckanime.mp4"  type="audio/mp4">
            </video>
            <p v-if="committee.name !=='SmashCie'">
            </p>
            <img v-else style="float:right;width: 400px" src="../assets/groomer.jpg" alt="smashcie">
            <p v-if="committee.name !=='SiteCie'">
            </p>
            <img v-else style="float:right;width: 400px" src="../assets/averagesiteciemember.jpg" alt="sitecie">
            <p v-if="committee.name !=='ShitpostCie'">
            </p>
            <img v-else style="float:right;width: 400px" src="../assets/shitpostcie.jpg" alt="shitpostcie">
            <p v-if="committee.why"><b>
              Why join?
            </b></p>
            <p v-if="committee.why">
              {{ committee.why }}
            </p>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-main>
</template>
<script>
import TopBanner from "@/components/top-banner";

export default {
  components: {TopBanner},
  data: () => {
    return {
      committees: [
        {
          name: "LegaCie",
          description: "Dead lol.",
          why: "Join ShitpostCie."
        }, {
          name: "SiteCie",
          description: "Literally incompetent.",
          why: "Join ShitpostCie."
        }, {
          name: "SmashCie",
          description: "Currently in jail for certain allegations.",
          why: "Join ShitpostCie."
        }, {
          name: "DegeneraCie",
          why: "no."
        }, {
          name: "MediaCie",
          description: "Hasn't made a single montage video 0/10.",
          why: "Join ShitpostCie."
        }, {
          name: "LoLCie",
          description: "All in a mental ward after playing this game.",
          why: "Join ShitpostCie."
        }, {
          name: "OWCie",
          description: "LMAO this is even more dead than LegaCie.",
          why: "Join ShitpostCie."
        }, {
          name: "VACCie",
          description: "Currently in jail for match fixing and using hacks in tournaments.",
          why: "Join ShitpostCie."
        }, {
          name: "MCie",
          description: "I heard their server is running the minecraft girlfriend mod since they can't get one in real life.",
          why: "Join ShitpostCie."
        }, {
          name: "ShitpostCie",
          description: "WE OWN THIS PLACE NOW",
          why: "AYY LMAO"
        }, {
          name: "DotaCie",
          description: "DEAD LOL",
          why: "Join ShitpostCie."
        }, {
          name: "4FunCie",
          description: "Next 4FunCie activity happening in 2077.",
          why: "Join ShitpostCie."
        }, {
          name: "ChessCie",
          description: "Chess players when they can't premove their conversation with a woman.",
          why: "Join ShitpostCie."
        }, {
          name: "GNSKCie",
          description: "Yeah this ain't happening anymore either.",
          why: "Join ShitpostCie"
        }, {
          name: "DesignCie",
          description: "They can't make a single meme 0/10",
          why: "Join ShitpostCie."
        }
      ]
    }
  }
}
</script>

