<template>
  <v-main>
    <top-banner title="Board"></top-banner>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <p class="text-h2 font-weight-bold text-center" style="font-family: 'Shitfont',serif !important;font-weight: bold">
          Current board
        </p>
        <p class="text-h4" style="font-family: 'Shitfont',serif !important;font-weight: bold">
          The Kelbi - Chairman
        </p>
        <div>
          <img style="float:right;width: 400px" src="../assets/kelbi.jpg" alt="chairman">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Aliquam faucibus purus in massa tempor.
            Faucibus purus in massa tempor nec feugiat nisl. Lacus vel facilisis volutpat est velit
            egestas dui id ornare. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices.
            Quis varius quam quisque id diam vel quam. Odio ut enim blandit volutpat maecenas
            volutpat blandit aliquam. Pellentesque elit ullamcorper dignissim cras. At tempor
            commodo ullamcorper a lacus. Vel turpis nunc eget lorem dolor sed viverra ipsum. Purus
            viverra accumsan in nisl nisi scelerisque eu ultrices. Adipiscing bibendum est ultricies
            integer. Velit dignissim sodales ut eu sem integer vitae justo.

            Proin nibh nisl condimentum id. Consectetur adipiscing elit pellentesque habitant morbi
            tristique senectus et. Ipsum dolor sit amet consectetur adipiscing elit. Dictum fusce ut
            placerat orci nulla pellentesque. Ornare arcu dui vivamus arcu felis bibendum ut
            tristique. Sit amet nisl purus in mollis nunc sed id. Enim lobortis scelerisque
            fermentum dui faucibus in. Non sodales neque sodales ut etiam. Dui nunc mattis enim ut.
            Velit sed ullamcorper morbi tincidunt ornare. Porttitor lacus luctus accumsan tortor
            posuere ac ut consequat. Sapien nec sagittis aliquam malesuada. Viverra tellus in hac
            habitasse platea dictumst vestibulum rhoncus est.
          </p>
        </div>

        <p class="text-h4"
           style="font-family: 'Shitfont',serif !important;font-weight: bold;text-align: right">
          Jose - Secretary/Commissioner of Esports
        </p>
        <div>
<!--          <img style="float:left;width: 400px" src="../assets/ivo.jpg" alt="Secretary/Commissioner of Esports">  -->
          <p>
          </p>
        </div>

        <p class="text-h4" style="font-family: 'Shitfont',serif !important;font-weight: bold">
          Iskander - Treasurer
        </p>
        <div>
          <!--        <img style="float:right;width: 400px" src="../assets/iskander.jpg" alt="Treasurer">-->
          <p>
          </p>
        </div>

        <p class="text-h4"
           style="font-family: 'Shitfont',serif !important;font-weight: bold;text-align: right">
          Lucia - Commissioner of internal affairs
        </p>
        <div>
          <!--         <img style="float:left;width: 400px" src="../assets/lucia.jpg" alt="Commissioner of internal affairs">-->
          <p>
          </p>
        </div>

        <p class="text-h4" style="font-family: 'Shitfont',serif !important;font-weight: bold">
          Jose - Commissioner of external affairs
        </p>
        <div>
          <!--      <img style="float:right;width: 400px" src="../assets/jose.jpg" alt="Commissioner of external affairs">-->
          <p>
          </p>
        </div>

        <v-expansion-panels accordion>
          <v-expansion-panel>
            <v-expansion-panel-header class="text-h5 font-weight-light"
                                      style="font-family: 'Shitfont',serif !important;font-weight: bold !important;">
              3rd board
            </v-expansion-panel-header>
            <v-expansion-panel-content
                style="font-family: 'Shitfont',serif !important;font-size: large">
              Chairman: [REDACTED] <br>
              Secretary/Treasurer: [REDACTED] <br>
              Commissioner of Esports: [REDACTED] <br>
              Commissioner of internal affairs: [REDACTED] <br>
              Commissioner of external affairs: [REDACTED]
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header class="text-h5 font-weight-light"
                                      style="font-family: 'Shitfont',serif !important;font-weight: bold !important;">
              2nd board
            </v-expansion-panel-header>
            <v-expansion-panel-content
                style="font-family: 'Shitfont',serif !important;font-size: large">
              Chairman: [REDACTED] <br>
              Secretary: [REDACTED] <br>
              Treasurer: [REDACTED] <br>
              Commissioner of Internal affairs: [REDACTED] <br>
              Commissioner of external affairs: [REDACTED]
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header class="text-h5"
                                      style="font-family: 'Shitfont',serif !important;font-weight: bold !important;">
              1st board
            </v-expansion-panel-header>
            <v-expansion-panel-content
                style="font-family: 'Shitfont',serif !important;font-size: large">
              Chairman: [REDACTED] <br>
              Secretary: [REDACTED] <br>
              Treasurer: [REDACTED] <br>
              Commissioner of internal affairs: [REDACTED] <br>
              Commissioner of external affairs: [REDACTED]
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";

export default {
  components: {TopBanner}
}
</script>

<style scoped>

</style>