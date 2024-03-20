<template>
  <v-progress-circular
    v-if="events.length === 0"
    indeterminate
  />
  <v-expand-transition :disabled="$route.hash">
    <v-list v-if="events.length > 0">
      <div
        v-for="(event,i) in events"
        :id="'event#'+event.id"
        :key="event.id+'key'"
        class="list-item-buffer"
        style="scroll-margin-top: 64px;"
      >
        <event-list-item :event="event">
          <template #append>
            <v-container class="fill-height pa-0">
              <v-row style="margin-right: -10px">
                <v-col
                  v-if="event.signUp && $vuetify.display.smAndUp"
                  align-self="center"
                >
                  <v-row>
                    <p
                      class="ml-2 mb-0 text-right"
                      style="width: 100px"
                    >
                      <span v-if="submittingId === event.id">
                        Submitting...
                      </span>
                      <span v-else-if="eventIdToSignUpForm[event.id] !== undefined">
                        Signed up!
                      </span>
                      <span v-else-if="$store.getters.isLoggedIn && event.signUp">
                        Not signed up
                      </span>
                    </p>
                  </v-row>
                </v-col>

                <v-col class="pa-0">
                  <template v-if="event.signUp">
                    <v-row
                      v-if="$store.getters.isLoggedIn && !event.signUpForm && eventIdToSignUpForm[event.id] !== undefined"
                    >
                      <v-tooltip
                        text="Cancel sign-up"
                        location="left"
                      >
                        <template #activator="{ props }">
                          <v-btn
                            :loading="submittingId === event.id"
                            icon="mdi-checkbox-marked"
                            variant="plain"
                            :size="$vuetify.display.xs ? 'default' : 'default'"
                            :disabled="event.membersOnly && !$store.getters.isMember"
                            v-bind="props"
                            @click="removeSignUp(event.id)"
                          />
                        </template>
                      </v-tooltip>
                    </v-row>
                    <v-row
                      v-else-if="$store.getters.isLoggedIn && !event.signUpForm && eventIdToSignUpForm[event.id] === undefined"
                    >
                      <v-tooltip
                        text="Sign Up"
                        location="left"
                      >
                        <template #activator="{ props }">
                          <v-btn
                            :loading="submittingId === event.id"
                            icon="mdi-checkbox-blank"
                            variant="plain"
                            :size="$vuetify.display.xs ? 'default' : 'default'"
                            :disabled="event.membersOnly && !$store.getters.isMember"
                            v-bind="props"
                            @click="signUp(event.id)"
                          />
                        </template>
                      </v-tooltip>
                    </v-row>
                    <template v-else-if="event.signUpForm && ($store.getters.isLoggedIn || !event.membersOnly)">
                      <v-row>
                        <v-tooltip
                          v-if="$store.getters.isLoggedIn && eventIdToSignUpForm[event.id] !== undefined"
                          location="left"
                          text="Cancel sign-up"
                        >
                          <template #activator="{ props }">
                            <v-btn
                              :loading="submittingId === event.id"
                              icon="mdi-close"
                              variant="plain"
                              :size="$vuetify.display.xs ? 'default' : 'default'"
                              :disabled="event.membersOnly && !$store.getters.isMember"
                              v-bind="props"
                              @click="removeSignUp(event.id)"
                            />
                          </template>
                        </v-tooltip>
                      </v-row>
                      <v-row>
                        <v-tooltip
                          location="left"
                          :text="eventIdToSignUpForm[event.id] !== undefined ?
                            'Edit sign-up form' :
                            signingUpFor !== event.id ?
                              'Fill in sign-up form' :
                              'Cancel filling in sign-up form'"
                        >
                          <template #activator="{ props }">
                            <v-btn
                              :loading="submittingId === event.id"
                              icon="mdi-list-status"
                              variant="plain"
                              :size="$vuetify.display.xs ? 'default' : 'default'"
                              :disabled="event.membersOnly && !$store.getters.isMember"
                              v-bind="props"
                              @click="toggleSignUpForm(event.id)"
                            />
                          </template>
                        </v-tooltip>
                      </v-row>
                    </template>
                  </template>
                  <v-row>
                    <v-tooltip
                      text="Find location"
                      location="left"
                    >
                      <template #activator="{ props }">
                        <v-btn
                          icon="mdi-google-maps"
                          v-bind="props"
                          variant="plain"
                          @click="findLocation(event)"
                        />
                      </template>
                    </v-tooltip>
                  </v-row>
                  <v-row>
                    <v-tooltip
                      text="Add to your calendar"
                      location="left"
                    >
                      <template #activator="{ props }">
                        <v-btn
                          icon="mdi-calendar"
                          v-bind="props"
                          variant="plain"
                          @click="downloadIcs(event)"
                        />
                      </template>
                    </v-tooltip>
                  </v-row>
                  <v-row>
                    <v-tooltip
                      text="Copy share link"
                      location="left"
                    >
                      <template #activator="{ props }">
                        <v-btn
                          icon="mdi-share-variant"
                          v-bind="props"
                          variant="plain"
                          @click="copyShareLink(event)"
                        />
                      </template>
                    </v-tooltip>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </event-list-item>

        <v-expand-transition :key="event.id">
          <div
            v-if="signingUpFor === event.id"
            class="form-border mx-auto rounded-b"
          >
            <sign-up-form
              :answers-string="eventIdToSignUpForm[event.id]"
              :event="event"
              class="form mx-auto"
              :show-guest-form="!$store.getters.isLoggedIn"
              @submit="({answers, guestData}) => submitSignUpForm(event.id, {answers, guestData})"
            />
          </div>
        </v-expand-transition>

        <v-divider
          v-if="i < events.length - 1 && signingUpFor !== event.id"
          :key="i"
        />
      </div>
    </v-list>
  </v-expand-transition>
