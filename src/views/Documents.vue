<template>
  <v-main>
    <top-banner title="Documents"></top-banner>
    <div class="black">
    <div class="mx-3 my-10">
      <div class="mx-auto" style="max-width: 800px; font-family: monospace">
        <p class="body-1 green--text ">
          > ssh pi@blueshell-server <br>
          > ... <br>
          > authentication required <br>
          <i>> login: shitshell <br>
          > password: shitshell </i> <br>
          > invalid login <br>
          <i>> login: peter <br>
          > password: peter2020 </i> <br>
          > invalid login <br>
          <i>> login: andrei <br>
          > password: andrei </i> <br>
          > login successful <br>
          > ls <br>
          > /blueshell-frontend /blueshell-api /blueshell-keylogger /documents <br>
          > cd /documents <br>
          > ls <br>
          > Meeting_11252020.pdf <br>
          > scp shitshell@shitpostcie Meeting_11252020.pdf <br>
<!--          pls fix or add it in the api to download it-->
          <a href="../assets/Meeting_11252020.pdf" class="text-decoration-none" target="_blank"> ACCESS HERE </a> <br>
        </p>
      </div>
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