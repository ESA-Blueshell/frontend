<template>
  <div :style="{background: $vuetify.theme.computedThemes[$vuetify.theme.global.name].colors.wallpaper}">
    <v-row
      class="mx-auto container flex-nowrap"
      align="center"
      justify="space-between"
    >
      <v-col
        md="auto"
        cols="120"
      >
        <p
          class="text-white text-h4 font-weight-thin mb-0"
          style="float: left"
        >
          Join us on our Discord server
        </p>
      </v-col>
      <v-spacer />
      <v-col md="auto">
        <div>
          <v-btn
            color="primary"
            href="https://discord.gg/23YMFQy"
            target="_blank"
            class="ml-5 my-3"
          >
            <v-icon
              style="--v-icon-size-multiplier: 1.7 "
              icon="mdi-edit"
            />
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "DiscordBanner"
}
</script>

<style scoped>
/*.banner {*/
/*  background-size: cover;*/
/*  !*background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("../assets/goom.jpg") fixed center;*!*/
/*  background: #1E1E1E*/
/*}*/

.container {
  max-width: 1100px;
  height: 100%;
}

.v-btn {
  padding: 10px !important;
  width: 65px !important;
  height: 65px !important;
  border-radius: 10px;
  min-width: 0 !important;
}
</style>
