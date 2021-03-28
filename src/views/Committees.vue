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
          <v-expansion-panel-header class="text-h5 font-weight-light">
            {{ committee.name }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>
              {{ committee.description }}
            </p>
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
          name: '4FunCie',
          description: 'A committee responsible for organizing social events.',
        },
        {
          name: 'ChessCie',
          description: 'A committee responsible for organizing chess events.',
        },
        {
          name: 'DesignCie',
          description: 'A committee responsible for working on visuals of the association.',
        },
        {
          name: 'DegeneraCie',
          description: 'A committee responsible for organizing anime and video-game music quiz events.',
        },
        {
          name: 'LegaCie',
          description: 'A committee responsible for organizing Gamenights.',
        },
        {
          name: 'LOLCie',
          description: 'A committee responsible for organizing League of Legends events.',
        },
        {
          name: 'MCie',
          description: 'A committee responsible for organizing Minecraft events.',
        },
        {
          name: 'MediaCie',
          description: 'A committee responsible for live-streams of the association.',
        },
        {
          name: 'NintenCo',
          description: 'A committee responsible for Nintendo game events.',
        },
        {
          name: 'ServerCie',
          description: 'A committee responsible for acquiring and setting up the server of the association.',
        },
        {
          name: 'ShitpostCie',
          description: 'A committee responsible for organizing community-building events.',
        },
        {
          name: 'SiteCie',
          description: 'A committee responsible for handling the website of the association.',
        },
        {
          name: 'SmashCie',
          description: 'A committee responsible for organizing Super Smash Bros. events.',
        },
        {
          name: 'RotaCie',
          description: 'A committee responsible for random game events.',
        },
        {
          name: 'VACCie',
          description: 'A committee responsible for organizing CS:GO events.',
        }
      ]
    }
  }
}
</script>

