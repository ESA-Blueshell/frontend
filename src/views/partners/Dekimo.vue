<template>
  <v-main>
    <top-banner title="Dekimo" />
    <div class="mx-3">
      <div
        class="mx-auto my-10"
        style="max-width: 800px"
      >
        <v-img
          :src="$vuetify.theme.dark?require('../../assets/dekimodark.png'):require('../../assets/dekimo.png')"
          class="mb-6"
        />
        <p class="text-body-1">
          Dekimo is an important independent electronics solution provider in Europe, who highly
          values customer satisfaction through local presence.
        </p>
        <p class="text-body-1 mb-0">
          Dekimo provides services and production facilities in the areas of:
        </p>
        <ul class="mb-4">
          <li>On-site consultancy in electronics and software</li>
          <li>Project based in-house software and electronics development</li>
          <li>Compliance measurements & testing (EMC, LVD, CE, etc.)</li>
          <li>Layout, assembly and serial production of electronics & PCBs</li>
          <li>Mechatronics solutions</li>
        </ul>
        <p class="text-body-1">
          Dekimo has existed for over 30 years and has extensive experience in electronics and
          software development in all sectors that want to enrich their products with smart
          technologies, such as industry, automotive & (aero)space, pharma, healthcare, telecom,
          banking, etc.
        </p>
        <p class="text-h4 font-weight-light">
          Dekimo in Enschede
        </p>
        <p class="text-body-1">
          Dekimo Experts Enschede has an office at Kennispark Twente, The Gallery, located next to
          the UT. The main activity is providing consultancy services related to electronics and
          (embedded) software.
        </p>
        <p class="text-body-1">
          Make sure to take a look at the
          <a
            href="https://www.dekimo.com/dekimo-experts-enschede/"
            class="text-decoration-none"
            target="_blank"
          >
            vacancies of Dekimo Experts Enschede</a>
        </p>
      </div>
    </div>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";

export default {
  name: "Dekimo",
  components: {TopBanner}
}
</script>

<style scoped>

</style>
