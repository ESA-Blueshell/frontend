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
          <a href="mailto:internal-affairs@blueshell.utwente.nl" target="_blank"
             class="text-decoration-none">internal-affairs@blueshell.utwente.nl</a>
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
          name: 'ChessCie',
          description: 'ChessCie is a community of styleful people who so happen to enjoy chess. We do team-building activities to get to know the other members of ChessCie better as this improves the quality and effectiveness of our highly efficient meetings. This guarantees that ChessCie events are and will always be by far the best organized events in Blueshell.',
        },
        {
          name: 'DegeneraCie',
          description: 'We host online events roughly once a month where we hold video game or anime music quizzes.',
        },
        {
          name: 'DisCo',
          description: 'The DisCo is *the* committee for all your groovy needs! \n' +
              'We organise events that have to do with music and dancing, like Just Dance nights, music jams and Rhythm & Dance nights.\n' +
              'Hope to see you at one of our events!',
        },
        {
          name: 'KickCie',
          description: 'This once-a-year committee helps out with the kick-in (the UT\'s intro week), helping with stands on association markets, providing a tour of the Predator Esports Lounge, etc.',
        },
        {
          name: 'LegaCie',
          description: 'The LegaCie is an amazing committee that organises the monthly gamenight and when they\'re feeling wonky they might even organise a pubquiz. In addition, we host our personal movie nights so there is some good committee bonding. Join us, and always have a spot at every gamenight',
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
          name: 'NintenCo',
          description: 'We Nintendo fans bundle our strength together to organize fun Nintendo-related events. From Nintendo Nights to specific Nintendo games (new and old), the possibilities are endless!',
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
          name: 'PrCie',
          description: 'The PRCie is a new committee which focuses on the communication strategy towards members and tries to reach new members with marketing and promotion campaigns.',
        },
        {
          name: 'TacCie',
          description: 'TacCie is one of Blueshell\'s newest committees focusing on FPS games. The name \'TacCie\' is derived from the tactical shooter aspect of the committee and because it sounded like \'taxi\'. TacCie hosts events focused on all sorts of FPS based games such as Valorant, CS:GO, Overwatch, R6S, Splitgate and many others.',
        },
      ]
    }
  }
}
</script>

