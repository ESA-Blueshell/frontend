<template>
  <div>
    <div class="banner">
      <v-parallax :src="require('../assets/gaming.jpg')" height="900">
        <v-container fill-height fluid style="background: rgba(0,0,0,0.6)">
          <v-row>
            <v-col>
              <div class="text-center mt-16">
                <p id="blueshell"
                   class="white--text text-h2 text-sm-h1 text-md-h1 text-lg-h1 text-xl-h1"
                   v-bind:style="$vuetify.breakpoint.mdAndUp?{ 'font-size': '200px !important'} : ($vuetify.breakpoint.smAndUp?{ 'font-size': '130px !important'}:{})">
                  BLUESHELL
                </p>

                <!--                <p id="blueshell"-->
                <!--                   class="white&#45;&#45;text text-h1"-->
                <!--                   v-bind:style="$vuetify.breakpoint.mdAndUp?{ 'font-size': '150px !important'} : ($vuetify.breakpoint.sm?{ 'font-size': '100px !important'}: ($vuetify.breakpoint.xs?{ 'font-size': '60px !important'}:{}))">-->
                <!--                  BLUESHELL-->
                <!--                </p>-->
                <p class="white--text text-h3 font-weight-light font-italic">
                  Student esports and gaming association of the Twente region!
                </p>
                <v-btn x-large color="primary" rounded @click="$router.push('/membership')"
                       class="mt-5"
                       style="font-size: 30px;height: 50px;">
                  join now
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-parallax>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main-banner'
}
</script>


<style scoped lang="scss">

#blueshell {
  height: 150px;
}

//:root {
//  --panel-width: 20px
//}
//
//.banner {
//  position: absolute;
//  width: var(--panel-width);
//  height: 900px;
//  transform: skew(-20deg);
//  -webkit-animation: ltr;
//  -o-animation: ltr;
//  animation: ltr ;
//  animation-duration: 5s;
//  animation-iteration-count: infinite;
//
//}
//
//@keyframes ltr {
//  from {
//    right: calc(100% + var(--panel-width));
//  }
//  to {
//    right: calc(-1 * var(--panel-width));
//  }
//
//}

</style>
