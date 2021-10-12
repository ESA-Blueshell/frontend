<template>
  <v-main>
    <top-banner title="Contact"></top-banner>
    <!-- TODO: FIX THIS LATER LMAO -->

    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <p class="body-1">
          If you want to become a member see the
          <router-link to="/membership/">Join us!</router-link>
          page. If you are just looking for
          more information, you can contact the board at
          <a href="mailto:board@blueshell.utwente.nl">board@blueshell.utwente.nl</a> or join the
          <a href="https://discord.gg/WyDhbAP" target="_blank">Discord</a> and send a PM to the
          board members.
        </p>
        <p class="body-1">
          Do you want to ask your question in person? Usually, you can find a board member in the
          Blueshell room (Bastille 313) during the break.
          <i>Due to the Coronavirus, the Blueshell room is closed until further notice.</i>
        </p>
        <v-row>
          <v-col style="min-width: 200px">
            <p class="body-1">
              The post address for Blueshell is as follows:
              <br> Blueshell Esports
              <br> Postbus 217 (Bastille 49)
              <br> 7500 AE Enschede
              <br> Netherlands
            </p>
          </v-col>
          <v-col>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.002597906819!2d6.8497361159970485!3d52.24333646444751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b813d9fcd72811%3A0x9b5610e04ea3201c!2sBastille%2C%20De%20Hems%2010%2C%207522%20NL%20Enschede!5e0!3m2!1sen!2snl!4v1634068865309!5m2!1sen!2snl"
                width="600" height="450" style="border:0;" allowfullscreen=""
                loading="lazy"
                v-bind:style="{filter: $vuetify.theme.dark ? 'invert(90%)' : ''}"
            ></iframe>
          </v-col>
        </v-row>

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
