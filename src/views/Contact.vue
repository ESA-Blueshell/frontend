<template>
    <v-app>
      <top-banner title="Contact"></top-banner>
        <!-- TODO: FIX THIS LATER LMAO -->
        <div class="ma-auto ma-10" style="max-width: 600px">
            <p class="text-justify">
                If you want to become a member see the <a>Join us</a>! page. If you are just looking for more information, you can contact the board at
                <a href="mailto:board@blueshell.utwente.nl">board@blueshell.utwente.nl</a> or join the
                <a href="https://discord.gg/WyDhbAP">Discord</a> and send a PM to the board members.
            </p>
            <p class="text-justify">
                Do you want to ask your question in person? Usually, you can find a board member in the Blueshell room (Bastille 313) during the break.
                <i>Due to the Coronavirus, the Blueshell room is closed until further notice.</i>
            </p>
            <p class="text-justify">
                The post address for Blueshell is as follows:
                <br> Blueshell Esports
                <br> Postbus 217 (Bastille 49)
                <br> 7500 AE Enschede
                <br> Netherlands
            </p>
        </div>
    </v-app>
</template>

<script>
import TopBanner from "@/components/top-banner";
export default {
  components: {TopBanner}
}
</script>
