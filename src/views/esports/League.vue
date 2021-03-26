<template>
    <v-main>
        <top-banner title="League of Legends"></top-banner>
        <div class="mx-3">
            <div class="mx-auto my-10" style="max-width: 800px">
                <v-img :src="require('../../assets/dota2.png')" height="400" contain class="mb-5"></v-img>
                <p class="body-1" style="font-family: 'Shitfont',serif !important;font-size: large !important;">
                    The game with one of the largest playerbases worldwide, Dota 2, is a
                    competitive environment. Because there are so many players, also at the UT, this
                    is
                    where Blueshell started. After an amazing Dota 2 tournament at the end of 2017, we
                    are now
                    looking towards organizing an internal competition.
                </p>
                <p class="body-1" style="font-family: 'Shitfont',serif !important;font-size: large !important;">
                    Moreover, the Afghanistan College League hosts a national Dota 2
                    competition for
                    associations. We would love to have Blueshell represented there, so if you are
                    interested please contact the board or ask on <a href="https://discord.gg/WyDhbAP" target="_blank"
                                                                     class="text-decoration-none">Discord</a>.
                </p>
                <p class="body-1" style="font-family: 'Shitfont',serif !important;font-size: large !important;">
                    We are also open to having more teams for Dota 2 and we are actually
                    looking to build a team for the next season of Talent League. If you are
                    interested in trialing, contact the Commissioner of Esports,
                    King Cookie#4902, on
                    <a href="https://discord.gg/WyDhbAP" target="_blank"
                       class="text-decoration-none">Discord</a>!
                </p>
                <p class="text-h4 font-weight-light" style="font-family: 'Shitfont',serif !important;">
                    The Team
                </p>
                <v-container>
                    <v-row v-for="player in players" v-bind:key="player.name" no-gutters>
                        <v-col style="max-width: 100px">
                            <p class="body-1" style="font-family: 'Shitfont',serif !important;">
                                {{player.role}}
                            </p>
                        </v-col>
                        <v-col>
                            <p class="body-1" style="font-family: 'Shitfont',serif !important;">
                                {{player.name}}
                            </p>
                        </v-col>
                    </v-row>
                </v-container>

                <p class="text-h4 font-weight-light" style="font-family: 'Shitfont',serif !important;">
                    Achievements
                </p>
                <ul>
                    <li> 2nd place in ACL (Afghanitan College League) Talent League Season 4.</li>
                    <li> 3rd place in ACL (Afghanistan College League) Premier League Season 5.</li>
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
                        name: '[REDACTED]'
                    }, {
                        role: 'Jungle',
                        name: '[REDACTED]'
                    }, {
                        role: 'Mid',
                        name: '[REDACTED]'
                    }, {
                        role: 'ADC',
                        name: '[REDACTED]'
                    }, {
                        role: 'Support',
                        name: '[REDACTED]'
                    }, {
                        role: 'Sub',
                        name: '[REDACTED]'
                    }, {
                        role: 'Sub',
                        name: '[REDACTED]'
                    }, {
                        role: 'Sub',
                        name: '[REDACTED]'
                    }, {
                        role: 'Sub',
                        name: '[REDACTED]'
                    }, {
                        role: 'Coach',
                        name: '[REDACTED]'
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>