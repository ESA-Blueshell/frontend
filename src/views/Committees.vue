<template>
  <v-main>
    <top-banner title="Committees"></top-banner>
    <div class="mx-auto my-10" style="max-width: 800px">
      <div class="mx-3">
        <p class="body-1">
          Would you like to make the most of your student life, and experience what it is to work
          together with other students to make great things happen? If so, then perhaps joining a
          committee is something for you! Committees are groups of students that work together to
          organize events or provide services for the association, while also having a lot of fun
          and getting some professional experience. </p>
        <p class="body-1">
          If you would like to join a meeting to see if we are something for you, or if you have a
          question, feel free to contact the board at
          <a href="mailto:internal-affairs@blueshell.utwente.nl">internal-affairs@blueshell.utwente.nl</a>
          . You could also ask us on Discord or in person at one of the events.
        </p>
        <p class="body-1">
          Do you have a great idea for an event or a new committee, then be sure to contact us!
        </p>
      </div>
      <v-expansion-panels accordion>
        <v-expansion-panel v-for="committee in committees" v-bind:key="committee.name">
          <v-expansion-panel-header class="text-h5 font-weight-light">
            {{ committee.name }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>
              {{ committee.description }}
            </p>
            <p v-if="committee.why"><b>
              Why join?
            </b></p>
            <p v-if="committee.why">
              {{ committee.why }}
            </p>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-main>
</template>
<script>
import TopBanner from "@/components/top-banner";

export default {
  components: {TopBanner},
  data: () => {
    return {
      committees: [
        {
          name: "LegaCie",
          description: "The LegaCie, some call it the backbone of Blueshell, others will just say it is a bunch of people that like to organize a good party. That’s why the LegaCie organizes the monthly gamenights. Of course the gamenights should be held to the highest of standards, that’s why this is one the largest committees in all of Blueshell! But, you might ask, what does the LegaCie really do? They make sure all games are working during the gamenight, make reservations, create an amazing pubquiz from time to time and all the other background stuff you wouldn't even know exists.",
          why: "As said before this is one of the largest committees in Blueshell and we can always use more people! If you have a great idea for a gamenight like a theme or special game, or if you just want to help out a bit you should definitely join the committee!"
        }, {
          name: "SiteCie",
          description: "You probably already read it from the name, but the SiteCie is responsible for the website. They do not only help with the maintenance of this one but also develop a new website! This is of course still highly experimental and will not see any implementation in the near future. However, in the end, this will create an amazing new platform that looks even better.",
          why: "Joining this committee does not require you to have any previous knowledge of coding a website, you will learn this along the way. What you do require is the enthusiasm to work with a team on something like this and make it great!"
        }, {
          name: "SmashCie",
          description: "Our Smash committee has come up relatively recently, but immediately grew to be one of the most active and important of Blueshell! As a party game that we all know from our childhood, to the newly released Smash Ultimate, we like to organize tournaments and game nights where you can play together with your fellow Blueshellers.",
          why: "This committee is of course for Smash enthusiasts, people who like the games and love to play it once in a while with friends. Also, in this committee people with Switches with the game are especially appreciated."
        }, {
          name: "MediaCie",
          description: "This is the newest committee in Blueshell. This committee does everything related to the Blueshell Youtube and Twitch channel. They collect highlights which they can learn to edit and put on the Youtube channel. Of course, this is not the only thing the committee will do. They can also distribute some other fun moments on the Youtube channel and can help to stream on Twitch.",
          why: "This committee is for the aspiring streamers and video editors. But don’t worry, you don’t need any experience with software or streams. You will learn together along the way!"
        }, {
          name: "LoLCie",
          description: "Another one of the larger committees in Blueshell. This committee may not be that active if you look at the event count, but they make up for it in quality. They are responsible for the big LoL tournaments and the LoL custom evenings with great success!",
          why: "It is a given that people with experience in LoL are greatly appreciated in this committee. Apart from that you don’t need any experience and will learn to organize big events along the way."
        }, {
          name: "OWCie",
          description: "This committee is responsible for all Overwatch events in Blueshell, including the Blueshell Overwatch cup. Apart from that the committee members are all well versed in the Overwatch memes.",
          why: "This committee is meant for those that like Overwatch and would love to make others smile during their events. Other than that is this one of the smallest committees which makes teamwork far easier."
        }, {
          name: "VACCie",
          description: "The VACCie is named after the Valve Anti-Cheat System, which is famous in the game CS:GO for catching no cheaters at all. This committee however is able to organize great activities in CS:GO! They organize events such as wargames, 2v2’s, wingman tournaments or 5v5’s, which are regularly planned to satisfy the need of a true skill-based shooter in Blueshell.",
          why: "For this committee you absolutely do not need to have a high ranking in the CS:GO standings. You will gain a lot of experience while organizing new events and make friends in the process."
        }, {
          name: "MCie",
          description: " Minecraft, that lovely game with a special place in all our hearts. While it may not be in the same E-sports genre as some of our other games, Blueshell has their very own Minecraft committee. They frequently organize events in the blocky game, ranging from PVP heavy arena tournaments to puzzle-like droppers to a permanent server where you can spend some quality relaxed time.",
          why: "Do you have good ideas for an online Minecraft event or would you like helping us organize these small events? Maybe you want to power to decide what we will organize on the official Blueshell survival server. This committee is guaranteed fun for all people."
        }, {
          name: "ShitpostCie",
          description: "In Lord of the rings, we had the one ring to rule them all, in Blueshell we have one committee to rule them all. The ShitpostCie is not this committee however. But it is a necessary one! They make the Blueshell Discord just a little bit better.",
          why: "Yes"
        }, {
          name: "DotaCie",
          description: "Beside League of Legends there is another large MOBA represented in Blueshell. This titan is of course Dota 2. Not only are there active Dota players in Blueshell but there is even a committee centered around making the best Dota activities possible. They mainly focus on setting up 5v5 custom lobbies, or getting groups together to play a fun match.",
          why: "This committee is here for all the Dota enthusiasts. If you like Dota you should look into this committee. This committee is one of the lightweight committees but nonetheless you will certainly learn something and make new friends."
        }, {
          name: "4FunCie",
          description: "As the name suggests this committee is focussed around Fun! They are responsible for the non-game related activities Blueshell organizes. These can include a movie night with the scariest of movies, a gala or something like lasergaming. If it is not a game it is for the 4FunCie",
          why: "This committee will not only give you a lot of experience but are also some of the biggest activities around. In this committee, you are totally free to organize anything you want and you will get the tools to achieve greatness."
        }, {
          name: "PineCo",
          description: "This name might sound oddly familiar to those who don’t mind to endure a game of tedious grinding and lovely creatures a.k.a pokemon. This committee serves as a body to introduce new trainers to the world of pokemon (esports) through small events.",
          why: "This committee is for those passionate about the pokemon games who want to see is grow within Blueshell and find new friends (or rivals named Ass) to play and compete with. Not a lot of work but it is a lot of fun."
        }, {
          name: "GNSKCie",
          description: "As the GNSK (Groot Nederlands Studeten Kampioenschap) comes to Enschede they will be the ones preparing us for the esports here. These heroes make sure that on the day itself everything regarding esports will run smoothly and the athletes will shine in their game!"
        }, {
          name: "DesignCie",
          description: "Have you seen a flyer from Blueshell? Maybe a banner or some sort of a 3D Shelly figure? Big chance that the DesignCie made this! They do everything which mere mortals cannot comprehend however that does not mean you cant! In this committee, you will gain experience designing all kinds of stuff from the easy to the hard. This committee is essential to Blueshell as it is the primary way of making promotion to those yet unfamiliar with this amazing association.",
          why: "If you are even mildly interested in designing or just helping out, in general, this committee is perfect for you!"
        }
      ]
    }
  }
}
</script>

