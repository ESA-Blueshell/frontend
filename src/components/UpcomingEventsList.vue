<template>
  <v-progress-circular
    v-if="events.length === 0"
    indeterminate
  />
  <v-expand-transition>
    <v-list v-if="events.length > 0">
      <div
        v-for="(event,i) in events"
        :key="event.title+event.startTime+'key'"
        class="list-item-buffer"
      >
        <v-list-item
          :key="event.title+event.startTime"
          :style="{ 'background-image': !event.banner ? '' : $vuetify.theme.global.current.dark ? `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${event.banner})` : `linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${event.banner})`}"
          class="py-4"
          style="background-size: cover;background-position: center;"
        >
          <div
            :style="{ 'cursor': event.description && event.description.length > 150 ? 'pointer' : 'auto'}"
            @click="expandEvent(event, i)"
          >
            <v-list-item-title class="text-h4">
              {{ event.title }}
            </v-list-item-title>
            <v-list-item-subtitle class="mb-2">
              {{ $formatEventTime(event) }}
            </v-list-item-subtitle>

            <v-expand-transition>
              <div
                v-if="expandedEvent !== i || !event.description"
                style="height: 87px"
                v-html="event.description ? $markdownToHtml(event.description) : 'No description...'"
              />
            </v-expand-transition>
            <v-expand-transition>
              <div
                v-if="expandedEvent === i && event.description"
                v-html="$markdownToHtml(event.description)"
              />
            </v-expand-transition>
          </div>

          <template
            v-if="event.signUp"
            #append
          >
            <v-container class="fill-height">
              <v-row>
                <v-col align-self="center">
                  <v-row v-if="$vuetify.display.smAndUp">
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

                <v-col>
                  <v-row v-if="$store.getters.isLoggedIn && !event.signUpForm && eventIdToSignUpForm[event.id] !== undefined">
                    <v-tooltip
                      text="Remove sign-up"
                      location="left"
                    >
                      <template #activator="{ props }">
                        <v-btn
                          :loading="submittingId === event.id"
                          icon="mdi-checkbox-marked"
                          variant="plain"
                          :disabled="event.membersOnly && !$store.getters.isMember"
                          v-bind="props"
                          @click="removeSignUp(event.id)"
                        />
                      </template>
                    </v-tooltip>
                  </v-row>
                  <v-row
                    v-else-if="$store.getters.isLoggedIn && !event.signUpForm && eventIdToSignUpForm[event.id] === undefined">
                    <v-tooltip
                      text="Sign Up"
                      location="left"
                    >
                      <template #activator="{ props }">
                        <v-btn
                          :loading="submittingId === event.id"
                          icon="mdi-checkbox-blank"
                          variant="plain"
                          :disabled="event.membersOnly && !$store.getters.isMember"
                          v-bind="props"
                          @click="signUp(event.id)"
                        />
                      </template>
                    </v-tooltip>
                  </v-row>
                  <template v-else-if="event.signUpForm || (!event.membersOnly && !$store.getters.isLoggedIn)">
                    <v-row>
                      <v-tooltip
                        v-if="$store.getters.isLoggedIn && eventIdToSignUpForm[event.id] !== undefined"
                        location="left"
                        text="Remove sign-up"
                      >
                        <template #activator="{ props }">
                          <v-btn
                            :loading="submittingId === event.id"
                            icon="mdi-close"
                            variant="plain"
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
                            icon="mdi-list-status"
                            variant="plain"
                            :disabled="event.membersOnly && !$store.getters.isMember"
                            v-bind="props"
                            @click="signingUpFor = (signingUpFor ? null : event.id)"
                          />
                        </template>
                      </v-tooltip>
                    </v-row>
                  </template>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-list-item>

        <v-expand-transition :key="event.id">
          <div
            v-if="signingUpFor === event.id"
            class="form-border mx-auto rounded-b"
          >
            <sign-up-form
              :answers-string="eventIdToSignUpForm[event.id]"
              :event="event"
              :form="JSON.parse(event.signUpForm)"
              class="form mx-auto"
              @submitted="(response) => {eventIdToSignUpForm[response.data.event] = response.data.formAnswers; closeSignUpForm()}"
              @submitting="submittingId=event.id"
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
import {$markdownToHtml} from "@/plugins/markdownToHtml";
import {$formatEventTime} from "@/plugins/formatEventTime";

export default {
  name: "UpcomingEventsList",
  components: {SignUpForm},
  data: () => ({
    events: [],
    eventIdToSignUpForm: {},
    signingUpFor: null,
    submittingId: null,
    expandedEvent: null,
  }),
  mounted() {
    this.$http.get('events/upcoming')
      .then(response => this.events = response.data)
      .catch(e => this.$root.handleNetworkError(e))

    if (this.$store.getters.isLoggedIn) {
      this.$http.get('events/signups', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => response.data.forEach(signUp => this.eventIdToSignUpForm[signUp.event] = signUp.formAnswers))
        .catch(e => this.$root.handleNetworkError(e));
    }
  },
  methods: {
    $formatEventTime,
    $markdownToHtml,
    signUp(eventId) {
      this.submittingId = eventId
      this.$http.post('events/signups/' + eventId, '', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(() => {
          this.closeSignUpForm()
          this.eventIdToSignUpForm[eventId] = null
        })
        .catch(e => this.$root.handleNetworkError(e))
    },
    removeSignUp(eventId) {
      this.submittingId = eventId
      this.$http.delete('events/signups/' + eventId, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(() => {
          delete this.eventIdToSignUpForm[eventId]
          this.closeSignUpForm()
        })
        .catch(e => this.$root.handleNetworkError(e))
    },
    closeSignUpForm() {
      this.submittingId = null
      this.signingUpFor = null
    },
    expandEvent(event, i) {
      if (event.description && event.description.length > 150 && !getSelection().toString()) {
        this.expandedEvent = this.expandedEvent !== i ? i : null
      }
    },
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
