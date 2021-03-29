<template>


  <v-main>
    <div>
      <img src="../assets/welcome.gif" class="mt-8">

      <h1 class="mt-16 ml-10" style="font-weight: bold;color: green">
        My favorite memes :)
      </h1>


      <img src="../assets/lmao.gif">
      <img src="../assets/arrow.gif">


      <iframe width="560" height="315" src="https://www.youtube.com/embed/0hOmSaWA88c"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>

<img src="../assets/flip.gif" style="float: right">

    </div>

  </v-main>
</template>

<script>
export default {
  name: "blog"
}
</script>

<style scoped>
.v-main {
  background: url(../assets/bg.png) repeat !important;
}
</style>