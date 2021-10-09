<template>


  <v-parallax v-bind:src="team.bg">

    <!--
      Here starts the team view on size medium and above
    -->
    <v-container fill-height fluid style="background: rgba(0,0,0,0.6)" class="py-10"
                 v-if="$vuetify.breakpoint.mdAndUp">
      <v-row justify="center" align-content="center" align="center">
        <v-col md="5" lg="4" xl="4" v-if="!nameRight">
          <p class="text-h2 font-italic">
            {{ team.name }}
          </p>
        </v-col>

        <v-col md="7" lg="6" xl="5">
          <v-row v-for="(player,i) in team.players" :key="player.ign">
            <v-col cols="3" class="font-italic text-h6">
              {{ i !== 0 ? '' : (team.players.length > 1 ? 'Players' : 'Player') }}
            </v-col>
            <v-col cols="4" class="text-h6">
              {{ player.name }}
            </v-col>
            <v-col cols="5" class="text-right text-h6">
              {{ player.ign }}
            </v-col>
          </v-row>
          <v-row v-if="team.coaches || team.substitutes">
            <v-divider style="border-color: rgba(255,255,255,0.9);" class="my-2"></v-divider>
          </v-row>
          <v-row v-for="(coach,i) in team.coaches" :key="coach.ign">
            <v-col cols="3" class="font-italic text-h6">
              {{ i !== 0 ? '' : (team.coaches.length > 1 ? 'Coaches' : 'Coach') }}
            </v-col>
            <v-col cols="4" class="text-h6">
              {{ coach.name }}
            </v-col>
            <v-col cols="5" class="text-right text-h6">
              {{ coach.ign }}
            </v-col>
          </v-row>
          <v-row v-for="(substitute,i) in team.substitutes" :key="substitute.ign">
            <v-col cols="3" class="font-italic text-h6">
              {{
                i !== 0 ? '' : (team.substitutes.length > 1 ? 'Substitutes' : 'Substitute')
              }}
            </v-col>
            <v-col cols="4" class="text-h6">
              {{ substitute.name }}
            </v-col>
            <v-col cols="5" class="text-right text-h6">
              {{ substitute.ign }}
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="4" v-if="nameRight">
          <p class="text-h2 font-italic text-right">
            {{ team.name }}
          </p>
        </v-col>
      </v-row>
    </v-container>


    <!--
      Here starts the team view for smaller sizes
    -->
    <v-container fill-height fluid style="background: rgba(0,0,0,0.6)" class="py-5"
                 v-else>
      <v-row justify="center">
        <p class="text-h2 font-italic text-center">
          {{ team.name }}
        </p>
      </v-row>
      <v-row v-if="team.players" justify="center" class="mt-n6 mb-n8">
        <v-col class="font-italic text-h6 text-center">
          {{ team.players.length > 1 ? 'Players' : 'Player' }}
        </v-col>
      </v-row>
      <v-row v-for="player in team.players" :key="player.ign" justify="center">
        <v-col sm="5" xs="6" class="text-h6">
          {{ player.name }}
        </v-col>
        <v-col sm="5" xs="6" class="text-right text-h6">
          {{ player.ign }}
        </v-col>
      </v-row>


      <v-row v-if="team.coaches || team.substitutes">
        <v-divider style="border-color: rgba(255,255,255,0.9);" class="my-2"></v-divider>
      </v-row>

      <v-row justify="center" v-if="team.coaches" class="mb-n8">
        <p class="font-italic text-h6 text-center">
          {{ team.coaches.length > 1 ? 'Coaches' : 'Coach' }}
        </p>
      </v-row>
      <v-row v-for="coach in team.coaches" :key="coach.ign" justify="center">
        <v-col sm="5" xs="6" class="text-h6">
          {{ coach.name }}
        </v-col>
        <v-col sm="5" xs="6" class="text-right text-h6">
          {{ coach.ign }}
        </v-col>
      </v-row>


      <v-row justify="center" v-if="team.substitutes" class="mb-n8">
        <p class="font-italic text-h6 text-center">
          {{ team.substitutes.length > 1 ? 'Substitutes' : 'Substitute' }}
        </p>
      </v-row>
      <v-row v-for="substitute in team.substitutes" :key="substitute.ign" justify="center">
        <v-col sm="5" xs="6" class="text-h6">
          {{ substitute.name }}
        </v-col>
        <v-col sm="5" xs="6" class="text-right text-h6">
          {{ substitute.ign }}
        </v-col>
      </v-row>

    </v-container>
  </v-parallax>
</template>

<script>
export default {
  name: "team",
  props: ["team", "nameRight"],
}
</script>

<style scoped>

.v-parallax {
  height: auto !important;
}
</style>