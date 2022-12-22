<template>
  <v-main>
    <top-banner title="League of Legends" />
    <div class="mx-3">
      <div
        class="mx-auto my-10"
        style="max-width: 800px"
      >
        <p class="text-body-1">
          As it is around the globe, League of Legends as a competitive ground holds a special
          place in Blueshell Esports. Below you can find our competitive League of Legends
          team(s).
        </p>
      </div>
    </div>

    <team :team="streetRats" />
  </v-main>
</template>

<script>
import TopBanner from "../../components/top-banner";
import Team from "@/components/team";

export default {
  components: {Team, TopBanner},
  data: () => {
    return {
      streetRats: {
        name: 'BS Street Rats',
        bg: require('../../assets/leagueesportsbg1.jpg'),
        players: [
          {
            name: 'Mateusz Bartnicki',
            ign: 'BS Shigersky'
          },
          {
            name: 'Iason FIlippidis',
            ign: 'BS Chit'
          },
          {
            name: 'Hristo Dimitrov',
            ign: 'Enorenaren'
          },
          {
            name: 'Richard Leenknegt',
            ign: 'BS RuigeRichard'
          },
          {
            name: 'Omar Markovinovic',
            ign: 'SweatIRL'
          }
        ],
        substitutes: [
          {
            name: 'Jannis Tenwinkel',
            ign: 'BS Twinjanni'
          }
        ]
      },
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
