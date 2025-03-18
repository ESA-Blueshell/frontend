<template>
  <v-dialog
    :model-value="eventToDelete"
    max-width="400"
  >
    <template #activator="{ props: dialog }">
      <v-list>
        <div
          v-for="(event,i) in events"
          :key="event.title+event.startTime"
        >
          <event-list-item :event="event">
            <template #append>
              <p
                v-if="$vuetify.display.smAndUp"
                class="ml-4"
              >
                {{ idToCommittee[event.committee] }}
              </p>

              <div
                style="display: grid"
                class="mx-4"
              >
                <v-tooltip
                  location="left"
                  text="Check signups"
                >
                  <template #activator="{ props }">
                    <v-btn
                      icon="mdi-list-status"
                      variant="plain"
                      :disabled="!event.signUp"
                      v-bind="props"
                      @click="$router.push('signups/'+event.id)"
                    />
                  </template>
                </v-tooltip>
                <v-tooltip
                  location="left"
                  text="Edit event"
                >
                  <template #activator="{ props }">
                    <v-btn
                      icon="mdi-pencil"
                      variant="plain"
                      v-bind="props"
                      @click="$router.push('edit/'+event.id)"
                    />
                  </template>
                </v-tooltip>
                <v-tooltip
                  location="left"
                  text="Delete event"
                >
                  <template #activator="{ props: tooltip }">
                    <v-btn
                      icon="mdi-delete"
                      variant="plain"
                      v-bind="{ ...tooltip, ...dialog }"
                      @click="eventToDelete = event"
                    />
                  </template>
                </v-tooltip>
              </div>
            </template>
          </event-list-item>

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
          color="error"
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
import EventListItem from "@/components/EventListItem.vue";
import {$handleNetworkError} from "@/plugins/handleNetworkError";

export default {
  name: "EventManageList",
  components: {EventListItem},
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
        .catch(e => $handleNetworkError(e))
    },
  }
}
</script>
