<template>
  <v-dialog v-bind:value="eventToDelete" max-width="400">
    <template v-slot:activator="{ on: dialog, attrs }">
      <v-list two-line>
        <template v-for="(event,i) in events">
          <v-list-item v-bind:key="event.title+event.startTime"
                       v-bind:style="{ 'background-image': !event.banner ? '' :  $vuetify.theme.dark ? `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${event.banner})` : `linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${event.banner})`}"
                       style="background-size: cover;background-position: center;backdrop-filter: blur(2px);">
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{ event.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ formatStartEndTime(event) }}
              </v-list-item-subtitle>
              {{ event.description ? event.description.slice(0, 100) : 'No description...' }}
            </v-list-item-content>


            <v-list-item-action-text>
              {{ idToCommittee[event.committee] }}
            </v-list-item-action-text>
            <v-list-item-action>

              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on"
                         icon
                         :disabled="!event.signUp"
                         @click="$router.push('signups/'+event.id)">
                    <v-icon>mdi-list-status</v-icon>
                  </v-btn>
                </template>
                <span>Check signups</span>
              </v-tooltip>

              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on"
                         icon
                         @click="$router.push('edit/'+event.id)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Edit event</span>
              </v-tooltip>

              <v-tooltip left>
                <template v-slot:activator="{ on: tooltip }">
                  <v-btn v-bind="attrs" v-on="{ ...tooltip, ...dialog }"
                         icon @click="eventToDelete = event">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Delete event</span>
              </v-tooltip>
            </v-list-item-action>
          </v-list-item>
          <v-divider
              v-if="i < events.length - 1" v-bind:key="i"
          ></v-divider>
        </template>
      </v-list>


    </template>


    <v-card>
      <v-card-title>
              <span class="text-h5">
                Are you sure you want to delete this event:
                {{ eventToDelete ? eventToDelete.title : 'NO EVENT????' }}
              </span>
      </v-card-title>
      <v-card-text>
        There will be no undo
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
            text
            @click="eventToDelete=null">
          No
        </v-btn>
        <v-btn
            color="red"
            text
            @click="deleteEvent">
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "event-manage-list",
  props: ["events", "idToCommittee"],
  data: () => ({
    eventToDelete: null,
  }),
  methods: {
    deleteEvent() {
      this.$http.delete('events/' + this.eventToDelete.id, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
          .then(response => {
            if (response.status === 200) {
              //TODO: TEST REACTIVITY !!!!!!!
              this.events = this.events.filter(event => event.id !== this.eventToDelete.id)
              this.eventToDelete = null
            }
          })
    },
    formatStartEndTime(event) {
      let startTime = new Date(Date.parse(event.startTime))
      let endTime = new Date(Date.parse(event.endTime))

      let result = startTime.toLocaleString('en-NL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
      })
      result += '-'

      if (startTime.getDate() !== endTime.getDate()) {
        result += endTime.toLocaleString('en-NL', {day: 'numeric', month: 'long'})
      }
      result += endTime.toLocaleString('en-NL', {
        hour: '2-digit',
        minute: '2-digit'
      });
      return result
    },
  }
}
</script>

<style scoped>

</style>
