<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar" class="ml-3">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-fade-transition>
            <v-progress-circular
                v-if="monthsLoading > 0"
                indeterminate
                color="primary"
            ></v-progress-circular>
          </v-fade-transition>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :type="type"
            @click:event="showEvent"
            @change="updateRange">
        </v-calendar>


        <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
            v-if="selectedEvent"
        >
          <v-card
              color="grey lighten-4"
              min-width="350px"
              max-width="350px"
          >
            <v-toolbar
                :color="selectedEvent.color"
                dark
            >
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-on="on" @click="findLocation">
                    <v-icon>mdi-google-maps</v-icon>
                  </v-btn>
                </template>
                <span>Find location</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-calendar</v-icon>
                  </v-btn>
                </template>
                <span>Add to calendar</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <p id="eventDetails">
                {{ hundredWords(selectedEvent.details) }}
                <br>
                <a v-if="selectedEvent.details.split(/\s+/).length > 100" @click="expandWords">
                  <b> read more </b>
                </a>
              </p>
              <v-divider></v-divider>
              <p class="mt-4">
                <b>When</b>
                <br>
                {{ formatDate(selectedEvent.start) }}
              </p>
              <v-divider v-if="selectedEvent.location"></v-divider>
              <p v-if="selectedEvent.location" class="mt-4">
                <b>Where</b>
                <br>
                {{ selectedEvent.location }}
              </p>
              <v-divider v-if="selectedEvent.location"></v-divider>
              <p v-if="selectedEvent.priceMember !== null && selectedEvent.pricePublic !== null"
                 class="mt-4">
                <b>Price</b>
                <br>
                Members: €{{ selectedEvent.priceMember }}
                <br>
                Non-members: €{{ selectedEvent.pricePublic }}
              </p>
            </v-card-text>
          </v-card>
        </v-menu>


      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>

import axios from 'axios';

export default {
  name: "Calendar",
  data: () => ({
    today: new Date().toISOString().substring(0, 10),
    focus: new Date().toISOString().substring(0, 10),
    type: "month",
    name: null,
    details: null,
    start: null,
    date: null,
    color: "#1976D2",
    selectedEvent: null,
    selectedElement: null,
    selectedOpen: false,

    events: [{
      name: "what the fuck",
      details: "What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little \"clever\" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.",
      date: "2020-10-05",
      start: new Date("2020-10-05 21:02:11"),
      location: "global lounge enschede",
      priceMember: 0,
      pricePublic: 2
    }],
    dialog: false,
    monthsCollected: [],
    currentMonth: null,
    monthsLoading: 0

  }),
  mounted() {
    this.setToday();
    const month = this.currentMonth;
    [month, this.prevMonth(month), this.nextMonth(month)].forEach(it => this.getEvents(it));
  },
  methods: {
    getEvents(month) {
      if (!this.monthsCollected.includes(month)) {
        console.log("getting events for " + month);
        this.monthsCollected.push(month)
        setTimeout(() => this.monthsLoading++, 500);

        axios.get('http://127.0.0.1:8080/api/events?from=' + month)
            .then(response => {
              let res = []
              response.data.forEach(elem => {
                    res.push({
                      name: elem.title,
                      details: elem.description,
                      date: elem.startTime.substring(0, 10),
                      start: new Date(elem.startTime),
                      location: elem.location, //todo: split up location and address (so global lounge would be location and bastille enschede would be the address)
                      priceMember: elem.price_member,
                      pricePublic: elem.price_public,
                    });
                  }
              )
              this.events.push(...res);
            })
            .catch(error => console.log(error))
            .then(() => this.monthsLoading--);
      }
    },
    setToday() {
      this.focus = ''
      this.currentMonth = new Date().toISOString().substring(0, 7)
    },
    prev() {
      this.$refs.calendar.prev()

      this.currentMonth = this.prevMonth(this.currentMonth);
      this.getEvents(this.prevMonth(this.currentMonth))
    },
    next() {
      this.$refs.calendar.next()

      this.currentMonth = this.nextMonth(this.currentMonth);
      this.getEvents(this.nextMonth(this.currentMonth))
    },


    showEvent({nativeEvent, event}) {
      const open = () => {
        this.selectedEvent = event
        this.selectedEvent.color = "primary"
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange({start, end}) {

    },
    nextMonth(month) {
      const splitTime = month.split("-");
      const currYear = splitTime[0];
      const currMonth = splitTime[1];

      let monthInt = parseInt(currMonth);
      if (monthInt === 12) {
        return (parseInt(currYear) + 1) + "-01";
      } else {
        if (monthInt >= 1 && monthInt <= 8) {
          return currYear + "-0" + (monthInt + 1);
        } else {
          return currYear + "-" + (monthInt + 1);
        }
      }
    },
    prevMonth(month) {
      const splitTime = month.split("-");
      const currYear = splitTime[0];
      const currMonth = splitTime[1];

      let monthInt = parseInt(currMonth);
      if (monthInt === 1) {
        return (parseInt(currYear) - 1) + "-12";
      } else {
        if (monthInt >= 2 && monthInt <= 10) {
          return currYear + "-0" + (monthInt - 1);
        } else {
          return currYear + "-" + (monthInt - 1);
        }
      }
    },
    findLocation() {
      window.open(encodeURI('https://www.google.com/maps/search/?api=1&query=' + this.selectedEvent.location))
    },
    hundredWords(str) {
      return str.split(/\s+/).slice(0, 100).join(" ");
    },
    expandWords() {
      document.getElementById("eventDetails").innerHTML = this.selectedEvent.details
    },
    formatDate(date) {
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(date).replace(',', '');
    }
  }
}
</script>

<style scoped>

</style>