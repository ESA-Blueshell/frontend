<template>
  <v-main>
    <top-banner title="Board" />
    <div class="mx-3">
      <div
        class="mx-auto my-10"
        style="max-width: 800px"
      >
        <p class="text-h3  text-center">
          Current board
        </p>
        <p class="text-body-1">
          Every year, our association grows and takes on new shapes. We present you the seventh board
          of Blueshell Esports{{ $vuetify.display.mdAndUp ? ', who are introduced below' : '' }}.
        </p>
        <v-img :src="require('../assets/board7pics/board7.jpg')" />

        <div
          v-for="(member,i) in board"
          :key="member.name"
          class="mb-12 mt-16"
          style="width: 100%; height: 400px;background-size: contain;position: relative;"
          :style="{ 'background-image': `linear-gradient(${i%2===0?'':'-'}90deg, transparent 25%, ${$vuetify.theme.dark?'#1e1e1e':'white'} 34%, transparent 26%), url('${member.image}')`, 'background-position': i%2===0 ? 'left' : 'right '}"
        >
          <!-- https://www.w3schools.com/HOWTO/howto_css_center-vertical.asp -->
          <div
            style=" position: absolute;top: 50%; -ms-transform: translateY(-50%);transform: translateY(-50%);"
            :style="{ 'padding-left': i%2===0 ? '35%' : '','padding-right': i%2===1 ? '35%' : ''}"
          >
            <p
              class="text-h2"
              :class="{'text-right': i%2===1}"
            >
              {{ member.name }}
            </p>
            <p
              class="text-subtitle-1 mt-n6"
              :class="{'text-right': i%2===1}"
            >
              {{ member.title }}
            </p>
            <p :class="{'text-right': i%2===1}">
              {{ member.description }}
            </p>
          </div>
        </div>

        <v-expansion-panels
          variant="accordion"
          class="mt-8"
        >
          <v-expansion-panel>
            <v-expansion-panel-title class="text-h5 font-weight-light">
              6th board
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              Chairman: Amber "Ambanana" Scholtz<br>
              Treasurer: Thomas "ItIsIThomas" Dekker<br>
              Secretary/Commissioner of the Esports Lounge: Jelle "TheJellyMan" van Wezep<br>
              Commissioner of esports: Jonas "Clunky" Valentijn<br>
              Commissioner of internal affairs: Roos "SkyeWolf" Kruk<br>
              Commissioner of external affairs: Thijs "Darkneoteric" Willems<br>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title class="text-h5 font-weight-light">
              5th board
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              Chairman: Daniël "thiefzz" Floor<br>
              Commissioner of Esports/Treasurer: Bob "Bobbuz" Even<br>
              Secretary: Louis "Poking" Hu<br>
              Commissioner of internal affairs: Jelle "Zenga" Idzenga<br>
              Commissioner of external affairs: İlayda "Vriendelijke kebab" Hotamış
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title class="text-h5 font-weight-light">
              4th board
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              Chairman: Ali “Kelbinoh” Kalbiyev<br>
              Treasurer: Tjebbe “Issie54” Iskander Sterck<br>
              Commissioner of Esports/Secretary: Ivo “King Cookie” Heitlager<br>
              Commissioner of internal affairs: Lucia "Luna" Kim<br>
              Commissioner of external affairs: Jose “Bear” Pratdesaba Lopez
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title class="text-h5 font-weight-light">
              3rd board
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              Chairman: Jander “Thoran” Gilbers<br>
              Secretary/Treasurer: Joran “MacVanish” Hagen<br>
              Commissioner of Esports: Andrei “ElDonte” Raureanu<br>
              Commissioner of internal affairs: William “Lampekap88” Schaarman<br>
              Commissioner of external affairs: Allysha “Meavis” Sewradj
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title class="text-h5 font-weight-light">
              2nd board
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              Chairman: Jasper “JappieXD” van Harten<br>
              Secretary: Kimberly “Agile Manifesto” Evertz<br>
              Treasurer: Mauk “Dawarfmaster” Muller<br>
              Commissioner of Internal affairs: Antal “TheMadJokerHD” van Dongen<br>
              Commissioner of external affairs: Maiander “Maiantie” Eigenraam
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title class="text-h5 font-weight-light">
              1st board
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              Chairman: Thijs “Grootbuik” Lieverse<br>
              Secretary: Jan-Berend “JB” Mooijaart<br>
              Treasurer: Anne “Iadri” Schrader<br>
              Commissioner of internal affairs: Stijn “Salish” Overduin<br>
              Commissioner of external affairs: Idwer “Fangedsheep” de Vries
            </v-expansion-panel-text>
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
          name: "Reinout Strating",
          title: "Chair",
          description: "Hello, I'm Reinout Strating but you can call me whatever you want, there is no limit. I'm still searching for a suitible study, that's why this is my breakyear! I enjoy playing any type of games if i get invited to. Always trying to have fun with others, whatever suits their boat. I joined blueshell after a friend introduced me to it last year and got me instantly hooked with the friendliness and good times. It got me excited enough to join the board and here i am! CHAIR ready for service!",
          image: require("@/assets/board7pics/reinout.jpg"),
        },
        {
          name: "Max Jansdam",
          title: "Secretary and Commissioner of the Esports Lounge",
          description: "Hey, I am Max Jansdam and I am the Secretary and Commissioner of the Esports Lounge affairs for this year. This year I will be a third year the Psychology bachelor here. I joined Blueshell 2 years ago during corona with the idea of finding people to play smash ultimate and just dance with. While I didnt join a lot of events during the first year, I started joining and organising a lot more within blueshell during my second year. I had practically joined all committees with events that I liked to join and after being asked by a couple friends to join them in the next board, I decided that it might be fun and that I wanted to help out. Lets make this an amazing year!",
          image: require("@/assets/board7pics/max.jpg"),
        },
        {
          name: "Jesse van Gameren",
          title: "Treasurer and Commissioner of Esports affairs",
          description: "Hello fellow people! My name is Jesse van Gameren and I am the Treasurer and Commissioner of Esports affairs of Blueshell this year. Currently I am in my third year of Industrial Engineering and Management. I became member of Blueshell 2 years ago at the beginning of my university level academics after being invited to a few events, where I found a great community! I like to play games and do whatever, as long as it is with friends! After joining more events and becoming part of multiple committees, I wanted to try something new were I could learn more myself, and were I could give more to the community that gives me so much enjoyment at the university! Together let’s make this a wonderful year to never forget!",
          image: require("@/assets/board7pics/jesse.jpg"),
        },
        {
          name: "Mitchell van Poecke",
          title: "Officer of Internal Affairs",
          description: "Hey, What's up! I am Mitchell van Poecke and this year I will be the Officer of Internal Affairs of Blueshell. I am currently in my third year of Creative Technology and this will also be my third year in Blueshell. I enjoy going for a walk, working on some game prototypes an of course playing games with friends. In my first year of Blueshell I attended most Minecraft events an a couple of gamenights. This made me want to join a committee so I joined the MCie in the second year. First the idea of doing a board year didn't speak to me, but after a few months of working in a committee the idea grew on me and so I became board. I hope we can have another fun and exiting year together you all!",
          image: require("@/assets/board7pics/mitchell.jpg"),
        },
        {
          name: "Sanne van Kooten",
          title: "Officer of External Affairs",
          description: "Hello! I am Sanne van Kooten, and I am this year's Officer of External Affairs! At the moment I am a fourth year biomedical engineering bachelor student. Next to this I also enjoy being creative, visiting concerts and of course I like to game. I joined Blueshell in the second year of my studies after doing the Nintendo pubquiz during the kick off, after which I was immediately enthusiastic and signed up to be a member. After doing a few committees, I decided it was time to do something bigger, like being a board member which is where we are now. I look forward to creating an even bigger gaming community with loads of fun events!",
          image: require("@/assets/board7pics/sanne.jpg"),
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
