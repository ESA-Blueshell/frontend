<template>
  <v-main>
    <top-banner title="Event Manager"/>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">

        <v-btn block :disabled="noCommittees" to="create">Create new event</v-btn>

        <p class="mt-8 text-h2 text-center">Upcoming Events</p>

        <v-dialog v-bind:value="eventToDelete" max-width="400">
          <template v-slot:activator="{ on: dialog, attrs }">
            <v-list two-line>
              <template v-for="(event,i) in events">
                <v-list-item v-bind:key="event.title+event.startTime">
                  <v-list-item-content>
                    <v-list-item-title class="text-h6">
                      {{ event.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ new Date(Date.parse(event.startTime)).toLocaleDateString('en-NL') }}
                    </v-list-item-subtitle>
                    {{ event.description ? event.description.slice(0, 100) : 'No description...' }}
                  </v-list-item-content>

                  <!--              <v-list-item-action-text v-if="Object.keys(idToCommittee).length > 1">-->
                  <v-list-item-action-text>
                    {{ idToCommittee[event.committee] }}
                  </v-list-item-action-text>
                  <v-list-item-action>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on"
                               icon
                               @click="$router.push('edit/'+event.id)">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>Edit event</span>
                    </v-tooltip>

                    <v-tooltip top>
                      <template v-slot:activator="{ on: tooltip }">
                        <v-btn v-bind="attrs" v-on="{ ...tooltip, ...dialog }"
                               icon @click="eventToDelete = event">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </template>
                      <span>Edit event</span>
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
              <span
                  class="text-h5">Are you sure you want to delete this event: {{
                  eventToDelete ? eventToDelete.title : 'NO EVENT????'
                }}</span>
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


        <v-img :src="require('../../../assets/noCommittees.jpg')"
               v-if="noCommittees"/>

      </div>
    </div>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";

export default {
  name: "EventManager",
  components: {TopBanner},
  data: () => ({
    events: [],
    idToCommittee: {},
    eventToDelete: null,
    noCommittees: false,
  }),
  mounted() {
    // Get upcoming events
    this.$http.get('events/upcoming?editable=true', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => {
          this.events = response.data
          this.events.forEach(event => event.deleteDialog = false)
        })

    // Get the user's committees
    this.$http.get('committees', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => {
          response.data.forEach(committee => {
            this.idToCommittee[committee.id] = committee.name
          })
          if (response.data.length === 0) {
            this.noCommittees = true
          }
        })
  },
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
  }
}
</script>

<style scoped>

</style>
