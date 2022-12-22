<template>
  <v-main>
    <top-banner title="Rocket League" />
    <div class="mx-3">
      <div
        class="mx-auto my-10"
        style="max-width: 800px"
      >
        <p class="text-body-1">
          This year we have another new game Blueshell will compete in. A new rocket league team has been created! They
          will be joining tournaments representing Blueshell and compete in DSL.
        </p>
      </div>
    </div>
    <team :team="turtles" />
    <team
      :team="tortoises"
      name-right="true"
    />
  </v-main>
</template>

<script>
import TopBanner from "../../components/top-banner";
import Team from "@/components/team";

export default {
  components: {Team, TopBanner},
  data: () => {
    return {
      turtles: {
        name: 'BS Turtles',
        bg: require('../../assets/rocketleagueesports.jpg'),
        players: [
          {
            name: 'Thomas Dekker',
            ign: 'ItIsIThomas'
          },
          {
            name: 'Job de Ruijter',
            ign: 'Job 404'
          },
          {
            name: 'Patrick Wolbers',
            ign: 'KrabbyPattie'
          },
          {
            name: 'Allard van der Hooft',
            ign: 'vdhooft_'
          },
          {
            name: 'René Hammink',
            ign: 'Mr. Pancake^-^'
          },
        ]
      },
      tortoises: {
        name: "Blueshell Tortoises",
        bg: require('../../assets/rocketleagueesports2.jpg'),
        players: [
          {
            name: "Thomas Dekker",
            ign: "ItIsIThomas"
          },
          {
            name: "Pepijn Visser",
            ign: "Visper"
          },
          {
            name: "Patrick Wolbers",
            ign: "KrabbyPattie"
          },
          {
            name: "Allard van der Hooft",
            ign: "vdhooft_"
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
