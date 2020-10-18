<template>
    <v-main>
        <top-banner title="Rocket League"></top-banner>
        <div class="mx-3">
            <div class="mx-auto my-10" style="max-width: 800px">
                <v-img :src="require('../../assets/rocketleaguebanner.png')" class="mb-5"></v-img>
                <p class="body-1">
                    Blueshell currently has one Rocket League team plays in European University
                    Rocketeers tournaments and other game related events.
                </p>
                <p class="text-h4 font-weight-light">
                    The Team
                </p>
                <p class="body-1">
                    Justin “Kine_” Praas<br>
                    Nicolas “Fish in a Tank”<br>
                    Fish Steijn “Skylight” Strikkers<br>
                    Dorukhan “DK” Bozkurt<br>
                    Lorenz “KeZio” Bünnemann
                </p>
                <p class="text-h4 font-weight-light">
                    Achievements
                </p>
                <ul>
                    <li>EUR Winter Season 2019 - 11th place</li>
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