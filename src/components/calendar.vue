<template>
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
    <eventDetails :selected-event="selectedEvent" />
  </v-menu>
</template>

<script>
import {VCalendar} from 'vuetify/labs/VCalendar'
import EventDetails from "@/components/EventDetails.vue";
import { useLocale } from 'vuetify'
import {$handleNetworkError} from "@/plugins/handleNetworkError";

export default {
  name: "Calendar",
  components: {
    EventDetails,
    VCalendar,
  },
  data: () => ({
    // Not sure why, but focus needs to be in an array
    focus: [new Date()],
    selectedEvent: null,
    selectedElement: null,
    selectedOpen: false,
    events: [],
    collectedMonths: [],
    monthsLoading: 0,
  }),
  watch: {
    focus: function (newMonthArr, oldMonthArr) {
      const newMonth = newMonthArr[0];
      const oldMonth = oldMonthArr[0];

      if (newMonth > oldMonth) {
        this.getEvents(this.addMonths(1, newMonth));
      } else {
        this.getEvents(this.addMonths(-1, newMonth));
      }
    },
  },
  mounted() {
    // Set the locale so weeks start on monday
    const { current } = useLocale()
    current.value = 'en-NL'

    const focusMonth = this.focus[0];
    focusMonth.setDate(1); // Set the date to the first of the month to prevent any weirdness regard month length

    this.getEvents(focusMonth);
    this.getEvents(this.addMonths(1, focusMonth));
    this.getEvents(this.addMonths(-1, focusMonth));
  },
  methods: {
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
    getEvents(month) {
      // Format to yyyy-mm
      const formattedMonth = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}`;

      if (!this.collectedMonths.includes(formattedMonth)) {
        this.collectedMonths.push(formattedMonth)
        setTimeout(() => this.monthsLoading++, 500);

        this.$http.get('events?from=' + formattedMonth)
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
          .catch(e => $handleNetworkError(e))
      }
    },
    addMonths(amount, date) {
      let res = new Date(date); // create a copy of the original date
      res.setMonth(date.getMonth() + amount);
      return res;
    },
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
      :nth-last-child(5 of .v-calendar-month__day) {
        border-bottom-left-radius: settings.$border-radius-root;
      }
    }

    :nth-last-child(1 of .v-calendar-month__day) {
      border-bottom-right-radius: settings.$border-radius-root;
    }
  }

}
</style>
