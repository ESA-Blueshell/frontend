<template>
  <v-main>
    <top-banner title="El Niño – Digital Development" />
    <div class="mx-3">
      <div
        class="mx-auto my-10"
        style="max-width: 800px"
      >
        <v-img
          :src="require('../../assets/elnino.png')"
          max-width="450px"
          class="mb-6"
        />

        <p class="text-h4 font-weight-light">
          Locations
        </p>
        <p class="text-body-1">
          Kuipersdijk 6C, Enschede<br>
          President Kennedylaan 19-21, The Hague
        </p>
        <p class="text-h4 font-weight-light">
          Who are we?
        </p>
        <p class="text-body-1">
          We are a group of technology geeks who are always interested in using the latest
          technologies and software to develop kick-ass online solutions. No problem is unsolvable,
          and we are always eager to create solutions for people and businesses active in a great
          variety of markets.
        </p>
        <p class="text-h4 font-weight-light">
          Our core business
        </p>
        <p class="text-body-1">
          We develop custom web applications, Magento webshops, mobile applications (Android and
          iOS) and IOT solutions.
        </p>
        <p class="text-h4 font-weight-light">
          Our customers
        </p>
        <p class="text-body-1">
          Most of our customers are located close by (in and around Twente), but we also have
          customers located in the rest of The Netherlands, Belgium, England, Spain and Germany.
          These customers range from relatively small to large multi-nationals operating in various
          countries in the world.
        </p>
        <p class="text-h4 font-weight-light">
          Want to join our growing team?
        </p>
        <p class="text-body-1">
          We are always in the look out of new talent to help us build cool stuff! Whether you’re a
          student who just started, a master student or a starter, we have always a special place
          for you.
        </p>
        <p class="text-body-1">
          See for more information:
          <a
            href="https://www.elnino.tech/vacatures"
            class="text-decoration-none"
            target="_blank"
          >www.elnino.tech/vacatures</a>
          (Dutch) or
          <a
            href="https://www.elnino.tech/getajob"
            class="text-decoration-none"
            target="_blank"
          >www.elnino.tech/getajob</a>
          or <a
            href="https://www.elnino.tech/liftoff"
            class="text-decoration-none"
            target="_blank"
          >www.elnino.tech/liftoff</a>
          (English). You can always contact Michael on WhatsApp:
          +31626978392. Don’t worry he won’t bite!
        </p>
      </div>
    </div>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";

export default {
  name: "ElNino",
  components: {TopBanner}
}
</script>

<style scoped>

</style>