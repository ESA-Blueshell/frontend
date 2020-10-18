<template>
    <v-main>
        <top-banner title="Counter-Strike: Global Offensive"></top-banner>
        <div class="mx-3">
            <div class="mx-auto my-10" style="max-width: 800px">
                <v-img :src="require('../../assets/csgobanner.png')" class="mb-5"></v-img>
                <p class="body-1">
                    Blueshell currently has one team for CSGO. We are going to go for semi-pro
                    tournaments and open signup tournaments such as ESL CSGO Challengers or FACEIT
                    tournaments with our main team as most of our players have semi-pro or high tier
                    experience.
                </p>
                <p class="text-h4 font-weight-light">
                    The Team
                </p>
                <p class="body-1">
                    Joran 'MacVanish' Hagen<br>
                    Teun "Hyzaq" Kok<br>
                    Tim "Sjonnie" Blok<br>
                    Vlad Daniil "shkodder" Popov<br>
                    Hielke “Klutch1G” Kleijsen<br>
                    Max “romkie” Veldman<br>
                    Tim "DUCKI3S" van de Veen
                </p>
                <p class="text-h4 font-weight-light">
                    Achievements
                </p>
                <ul>
                    <li>3rd place in Dutch College CS:GO League Season 1.</li>
                </ul>
            </div>
        </div>
    </v-main>
</template>

<script>
    import TopBanner from "../../components/top-banner";

    export default {
        components: {TopBanner},
    }
</script>

<style scoped>

</style>