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
          name: '4FunCie',
          description: 'We organize offline events, which are not related to videogames. We\'ve organized various events like house party, dinner, karaoke , drinks, movie night, werewolves and many more to come!',
        },
        {
          name: 'AcquiCie',
          description: 'The Acquicie will work as an extension of the external affairs role, where you will work on contacting and setting up contracts with companies and other parties for collaborations or sponsorships for Blueshell and all her projects. This will give you a chance to improve your professional communication and negotiation skills. We will meet every week (or two weeks) to discuss progress, look for sponsors, and send some emails!',
        },
        {
          name: 'ChessCie',
          description: ' ChessCie is a community of styleful people who so happen to enjoy chess. We do team-building activities to get to know the other members of ChessCie better as this improves the quality and effectiveness of our highly efficient meetings. This guarantees that ChessCie events are and will always be by far the best organized events in Blueshell.',
        },
        {
          name: 'DesignCie',
          description: 'Have you seen a flyer from Blueshell? Maybe a banner or some sort of a 3D Shelly figure? Big chance that the DesignCie made this! They do everything which mere mortals cannot comprehend however that does not mean you cant! This committee is essential to Blueshell as it is the primary way of making promotion to those yet unfamiliar with this amazing association.',
        },
        {
          name: 'DegeneraCie',
          description: 'We host online events roughly once a month where we hold video game or anime music quizzes.',
        },
        {
          name: 'LegaCie',
          description: 'Have you seen a flyer from Blueshell? Maybe a banner or some sort of a 3D Shelly figure? Big chance that the DesignCie made this! They do everything which mere mortals cannot comprehend however that does not mean you cant! This committee is essential to Blueshell as it is the primary way of making promotion to those yet unfamiliar with this amazing association.',
        },
        {
          name: 'LoLCie',
          description: 'From organising the biweekly custom games, we also organise big physical league tournaments for 80 people, or even bigger online.',
        },
        {
          name: 'MCie',
          description: 'We organise Minecraft events and host a semi-permanent server throughout the year.',
        },
        {
          name: 'MediaCie',
          description: 'This committee does everything related to the Blueshell Youtube and Twitch channel. They are primarily concerned with the video content that Blueshell produces, ranging from streaming their favorite game or our very own tournaments to making highlight reels for our association!',
        },
        {
          name: 'ModeraCie',
          description: 'A committee responsible for helping the board with Discord server moderation.',
        },
        {
          name: 'NintenCo',
          description: 'ChessCie is a community of styleful people who so happen to enjoy chess. We do team-building activities to get to know the other members of ChessCie better as this improves the quality and effectiveness of our highly efficient meetings. This guarantees that ChessCie events are and will always be by far the best organized events in Blueshell.',
        },
        {
          name: 'ServerCie',
          description: 'The ServerCie is currently looking into possibilities for our own Blueshell server. This would host the website and possible extra services like a mail server/ftp. They contact SNT and Lisa (UT server providers) to see what is possible there and will be the main committee responsible for the maintenance of the server.',
        },
        {
          name: 'ShitpostCie',
          description: 'This committee hosts all kinds of online discord events',
        },
        {
          name: 'SiteCie',
          description: 'The SiteCie is the team responsible for maintaining the website of blueshell: esa-blueshell.nl. We use our own frontend (Vue) and backend (Java spring), so if you\'re interested in learning/helping out with web development, make sure to check us out!',
        },
        {
          name: 'SmashCie',
          description: 'Want to organize a Smash play evening with the people? Well this committee has got your back. Their regular Smashfest evenings were and still continue to be the best place to find, group up and play tons of Super Smash Bros. matches together with our Smash community. They also hold the tournaments of the said game every once in a while',
        },
        {
          name: 'RotaCie',
          description: 'This committee is responsible for organizing "Rotational" game events for the community. In other words, there are no limits to what game-specific event this committee holds, as long as it is fun and brings the people together! RotaCie is mainly a supporting committee where we work together with the member base to create popular events such as: The Kick-off games, Apex Legends tournament server shenanigans and the various instances of "the battle of the boards". Pressure of working in the committee is very chill and when we get hyped for an event we put in the extra effort and it shows!',
        },
        {
          name: 'VACCie',
          description: ' The VACCie is named after the Valve Anti-Cheat System, which is famous in the game CS:GO for catching no cheaters at all. This committee however is able to organize great activities in CS:GO! They organize events such as wargames, 2v2’s, wingman tournaments or 5v5’s, which are regularly planned to satisfy the need of a true skill-based shooter in Blueshell.',
        },
        {
          name:'PrCie',
          description: 'The PRCie is a new committee which focuses on the communication strategy towards members and tries to reach new members with marketing and promotion campaigns.',
        },
        {
          name: 'LanCie',
          description: 'This committee will organise a lan party, with arrangement of location, setup and promotion. This will be the first official Blueshell Lan party, so join this committee and be the one to organise it!',
        },
        {
          name: 'TravelCie',
          description: 'This brand new committee will organize trips for the association. Think about trips like going to Gamescon, Worlds, but also things like The videogame museum in Zoetermeer or other places.',
        },
      ]
    }
  }
}
</script>

