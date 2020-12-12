<template>
  <div class="banner">
    <div class="black overlay"></div>
    <div class="content">

      <p class="white--text font-weight-regular" style="float: left">Want to get to know us better?</p>

      <v-spacer></v-spacer>

      <v-btn class="white--text font-weight-regular" rounded color="#00b5f7" style="float: right;">Join our Discord server!</v-btn>
    </div>


  </div>
</template>

<script>
export default {
  name: "discord-banner",
  data() {
    return {}
  }
}
</script>

<style scoped>
.banner {
  height: 200px;
  overflow: hidden;
  position: relative;

  background-image: url("../assets/more_gaming.jpg");

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.overlay {
  position: absolute;
  opacity: 0.6;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.content{
  position: absolute;
  z-index: 3;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
</style>