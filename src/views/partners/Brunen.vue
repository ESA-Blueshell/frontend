<template>
  <v-main>
    <top-banner title="Brunen"></top-banner>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <v-img
            :src="$vuetify.theme.dark?require('../../assets/brunendark.png'):require('../../assets/brunen.png')"
            class="mb-6 mx-auto"
            max-width="500"/>

        <p class="body-1">
          This page is under construction, meanwhile you can check out Brunen's website
          <a href="https://brunen.nl/" class="text-decoration-none" target="_blank">here!</a> :)
        </p>
      </div>
    </div>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";

export default {
  name: "Brunen",
  components: {TopBanner}
}
</script>

<style scoped>

</style>
