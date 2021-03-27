<template>
  <v-main style="background: black">
    <top-banner title="Documents"></top-banner>
    <div class="mx-auto my-10" style="max-width: 800px">
      <p class="body-1 green--text" style="font-family: monospace !important">
        >ssh pi@blueshell-server <br>
        >... <br>
        >authentication required <br>
        <i>>login: shitshell <br>
          >password: shitshell </i> <br>
        >invalid login <br>
        <i>>login: peter <br>
          >password: peter2020 </i> <br>
        >invalid login <br>
        <i>>login: andrei <br>
          >password: andrei </i> <br>
        >login successful <br>
        >cd ../blueshell <br>
        >ls <br>
        >/blueshell-frontend /blueshell-api /blueshell-keylogger /documents <br>
        >cd /documents <br>
        >ls <br>
        >Meeting_11252020.pdf <br>
        >scp shitshell@shitpostcie Meeting_11252020.pdf <br>
        <a href="https://esa-blueshell.nl/api/download/Meeting_11252020.pdf"
           class="text-decoration-none" target="_blank"> ACCESS HERE </a> <br>
      </p>
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