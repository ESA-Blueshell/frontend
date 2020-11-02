<template>
  <v-main>
    <top-banner title="Documents"></top-banner>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <p class="body-1">
          Here the official documents of Blueshell Esports can be found. The official documents
          are currently only available in Dutch, but will be translated in the future. If you have
          any questions about them, please contact the board.
        </p>
        <p class="body-1">
          <a href="https://esa-blueshell.nl/api/download/20171212-Statuten.pdf"
             class="text-decoration-none" target="_blank">
            Statutes (Dutch)</a></p>
        <p class="body-1">
          <a href="https://esa-blueshell.nl/api/download/20180109-Huishoudelijk-Reglement-Blueshell-E-Sports.pdf"
             class="text-decoration-none" target="_blank">
            Internal Regulations (Dutch)
          </a></p>
        <p class="body-1">
          <a href="https://esa-blueshell.nl/api/download/Privacybeleid-Blueshell.pdf"
             class="text-decoration-none" target="_blank">
            Privacy Policy (Dutch)
          </a></p>
        <p class="body-1">
          For those interested in the Esports side of the association, the following document is
          where to start:
        </p>
        <p class="body-1">
          <a href="https://esa-blueshell.nl/api/download/Esports-Manual.pdf"
             class="text-decoration-none" target="_blank">
            Esports Manual
          </a></p>
      </div>
    </div>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";

export default {
  name: "Documents",
  components: {TopBanner}
}
</script>

<style scoped>

</style>