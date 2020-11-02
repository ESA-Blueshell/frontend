<template>
    <v-main>
        <top-banner title="League of Legends"></top-banner>
        <div class="mx-3">
            <div class="mx-auto my-10" style="max-width: 800px">
                <v-img :src="require('../../assets/leaguebanner.png')" class="mb-5"></v-img>
                <p class="body-1">
                    The game with one of the largest player bases worldwide, League of Legends, is a
                    competitive environment. Because there are so many players, also at the UT, this
                    is
                    where Blueshell started. After an amazing LoL tournament at the end of 2017, we
                    are now
                    looking towards organizing an internal competition.
                </p>
                <p class="body-1">
                    Moreover, the Dutch College League hosts a national League of Legends
                    competition for
                    associations. We would love to have Blueshell represented there, so if you are
                    interested please contact the board or ask on <a href="https://discord.gg/WyDhbAP" target="_blank"
                                                                     class="text-decoration-none">Discord</a>.
                </p>
                <p class="body-1">
                    We are also open to having more teams for League of Legends and we are actually
                    looking to build a team for the next season of Talent League. If you are
                    interested in trialing, contact the Commissioner of Esports,
                    King Cookie#4902, on
                    <a href="https://discord.gg/WyDhbAP" target="_blank"
                       class="text-decoration-none">Discord</a>!
                </p>
                <p class="text-h4 font-weight-light">
                    The Team
                </p>
                <v-container>
                    <v-row v-for="player in players" v-bind:key="player.name" no-gutters>
                        <v-col style="max-width: 100px">
                            <p class="body-1">
                                {{player.role}}
                            </p>
                        </v-col>
                        <v-col>
                            <p class="body-1">
                                {{player.name}}
                            </p>
                        </v-col>
                    </v-row>
                </v-container>

                <p class="text-h4 font-weight-light">
                    Achievements
                </p>
                <ul>
                    <li> 2nd place in DCL (Dutch College League) Talent League Season 4.</li>
                    <li> 3rd place in DCL (Dutch College League) Premier League Season 5.</li>
                </ul>
            </div>
        </div>
    </v-main>
</template>

<script>
    import TopBanner from "../../components/top-banner";

    export default {
        components: {TopBanner},
        data: () => {
            return {
                players: [
                    {
                        role: 'Top',
                        name: 'Tom "DR Saw" Willems of brilman'
                    }, {
                        role: 'Jungle',
                        name: 'Idwer "Meneer Krabs" de Vries'
                    }, {
                        role: 'Mid',
                        name: 'Finn "KassaFinn" Tempelaar'
                    }, {
                        role: 'ADC',
                        name: 'Ian "Mechanics" van den Berg'
                    }, {
                        role: 'Support',
                        name: 'Jan Berend "SlimyDevil" Mooijaart'
                    }, {
                        role: 'Sub',
                        name: 'Max "Captain Max" Traas'
                    }, {
                        role: 'Sub',
                        name: 'Catalin "Chipoke" Butoieru'
                    }, {
                        role: 'Sub',
                        name: 'Jasper "JappieXD" van Harten'
                    }, {
                        role: 'Sub',
                        name: 'Joris "Adulac" Klein Nagelvoort'
                    }, {
                        role: 'Coach',
                        name: 'Thijs "Coachbuik" Lieverse'
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>