</template>

<script>
import SignUpForm from "@/components/sign-up-form";
import EventListItem from "@/components/EventListItem.vue";
import axios from "axios";
import {$handleNetworkError} from "@/plugins/handleNetworkError";
import {$goto} from "@/plugins/goto";
import {createEvent} from 'ics'

export default {
  name: "UpcomingEventsList",
  components: {EventListItem, SignUpForm},
  data: () => ({
    events: [],
    eventIdToSignUpForm: {},
    signingUpFor: null,
    submittingId: null,
    expandedEvent: null,
  }),
  mounted() {
    this.$http.get('events/upcoming')
      .then(response => {
        this.events = response.data

        // Scroll to event with the given ID if a hash is present in the URL
        if (this.$route.hash) {
          // Use a timeout to ensure the element is already rendered
          // Also, the expand animation is disabled when a hash is present
          setTimeout(() => {
            const selectedElement = document.getElementById('event' + this.$route.hash);
            selectedElement.scrollIntoView({behavior: 'smooth', block: 'start'})
          }, 50)
        }
      })
      .catch(e => $handleNetworkError(e))

    if (this.$store.getters.isLoggedIn) {
      this.$http.get('events/signups', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => response.data.forEach(signUp => this.eventIdToSignUpForm[signUp.event] = signUp.formAnswers))
        .catch(e => $handleNetworkError(e));
    }
  },
  methods: {
    async handleSubmit(eventId, submitFunction) {
      this.submittingId = eventId

      try {
        await submitFunction()
      } catch (e) {
        $handleNetworkError(e)
      } finally {
        this.submittingId = null
        this.signingUpFor = null
      }
    },
    async signUp(eventId) {
      await this.handleSubmit(eventId, async () => {
        await this.$http.post('events/signups/' + eventId, '', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})

        this.eventIdToSignUpForm[eventId] = null
      })
    },
    async removeSignUp(eventId) {
      await this.handleSubmit(eventId, async () => {
        await this.$http.delete('events/signups/' + eventId, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})

        delete this.eventIdToSignUpForm[eventId]
      })
    },
    async submitSignUpForm(eventId, {answers, guestData}) {
      await this.handleSubmit(eventId, async () => {
        const selectedElement = document.getElementById('event#' + eventId);
        selectedElement.scrollIntoView({behavior: 'smooth', block: 'start'})

        if (this.$store.getters.isLoggedIn) {
          const response = await axios.post(`events/signups/${eventId}`, JSON.stringify(answers.value),
            {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`, 'Content-Type': 'text/plain'}})

          this.eventIdToSignUpForm[eventId] = response.data.formAnswers;
        } else {

          this.$store.commit('saveGuestData', guestData.value)

          guestData.value['answers'] = answers.value ? JSON.stringify(answers.value) : null

          await axios.post(`events/signups/${eventId}/guest`, JSON.stringify(guestData.value),
            {headers: {'Content-Type': 'application/json'}})

          this.eventIdToSignUpForm[eventId] = null;
        }
      })
    },

    toggleSignUpForm(eventId) {
      if (this.signingUpFor === eventId) {
        this.signingUpFor = null
      } else {
        document.getElementById('event#' + eventId).scrollIntoView({behavior: 'smooth', block: 'start'})
        this.signingUpFor = eventId
      }
    },

    findLocation(event) {
      if (event.location.includes("iscord")) {
        $goto(encodeURI('https://discord.gg/23YMFQy'));
      } else {
        $goto(encodeURI('https://www.google.com/maps/search/?api=1&query=' + event.location));
      }
    },
    downloadIcs(event) {
      createEvent({
        title: event.title,
        description: event.details,
        start: Date.parse(event.startTime) - new Date().getTimezoneOffset() * 60 * 1000,
        end: Date.parse(event.endTime) - new Date().getTimezoneOffset() * 60 * 1000,
        location: event.location,
      }, (error, value) => {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(value));
        element.setAttribute('download', event.title + '.ics');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      })
    },
    copyShareLink(event) {
      const url = window.location.origin + window.location.pathname + '#' + event.id
      navigator.clipboard.writeText(url)

      this.$store.commit('setStatusSnackbarMessage', `Link for ${event.title} copied to clipboard`)
    }
  }
}
</script>

<style>
.form-border {
  border-width: 1px;
  border-color: rgb(var(--v-theme-accent));
  border-style: solid;
}

.form {
  padding: 16px;
}

</style>
