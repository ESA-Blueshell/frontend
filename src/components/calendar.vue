<template>
  <v-row
    justify="center"
    align="center"
    class="fill-height"
  >
    <v-col class="px-0">
      <!-- End of the top bar -->
      <v-sheet
        class="mx-auto"
        height="600"
      >
        <v-calendar
          v-model="focus"
          :events="events"
          :show-adjacent-months="true"
          :hide-week-number="$vuetify.display.xs"
          :weekdays="$vuetify.display.xs ? [1,2,3,4,5] : [1,2,3,4,5,6,0]"
        />

        <v-menu
          v-if="selectedEvent"
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          location="start"
        >
          <eventDetails :selected-event="selectedEvent"/>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import {VCalendar} from 'vuetify/labs/VCalendar'
import EventDetails from "@/components/EventDetails.vue";

export default {
  name: "Calendar",
  components: {
    EventDetails,
    VCalendar,
  },
  data: () => ({
    today: new Date().toISOString().substring(0, 10),
    focus: [new Date()],
    selectedEvent: null,
    selectedElement: null,
    selectedOpen: false,
    calendarId: "blueshellesports@gmail.com",
    type: 'month',
    events: [],
    monthsCollected: [],
    weekdays: [1, 2, 3, 4, 5, 6, 0],
    currentMonth: null,
    monthsLoading: 0,
    linkRegex: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/i,
    htmlRegex: /<\/?[a-z][\s\S]*>/i
  }),
  mounted() {
    this.focus[0].setDate(1); // TODO: remove this line when vuetify fixes their bug https://discord.com/channels/340160225338195969/1189752309173981224/1190330903088611389

    this.currentMonth = new Date().toISOString().substring(0, 7)
    const month = this.currentMonth;
    [month, this.prevMonth(month), this.nextMonth(month)].forEach(it => this.getEvents(it));
  },
  methods: {
    getEvents(month) {
      if (!this.monthsCollected.includes(month)) {
        this.monthsCollected.push(month)
        setTimeout(() => this.monthsLoading++, 500);

        this.$http.get('events?from=' + month)
          .then(response => {
            let res = []
            response.data.forEach(elem => {
                res.push({
                  title: elem.title,
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
    //Triggers when the month changes and gets new events accordingly
    monthChange(month) {
      let newMonth = month.getFullYear() + '-' + (month.getMonth() + 1 < 10 ? '0' : '') + (month.getMonth() + 1);
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
        this.selectedEvent = event
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
    eventsByDate(date) {
      return this.events.filter((event) => date.toLocaleString() === event.date);
    }
  }
}
</script>

<style lang="scss">
@use '../styles/settings';

.v-calendar {
  @media #{map-get(settings.$display-breakpoints, 'xs')} {
    .v-calendar-header__title {
      font-size: 6vw;
    }

    .v-calendar-header__today {
      margin-inline-end: 6px;
    }

    .v-calendar-header__title {
      margin-inline-start: 6px;
    }
  }

  .v-calendar-weekly__day-alldayevents-container {
    min-height: 0;
  }

  .v-calendar-month__day {
    min-height: 84.5px;

    .v-calendar-weekly__day-events-container {
      padding: 0 4px;
    }

    .v-chip {
      background-color: rgb(var(--v-theme-primary));
      color: rgb(var(--v-theme-on-primary));
      padding: 0 5px;

      .v-badge {
        display: none;
      }
    }
  }

  // Add some extra lines for readability
  .v-calendar-weekly__head-weekday, .v-calendar-weekly__head-weekday-with-weeknumber {
    border-bottom: thin solid #e0e0e0;
  }

  .v-calendar-month__weeknumber {
    border-right: thin solid #e0e0e0;
  }

  .v-calendar-weekly__head-weeknumber {
    border-right: thin solid #e0e0e0;
    border-bottom: thin solid #e0e0e0;
  }

  // Rounded corners :)
  .v-calendar__container {
    border-radius: settings.$border-radius-root;

    .v-calendar-weekly__head-weeknumber {
      border-top-left-radius: settings.$border-radius-root;
    }

    :nth-last-child(1 of .v-calendar-month__weeknumber) {
      border-bottom-left-radius: settings.$border-radius-root;
    }

    @media #{map-get(settings.$display-breakpoints, 'xs')} {
      :nth-last-child(7 of .v-calendar-month__day) {
        border-bottom-left-radius: settings.$border-radius-root;
      }
    }

    :nth-last-child(1 of .v-calendar-month__day) {
      border-bottom-right-radius: settings.$border-radius-root;
    }
  }

}
</style>
