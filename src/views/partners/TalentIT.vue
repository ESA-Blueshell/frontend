<template>
  <v-main>
    <top-banner title="TalentIT"/>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <v-img
            :src="$vuetify.theme.dark?require('../../assets/talentitdark.png'):require('../../assets/talentit.png')"
            class="mb-6"></v-img>
        <p class="body-1">
          TalentIT Twente is a non-profit organization that provides help for IT students in their search for an
          internship, graduation assignment or part time job. We match students based on their personality as first
          priority, interests, preferences in working culture, soft skills and much more. Our goal is that you feel at
          home at the company you work for. We have a lot of partners (more than 50+) who we know personally. One of
          them could be your next employer!
        </p>
        <p class="body-1">
          Check out our website: <a href="https://talentittwente.nl/" target="_blank" class="text-decoration-none">talentittwente.nl</a>
        </p>

      </div>
    </div>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";

export default {
  name: "TalentIT",
  components: {TopBanner}
}
</script>

<style scoped>

</style>
