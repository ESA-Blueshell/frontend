<template>


  <v-main>
    <div>

      <h1 class="mt-16 ml-10" style="font-weight: bold;color: red">
        My favorite memes :)
      </h1>


      <img src="../assets/lmao.gif">
      <img src="../assets/arrow.gif">


      <iframe width="560" height="315" src="https://www.youtube.com/embed/I1uk1khFLMg"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>

    </div>

  </v-main>
</template>

<script>
export default {
  name: "blog"
}
</script>

<style scoped>
div {
  background: url(../assets/waves.png);
  background-repeat: repeat
}
</style>