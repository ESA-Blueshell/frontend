<template>
    <v-app>
        <top-banner title="Super Smash Bros."></top-banner>
        <div class="mx-3">
            <div class="mx-auto my-10" style="max-width: 800px">
                <v-img :src="require('../../assets/smashbanner.png')" class="mb-5"></v-img>
                <p class="body-1">
                    The biggest crossover game in history, Super Smash Bros Ultimate, is also played
                    extensively in Blueshell. We have players on all levels of skill and host events
                    that allow them to enjoy playing together. Since the formation of the Smash
                    Committee and the release of Smash Bros Ultimate in 2018, it has been one of the
                    most popular games in Blueshell.
                </p>

                <p class="body-1">
                    We mostly host monthly Smash events with a free-to-join tournament during our
                    Smash Fest or host the occasional stand-alone tournament by ourselves or
                    together with the local tournament series: F-air Play. If you are interested in
                    joining one of our events or tournaments, contact the SmashCie or Commissioner
                    of Esports, King Cookie#4902, in the <a href="https://discord.gg/WyDhbAP"
                                                            target="_blank"
                                                            class="text-decoration-none">Blueshell
                    Discord</a>
                </p>
                <p class="text-h4 font-weight-light">
                    The Players
                </p>
                <p class="body-1">
                    Ziad "ZenoXed" Elleithy<br>
                    Jander "Thoran" Gilbers<br>
                    Joran "MacVanish" Hagen<br>
                    Ilayda "Kebab" Hotamis
                </p>
                <p class="text-h4 font-weight-light">
                    Achievements
                </p>
                <ul>
                    <li>SuiSide-B 3rd place, F-airplay 17</li>
                    <li>Ziad won redemption bracket, F-airplay 17</li>
                </ul>
            </div>
        </div>
    </v-app>
</template>

<script>
    import TopBanner from "../../components/top-banner";

    export default {
        components: {TopBanner},
    }
</script>

<style scoped>

</style>