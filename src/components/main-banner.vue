<template>
  <!--
    This component is the large banner at the top of the front page.
    This was moved to a separate component to keep the Home.vue file from getting cluttered.
  -->
  <div class="banner">
    <v-container fill-height fluid style="background-size: cover;background-position: center;height: 900px"
                 :style="{ 'background-image': `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${require('../assets/banner.jpg')})`}">
      <v-row>
        <v-col>
          <div class="text-center mt-16">
            <p id="blueshell"
               class="white--text text-h2 text-sm-h1 text-md-h1 text-lg-h1 text-xl-h1"
               style="height: 150px"
               v-bind:style="$vuetify.breakpoint.mdAndUp?{ 'font-size': '175px !important'} : ($vuetify.breakpoint.smAndUp?{ 'font-size': '110px !important'}:{})">
              BLUESHELL
            </p>

            <p class="white--text font-weight-light font-italic"
               :class="{'text-h3': $vuetify.breakpoint.mdAndUp, 'text-h4': $vuetify.breakpoint.smAndDown}">
              Student esports and gaming association of the Twente region!
            </p>
            <v-btn class="mt-5" color="primary" rounded style="font-size: 30px;height: 50px;"
                   x-large
                   @click="$router.push('/membership')">
              join now
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'main-banner'
}
</script>