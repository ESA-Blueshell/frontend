<template>
  <v-dialog
    :model-value="eventToDelete"
    max-width="400"
  >
    <template #activator="{ on: dialog }">
      <v-list>
        <div
          v-for="(event,i) in events"
          :key="event.title+event.startTime"
        >
          <v-list-item
            lines="two"
            :style="{ 'background-image': !event.banner ? '' :
              $vuetify.theme.global.current.dark ? `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${event.banner})` : `linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url(${event.banner})`}"
            style="background-size: cover;background-position: center;backdrop-filter: blur(2px);"
          >
            <v-list-item-title class="text-h6">
              {{ event.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ formatStartEndTime(event) }}
            </v-list-item-subtitle>
            <span
              v-html="event.description ?
                $root.markdownToHtml(event.description.slice(0, 150) + (event.description.length > 150 ? '...' : '')) :
                'No description...'"
            />

            <template #append>
              <v-container class="fill-height">
                <v-row>
                  <v-col>
                    <p v-if="$vuetify.display.smAndUp">
                      {{ idToCommittee[event.committee] }}
                    </p>
                  </v-col>

                  <v-col>
                    <v-row>
                      <v-tooltip location="left">
                        <template #activator="{ on }">
                          <v-btn
                            icon
                            :disabled="!event.signUp"
                            v-on="on"
                            @click="$router.push('signups/'+event.id)"
                          >
                            <v-icon>mdi-list-status</v-icon>
                          </v-btn>
                        </template>
                        <span>Check signups</span>
                      </v-tooltip>
                    </v-row>
                    <v-row>
                      <v-tooltip location="left">
                        <template #activator="{ on }">
                          <v-btn
                            icon
                            v-on="on"
                            @click="$router.push('edit/'+event.id)"
                          >
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                        </template>
                        <span>Edit event</span>
                      </v-tooltip>
                    </v-row>
                    <v-row>
                      <v-tooltip location="left">
                        <template #activator="{ on: tooltip }">
                          <v-btn
                            icon
                            v-on="{ ...tooltip, ...dialog }"
                            @click="eventToDelete = event"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </template>
                        <span>Delete event</span>
                      </v-tooltip>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </template>
          </v-list-item>
          <v-divider
            v-if="i < events.length - 1"
            :key="i"
          />
        </div>
      </v-list>
    </template>


    <v-card>
      <v-card-title>
        <p class="text-h5">
          Are you sure you want to delete this event:
          {{ eventToDelete ? eventToDelete.title : 'NO EVENT????' }}
        </p>
      </v-card-title>
      <v-card-text>
        There will be no undo
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          variant="text"
          @click="eventToDelete=null"
        >
          No
        </v-btn>
        <v-btn
          color="red"
          variant="text"
          @click="deleteEvent"
        >
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EventManageList",
  props: ["events", "idToCommittee"],
  data: () => ({
    eventToDelete: null,
  }),
  methods: {
    deleteEvent() {
      this.$http.delete('events/' + this.eventToDelete.id, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(() => {
          this.events = this.events.filter(event => event.id !== this.eventToDelete.id)
          this.eventToDelete = null
        })
        .catch(e => this.$root.handleNetworkError(e))
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
