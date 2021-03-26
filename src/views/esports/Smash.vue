<template>
  <v-main>
    <top-banner title="Super Smash Bros."></top-banner>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <v-img :src="require('../../assets/fbi.jpg')" class="mb-5"></v-img>
      </div>
    </div>
  </v-main>
</template>

<script>
import TopBanner from "../../components/top-banner";

export default {
  components: {TopBanner},
}
</script>

<style scoped>

</style>