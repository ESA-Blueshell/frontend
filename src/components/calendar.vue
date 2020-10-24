<template>
  <v-row class="fill-height">
    <v-col>
      <!-- Start of the top bar. Includes today, previous and forward buttons and current month. -->
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
          <!-- Circle loading thingy (only appears after the user's been waiting for new events for 0.5s) -->
          <v-fade-transition>
            <v-progress-circular
                v-if="monthsLoading > 0"
                indeterminate
                color="primary">
            </v-progress-circular>
          </v-fade-transition>
        </v-toolbar>
      </v-sheet>
      <!-- End of the top bar -->
      <v-sheet height="600">
        <!-- The actual calendar -->
        <v-calendar
            ref="calendar"
            v-model="focus"
            :events="events"
            :weekdays="weekdays"
            color="primary"
            type="month"
            @click:event="showEvent"
            locale="en-US">
        </v-calendar>

        <!-- Start of the menu that pops up when selecting an event -->
        <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
            v-if="selectedEvent"
        >
          <v-card color="grey lighten-4" min-width="350px" max-width="350px">
            <v-toolbar :color="selectedEvent.color" dark>
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
                  <v-btn icon v-on="on" @click="addToCal">
                    <v-icon>mdi-calendar</v-icon>
                  </v-btn>
                </template>
                <span>Add to calendar</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <div id="eventDetails" v-if="selectedEvent.details">
                <p>
                  <span
                      v-html="expand || selectedEvent.details.split(/\s+/).length <= 100 ? selectedEvent.details : hundredWords(selectedEvent.details)+'...'"></span>
                  <br v-if="!expand  && selectedEvent.details.split(/\s+/).length > 100">
                  <a v-if="!expand && selectedEvent.details.split(/\s+/).length > 100"
                     @click="expandWords">
                    <b>read more</b>
                  </a>
                </p>
              </div>
              <v-divider v-if="selectedEvent.details"></v-divider>
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
              <v-divider
                  v-if="selectedEvent.memberPrice !== null && selectedEvent.publicPrice !== null"></v-divider>
              <p v-if="selectedEvent.memberPrice !== null && selectedEvent.publicPrice !== null"
                 class="mt-4">
                <b>Price</b>
                <br>
                Members: €{{ selectedEvent.memberPrice }}
                <br>
                Non-members: €{{ selectedEvent.publicPrice }}
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
    selectedEvent: null,
    selectedElement: null,
    selectedOpen: false,
    calendarId: "blueshellesports@gmail.com",
    events: [],
    expand: false,
    monthsCollected: [],
    weekdays: [1, 2, 3, 4, 5, 6, 0],
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
                      location: elem.location, //todo: split up location and address (so global lounge would be location and bastille Enschede would be the address)
                      memberPrice: elem.memberPrice,
                      publicPrice: elem.publicPrice,
                      googleId: elem.googleId,
                    })
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
        this.expand = false
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
    // Get the next month. Formatting: yyyy-MM
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
    // Get the previous month. Formatting: yyyy-MM
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
      if (this.selectedEvent.location.includes("iscord")) {
        window.open(encodeURI('https://discord.gg/23YMFQy'));
      } else {
        window.open(encodeURI('https://www.google.com/maps/search/?api=1&query=' + this.selectedEvent.location));
      }
    },
    addToCal() {
      window.open(encodeURI('https://calendar.google.com/event?action=TEMPLATE&tmeid=' + this.selectedEvent.googleId + '&tmsrc=' + this.calendarId))
    },
    hundredWords(str) {
      return str.split(/\s+/).slice(0, 100).join(" ");
    },
    expandWords() {
      this.expand = true
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