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
          <v-list-item
            :style="{ 'background-image': !event.banner ? '' :
              $vuetify.theme.global.current.dark ? `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${event.banner})` : `linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url(${event.banner})`}"
            style="background-size: cover;background-position: center;"
          >
            <v-list-item-title class="text-h6">
              {{ event.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ $formatEventTime(event) }}
            </v-list-item-subtitle>
            <span
              v-html="event.description ?
                $markdownToHtml(event.description.slice(0, 150) + (event.description.length > 150 ? '...' : '')) :
                'No description...'"
            />

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
        <v-spacer />
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
import {$markdownToHtml} from "@/plugins/markdownToHtml";
import {$formatEventTime} from "../plugins/formatEventTime";

export default {
  name: "EventManageList",
  props: ["events", "idToCommittee"],
  data: () => ({
    eventToDelete: null,
  }),
  methods: {
    $formatEventTime,
    $markdownToHtml,
    deleteEvent() {
      this.$http.delete('events/' + this.eventToDelete.id, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(() => {
          this.events = this.events.filter(event => event.id !== this.eventToDelete.id)
          this.eventToDelete = null
        })
        .catch(e => this.$root.handleNetworkError(e))
    },
  }
}
</script>

<style scoped>

</style>
