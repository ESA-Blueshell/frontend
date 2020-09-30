<template>
  <div>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              unpog
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              pog
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
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
          >
            <v-card
                color="grey lighten-4"
                min-width="350px"
                flat
            >
              <v-toolbar
                  :color="selectedEvent.color"
                  dark
              >
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn
                    text
                    color="secondary"
                    @click="selectedOpen = false"
                >
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: "calendar",
  data: () => ({
    today: "2019-07-07",
    focus: "2019-07-07",
    // today: new Date().toISOString().substring(0, 10),
    // focus: new Date().toISOString().substring(0, 10),
    type: "month",
    name: null,
    details: null,
    start: null,
    date: null,
    color: "#1976D2",
    //todo: hmmmmmmm
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,

    events: [],
    dialog: false,

  }),
  mounted() {
    this.getEvents();
  },
  methods: {
    async getEvents() {

      axios.get('http://127.0.0.1:8080/api/events')
          .then(response => {
                let res = []
                response.data.forEach(elem => {
                      res.push({
                        name: elem.title,
                        details: elem.description,
                        date: elem.startTime.substring(0, 10),
                        start: elem.startTime.substring(0, 10)
                      });
                    }
                )
                this.events = res
              }
          )
          .catch(error => console.log(error))
    },

    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },


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
    updateRange({start, end}) {
      console.log(start.date);
      console.log(end.date);
    }
  }

}
</script>

<style scoped>

</style>