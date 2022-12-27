<template>
  <v-row
    justify="center"
    align="center"
    class="fill-height"
  >
    <v-col>
      <!-- Start of the top bar. Includes today, previous and forward buttons and current month. -->
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn
            variant="outlined"
            class="mr-4"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            color="accent"
            icon="mdi-chevron-left"
            @click="prev"
          />
          <v-btn
            color="accent"
            icon="mdi-chevron-right"
            @click="next"
          />
          <v-toolbar-title
            v-if="$refs.calendar"
            class="ml-3"
          >
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer/>
          <!-- Circle loading thingy (only appears after the user's been waiting for new events for 0.5s) -->
          <v-fade-transition>
            <v-progress-circular
              v-if="monthsLoading > 0"
              class="mr-3"
              indeterminate
              color="primary"
            />
          </v-fade-transition>
          <v-btn
            v-if="type==='day'"
            variant="outlined"
            @click="viewMonth"
          >
            <v-icon class="ml-n2 mr-1">
              mdi-arrow-left
            </v-icon>
            back
          </v-btn>
        </v-toolbar>
      </v-sheet>
      <!-- End of the top bar -->
      <v-sheet
        class="mx-auto"
        height="600"
      >
        <!-- The actual calendar -->
        <v-calendar
          ref="calendar"
          v-model="focus"
          :events="events"
          :weekdays="weekdays"
          color="primary-lighten-1"
          event-color="primary"
          :type="type"
          :interval-format="intervalFormat"
          locale="en-NL"
          @change="monthChange"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        />

        <!-- Start of the menu that pops up when selecting an event -->
        <v-menu
          v-if="selectedEvent"
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card max-width="350px">
            <!-- Start of the toolbar in the selected event menu -->
            <!-- Includes the event's title and the location and add to calendar buttons -->
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <!-- Name of the event -->
              <v-toolbar-title
                v-if="selectedEvent.name.length < 15"
                :text="selectedEvent.name"
              />
              <marquee-text
                v-else
                :repeat="3"
                :duration="10"
              >
                <v-toolbar-title
                  class="mr-5"
                  :text="selectedEvent.name"
                />
              </marquee-text>

              <v-spacer/>
              <!-- Start of the "Find location" button. Check the documentation for v-tooltip to find out how this works exactly -->
              <v-tooltip location="bottom">
                <template #activator="{ on }">
                  <!-- The actual button -->
                  <v-btn
                    icon
                    v-on="on"
                    @click="findLocation"
                  >
                    <v-icon>mdi-google-maps</v-icon>
                  </v-btn>
                </template>
                <span>Find location</span>
              </v-tooltip>
              <!-- Start of the "Add to calendar" button. Check the documentation for v-tooltip to find out how this works exactly -->
              <v-tooltip location="bottom">
                <template #activator="{ on }">
                  <!-- The actual button -->
                  <v-btn
                    icon
                    v-on="on"
                    @click="addToCal"
                  >
                    <v-icon>mdi-calendar</v-icon>
                  </v-btn>
                </template>
                <span>Add to calendar</span>
              </v-tooltip>
            </v-toolbar>

            <!-- Promo image -->
            <img
              v-if="selectedEvent.banner"
              :src="selectedEvent.banner"
              style="width: 100%; object-fit: contain"
              alt="promo image for the event">

            <v-card-text>
              <!-- Description of the event -->
              <p v-if="selectedEvent.details">
                <!-- In the span is the actual text of the event -->
                <!-- If the expand variable is true show the fill message, otherwise only show the first 100 words -->
                <span
                  v-html="expand || !selectedLong ? $root.markdownToHtml(selectedEvent.details) : $root.markdownToHtml(hundredWords(selectedEvent.details))+'...'"
                />
                <!-- Only show the "read more" if the message is long -->
                <!-- If it's clicked expand will be set to true and the full message will be shown -->
                <br v-if="!expand && selectedLong">
                <a
                  v-if="!expand && selectedLong"
                  @click="expandWords"
                >
                  <b>read more</b>
                </a>
              </p>
              <p v-else>
                No description...
              </p>
              <!-- Starting time of the event -->
              <v-divider class="my-2"/>
              <p>
                <b>When</b>
                <br>
                {{ formatDate(selectedEvent.start, selectedEvent.end) }}
              </p>
              <!-- Only show this part if there is a location for this event (should always be true tho) -->
              <v-divider
                v-if="selectedEvent.location"
                class="my-2"
              />
              <p v-if="selectedEvent.location">
                <b>Where</b>
                <br>
                {{ selectedEvent.location }}
              </p>
              <!-- Only show this part if there is a price for this event -->
              <!-- I want to die -->
              <v-divider
                v-if="selectedEvent.memberPrice !== 0 && selectedEvent.publicPrice !== 0 && selectedEvent.memberPrice !== '' && selectedEvent.publicPrice !== '' && selectedEvent.memberPrice !== null && selectedEvent.publicPrice !== null"
              />
              <p
                v-if="selectedEvent.memberPrice !== 0 && selectedEvent.publicPrice !== 0 && selectedEvent.memberPrice !== '' && selectedEvent.publicPrice !== '' && selectedEvent.memberPrice !== null && selectedEvent.publicPrice !== null"
                class="mt-4"
              >
                <b>Price</b><br>
                Members: €{{ selectedEvent.memberPrice }} <br>
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
import MarqueeText from 'vue-marquee-text-component'

export default {
  name: "Calendar",
  components: {
    MarqueeText
  },
  data: () => ({
    today: new Date().toISOString().substring(0, 10),
    focus: new Date().toISOString().substring(0, 10),
    selectedEvent: null,
    selectedLong: null,
    selectedElement: null,
    selectedOpen: false,
    calendarId: "blueshellesports@gmail.com",
    type: 'month',
    events: [],
    expand: false,
    monthsCollected: [],
    weekdays: [1, 2, 3, 4, 5, 6, 0],
    currentMonth: null,
    monthsLoading: 0,
    linkRegex: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/i,
    htmlRegex: /<\/?[a-z][\s\S]*>/i
  }),
  mounted() {
    this.setToday();
    const month = this.currentMonth;
    [month, this.prevMonth(month), this.nextMonth(month)].forEach(it => this.getEvents(it));
  },
  methods: {
    // Clean up the given description
    // 1. turn newlines into html <br>
    // 2. remove lines starting with 'location: ', 'time: ', etc.
    cleanup(description) {
      // If string is not html, replace all newlines with <br>
      if (!description.match(/<\/?[a-z][\s\S]*>/i)) {
        description = description.replace(/\n/g, '<br>');
      }
      let splitDesc = description.split('<br>');
      let res = '';
      splitDesc.forEach((line) => {
        // Check if the line starts with 'location: ', 'time: ', etc. if it does, skip this line
        if (!line.toLowerCase().startsWith('location:') && !line.toLowerCase().startsWith('time:') && !line.toLowerCase().startsWith('type:')) {
          //If we want to add the line. We will have to fix links
          //If the line is already html, we still want to change it such that it opens the link in a new tab.
          if (line.match(this.htmlRegex)) {
            line = line.replace(/<a /g, '<a target="_blank" ')
          } else if (line.split(' ').some((word) => word.match(this.linkRegex))) {
            // Otherwise we check if there is even a link in this line.
            // If there is, go through all words in the line and reaplace each link with a proper html element
            let lineRes = "";
            line.split(' ').forEach((word) => {
              if (word.match(this.linkRegex)) {
                lineRes += `  <a href="${word}" target="_blank">${word}</a>`;
              } else {
                lineRes += ` ${word}`;
              }
            });
            lineRes.replace(' ', '');
            line = lineRes;
          }
          // Add the line to the result
          res += '<br>' + line;
        }
      });
      return res.replace('<br>', '');
    },
    getEvents(month) {
      if (!this.monthsCollected.includes(month)) {
        this.monthsCollected.push(month)
        setTimeout(() => this.monthsLoading++, 500);

        this.$http.get('events?from=' + month)
          .then(response => {
            let res = []
            response.data.forEach(elem => {
                res.push({
                  name: elem.title,
                  details: elem.description,
                  date: elem.startTime.substring(0, 10),
                  start: new Date(elem.startTime),
                  end: elem.endTime ? new Date(elem.endTime) : undefined,
                  location: elem.location,
                  memberPrice: elem.memberPrice,
                  publicPrice: elem.publicPrice,
                  googleId: elem.googleId,
                  timed: !!elem.endTime,
                  banner: elem.banner,
                })
              }
            )
            this.events.push(...res);
          })
          .then(() => this.monthsLoading--)
          .catch(e => this.$root.handleNetworkError(e))
      }
    },
    setToday() {
      this.focus = ''
      this.currentMonth = new Date().toISOString().substring(0, 7)
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    //Triggers when the month changes and gets new events accordingly
    monthChange({start}) {
      let newMonth = start.year + '-' + (start.month < 10 ? '0' : '') + start.month;
      if (this.currentMonth != null) {
        if (this.compareMonths(this.currentMonth, newMonth)) {
          this.getEvents(this.prevMonth(newMonth))
        } else {
          this.getEvents(this.nextMonth(newMonth))
        }
      }
      this.currentMonth = newMonth;
    },
    //Return true if m1 is later than m2 (formatting: "yyyy-mm")
    compareMonths(m1, m2) {
      let splitM1 = m1.split('-');
      let splitM2 = m2.split('-');

      if (splitM1[0] > splitM2[0]) {
        return true;
      }
      if (splitM1[0] < splitM2[0]) {
        return false;
      }
      return splitM1[1] > splitM2[1];
    },

    // idfk man i just copied this from the vuetify documentation (https://vuetifyjs.com/en/components/calendars/#events)
    // apparently it triggers when you click on an event which is pretty neat i guess
    showEvent({nativeEvent, event}) {
      const open = () => {
        this.expand = false
        this.selectedEvent = event
        this.selectedEvent.color = "primary"
        this.selectedLong = this.selectedEvent && this.selectedEvent.details && this.selectedEvent.details.split(/\s+/).length > 100
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
    viewDay({date}) {
      this.focus = date
      this.type = 'day'
    },
    viewMonth() {
      this.type = 'month'
    },
    intervalFormat(interval) {
      return interval.time
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
    // Triggers when the location button is clicked on an event.
    // Opens a search on google maps with the location if the location isn't discord
    findLocation() {
      if (this.selectedEvent.location.includes("iscord")) {
        window.open(encodeURI('https://discord.gg/23YMFQy'));
      } else {
        window.open(encodeURI('https://www.google.com/maps/search/?api=1&query=' + this.selectedEvent.location));
      }
    },
    // Triggers when the add to calendar button is clicked on an event.
    // Opens google calendar with the id of the event so all data is instantly filled in
    addToCal() {
      window.open(encodeURI('https://calendar.google.com/event?action=TEMPLATE&tmeid=' + this.selectedEvent.googleId + '&tmsrc=' + this.calendarId))
    },
    // Reduces a string to 100 words
    hundredWords(str) {
      return str.split(' ').slice(0, 100).join(' ');
    },
    expandWords() {
      this.expand = true
    },
    // Format a date object to "Weekday MM dd, HH:mm"
    formatDate(start, end) {
      let str;
      if (end) {

        str = new Intl.DateTimeFormat('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).format(start).replace(',', '');
        str += " - ";
        str += new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).format(end);
      } else {
        str = new Intl.DateTimeFormat('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric'
        }).format(start)
      }
      return str;
    },
    eventsByDate(date) {
      return this.events.filter((event) => date.toLocaleString() === event.date);
    }
  }
}
</script>

<style>
.v-calendar .v-event {
  height: auto !important;
  max-height: calc((100% - 50px)) !important;
}

.v-calendar .v-event .pl-1 {
  white-space: normal !important;
}

.v-calendar .v-event strong {
  display: none;
}

.v-calendar .v-event-timed .pl-1 {
  white-space: normal !important;
}

.v-menu__content {
  min-width: 0 !important;
}
</style>
