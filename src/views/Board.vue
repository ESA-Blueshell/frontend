<template>
  <v-main>
    <top-banner title="Board"></top-banner>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <p class="text-h3  text-center">
          Current board
        </p>
        <p class="body-1">
          Every year, our association grows and takes on new shapes. We present you the sixth board
          of Blueshell Esports{{ $vuetify.breakpoint.mdAndUp ? ', who are introduced below' : '' }}.
        </p>
        <v-img :src="require('../assets/wholeboard.jpg')"></v-img>
        <p class="text-h3  text-center mt-12 ">
          The members
        </p>
        <div v-if="$vuetify.breakpoint.mdAndUp">
          <div v-for="(member,i) in board" v-bind:key="member.name"
               class="mb-12"
               style="width: 100%; height: 400px;background-size: contain;"
               :style="{ 'background-image': `linear-gradient(${i%2===0?'':'-'}90deg, transparent 25%, ${$vuetify.theme.dark?'#1e1e1e':'white'} 34%, transparent 26%), url('${member.image}')`, 'background-position': i%2===0 ? 'left' : 'right '}">
            <div
                :style="{ 'padding-left': i%2===0 ? '35%' : '','padding-right': i%2===1 ? '35%' : ''}">
              <p class="text-h2" :class="{'text-right': i%2===1}">
                {{ member.name }}
              </p>
              <p class="text-subtitle-1 mt-n6" :class="{'text-right': i%2===1}">
                {{ member.title }}
              </p>
              <p :class="{'text-right': i%2===1}">{{ member.description }}</p>
            </div>
          </div>
        </div>

        <v-expansion-panels accordion class="mt-8">
          <v-expansion-panel>
            <v-expansion-panel-header class="text-h5 font-weight-light">5th board
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              Chairman: Daniël "thiefzz" Floor<br>
              Commissioner of Esports/Treasurer: Bob "Bobbuz" Even<br>
              Secretary: Louis "Poking" Hu<br>
              Commissioner of internal affairs: Jelle "Zenga" Idzenga<br>
              Commissioner of external affairs: İlayda "Vriendelijke kebab" Hotamış
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header class="text-h5 font-weight-light">4th board
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              Chairman: Ali “Kelbinoh” Kalbiyev<br>
              Treasurer: Tjebbe “Issie54” Iskander Sterck<br>
              Commissioner of Esports/Secretary: Ivo “King Cookie” Heitlager<br>
              Commissioner of internal affairs: Lucia "Luna" Kim<br>
              Commissioner of external affairs: Jose “Bear” Pratdesaba Lopez
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header class="text-h5 font-weight-light">3rd board
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              Chairman: Jander “Thoran” Gilbers<br>
              Secretary/Treasurer: Joran “MacVanish” Hagen<br>
              Commissioner of Esports: Andrei “ElDonte” Raureanu<br>
              Commissioner of internal affairs: William “Lampekap88” Schaarman<br>
              Commissioner of external affairs: Allysha “Meavis” Sewradj
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header class="text-h5 font-weight-light">2nd board
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              Chairman: Jasper “JappieXD” van Harten<br>
              Secretary: Kimberly “Agile Manifesto” Evertz<br>
              Treasurer: Mauk “Dawarfmaster” Muller<br>
              Commissioner of Internal affairs: Antal “TheMadJokerHD” van Dongen<br>
              Commissioner of external affairs: Maiander “Maiantie” Eigenraam
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header class="text-h5 font-weight-light">1st board
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              Chairman: Thijs “Grootbuik” Lieverse<br>
              Secretary: Jan-Berend “JB” Mooijaart<br>
              Treasurer: Anne “Iadri” Schrader<br>
              Commissioner of internal affairs: Stijn “Salish” Overduin<br>
              Commissioner of external affairs: Idwer “Fangedsheep” de Vries
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
  components: {TopBanner},
  data() {
    return {
      board: [
        {
          name: "Amber Scholtz",
          title: "Chair",
          description: "Hello! My name is Amber Scholtz and I am the Chair for this year. I am in my third year of Biomedical Engineering. I joined Blueshell 3 years ago right after the successful NintenCo pub quiz. After joining multiple fun events and committees I felt that I wanted to do more. That is why I became a Board member. I hope we can organize fun events and have a great time together! Let's make this a (lustrum) year to remember!",
          image: require("@/assets/amber.jpg")
        },
        {
          name: "Thomas Dekker",
          title: "Treasurer",
          description: "Hi, my name is Thomas Dekker and I am the Treasurer this year. I am currently in my second year of Biomedical Engineering. I joined Blueshell last year because I really enjoyed the events during the kick off period and Blueshell felt like a great community to hang out with. Even though I was fairly new to the association, I felt an urge to do more. That is why I became a board member :D. Let's make this a wonderful year together!",
          image: require("@/assets/thomas.jpg")
        },
        {
          name: "Roos Kruk",
          title: "Commissioner of Internal Affairs",
          description: "Hello there! My name is Roos Kruk and I am the Commissioner of Internal Affairs this year. I am in my second year of Psychology. I only joined Blueshell around the half year point of last year's academic year, but it already feels close to a second family. Although I did not anticipate becoming a Board member at all during my bachelor at the UT, I am happy to be given the opportunity to help Blueshell grow and to grow together with its members. Let's make this year a year to remember!",
          image: require("@/assets/roos.jpg")
        },
        {
          name: "Jelle van Wezep",
          title: "Secretary and Commissioner of the Esports Lounge",
          description: "Hey, my name is Jelle van Wezep and I am the Secretary and Commissioner of the Esports Lounge for this year. I am in my third year for Industrial Engineering and Management and busy with my minor. I joined Blueshell 2 years ago during the League of Legends tournament of the kick in which I enjoyed a lot. In the months after, I discovered all the great events that are being hosted and the amazing community. Eventually I wanted to help out as well with hosting those events which I enjoyed so much that I wanted to become a board member to help the association further. We are gonna make this an amazing year!",
          image: require("@/assets/jelle.jpg")
        },
        {
          name: "Jonas Valentijn",
          title: "Commissioner of Esports affairs",
          description: "Hello, my name is Jonas Valentijn and I am the Commissioner of Esports affairs this year. I am currently doing my masters in electrical engineering. I first came into contact with Blueshell after playing CS:GO, and joining a team in Blueshell. Other than this I also discovered the great community of Blueshell. After joining multiple events and having a great time, also wanted to help out and decided to become a board member :).  Lets make this a great year!",
          image: require("@/assets/jonas.jpg")
        },
        {
          name: "Thijs Willems",
          title: "Commissioner of external affairs",
          description: "Hey there, I am Thijs Willems and currently a 2nd year Mechanical Engineering student as well as the Commissioner of External affairs of Blueshell Esports. Joining one event of the minecraft hunger games was enough to convince me of joining more events at blueshell and those became more and more over the years. Seeing all these events being organised by the members of Blueshell, I felt like it was only right to try and do something back for all of them to the best of my ability as a Board member of the association. I hope together we can make this year a success for everyone! :)",
          image: require("@/assets/thijs.jpg")
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
