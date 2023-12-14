<template>
  <v-main>
    <top-banner title="Upcoming Events" />
    <div class="mx-3">
      <div
        class="mx-auto my-10"
        style="max-width: 800px"
      >
        <v-list lines="two">
          <div
            v-for="(event,i) in events"
            :key="event.title+event.startTime+'key'"
          >
            <v-list-item
              :key="event.title+event.startTime"
              :style="{ 'background-image': !event.banner ? '' : $vuetify.theme.global.current.dark ? `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${event.banner})` : `linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${event.banner})`}"
              style="background-size: cover;background-position: center;backdrop-filter: blur(2px);"
            >
              <div
                :style="{ 'cursor': event.description && event.description.length > 150 ? 'pointer' : 'auto'}"
                @click="expandEvent(event, i)"
              >
                <v-list-item-title class="text-h6">
                  {{ ((!$store.getters.isMember && event.membersOnly) ? 'Members-only event: ' : '') + event.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ formatStartEndTime(event) }}
                </v-list-item-subtitle>

                <v-expand-transition>
                  <div
                    v-if="expandedEvent !== i || !event.description"
                    v-html="event.description ?
                      $root.markdownToHtml(event.description.slice(0, 150) + (event.description.length > 150 ? '...' : '')) :
                      'No description...'"
                  />
                </v-expand-transition>
                <v-expand-transition>
                  <div
                    v-if="expandedEvent === i && event.description"
                    v-html="$root.markdownToHtml(event.description)"
                  />
                </v-expand-transition>
              </div>

              <template #append>
                <p
                  class="ml-2 text-right"
                  style="width: 100px"
                >
                  <template v-if="submittingId === event.id">
                    Submitting sign-up
                  </template>
                  <template v-else-if="eventIdToSignUpForm[event.id] !== undefined">
                    Signed up!
                  </template>
                  <template v-else-if="event.signUp && event.membersOnly && !$store.getters.isMember">
                    Members-only event
                  </template>
                  <template v-else-if="event.signUp">
                    Not signed up
                  </template>
                </p>


                <v-btn
                  v-if="!event.signUp"
                  disabled
                  icon
                >
                  <v-icon>mdi-checkbox-blank</v-icon>
                </v-btn>

                <v-tooltip
                  v-else-if="eventIdToSignUpForm[event.id] !== undefined && !event.signUpForm"
                  location="left"
                >
                  <template #activator="{ props }">
                    <v-btn
                      :loading="submittingId === event.id"
                      icon
                      :disabled="event.membersOnly && !$store.getters.isMember"
                      v-bind="props"
                      @click="removeSignUp(event.id)"
                    >
                      <v-icon>mdi-checkbox-marked</v-icon>
                    </v-btn>
                  </template>
                  <span>Remove sign-up</span>
                </v-tooltip>

                <v-tooltip
                  v-else-if="!event.signUpForm && eventIdToSignUpForm[event.id] === undefined"
                  location="left"
                >
                  <template #activator="{ props }">
                    <v-btn
                      :loading="submittingId === event.id"
                      icon
                      :disabled="event.membersOnly && !$store.getters.isMember"
                      v-bind="props"
                      @click="signUp(event.id)"
                    >
                      <v-icon>mdi-checkbox-blank</v-icon>
                    </v-btn>
                  </template>
                  <span>Sign Up</span>
                </v-tooltip>

                <template v-else-if="event.signUpForm">
                  <v-tooltip
                    v-if="eventIdToSignUpForm[event.id] !== undefined"
                    location="left"
                  >
                    <template #activator="{ props }">
                      <v-btn
                        :loading="submittingId === event.id"
                        icon
                        :disabled="event.membersOnly && !$store.getters.isMember"
                        v-bind="props"
                        @click="removeSignUp(event.id)"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </template>
                    <span>Remove sign-up</span>
                  </v-tooltip>
                  <v-tooltip location="left">
                    <template #activator="{ props }">
                      <v-btn
                        icon
                        :disabled="event.membersOnly && !$store.getters.isMember"
                        v-bind="props"
                        @click="signingUpFor= (signingUpFor ? null : event.id)"
                      >
                        <v-icon>mdi-list-status</v-icon>
                      </v-btn>
                    </template>
                    <span
                      v-if="eventIdToSignUpForm[event.id] !== undefined"
                    >Edit sign-up form</span>
                    <span v-else-if="signingUpFor !== event.id">Fill in sign-up form</span>
                    <span v-else>Cancel filling in sign-up form</span>
                  </v-tooltip>
                </template>
              </template>
            </v-list-item>

            <v-expand-transition :key="event.id">
              <div
                v-if="signingUpFor === event.id"
                class="form-border mx-auto rounded-b"
              >
                <sign-up-form
                  :answers="eventIdToSignUpForm[event.id] ? JSON.parse(eventIdToSignUpForm[event.id]) : defaultAnswers(event.signUpForm)"
                  :event-id="event.id"
                  :form="JSON.parse(event.signUpForm)"
                  class="form mx-auto"
                  @close="signingUpFor=null;submittingId=null;refreshSignUp(event.id)"
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
      </div>
    </div>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";
import SignUpForm from "@/components/sign-up-form";

export default {
  name: "UpcomingEvents",
  components: {SignUpForm, TopBanner},
  data: () => ({
    events: [],
    eventIdToSignUpForm: {},
    signingUpFor: null,
    submittingId: null,
    expandedEvent: null,
  }),
  mounted() {
    this.$http.get('events/upcoming', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
      .then(response => this.events = response.data)
      .catch(e => this.$root.handleNetworkError(e))

    this.$http.get('events/signups', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
      .then(response => response.data.forEach(signUp => this.eventIdToSignUpForm[signUp.event] = signUp.formAnswers))
      .catch(e => this.$root.handleNetworkError(e))
  },
  methods: {
    signUp(eventId) {
      this.submittingId = eventId
      this.$http.post('events/signups/' + eventId, '', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(() => {
          this.submittingId = null
          this.signingUpFor = null
          this.$set(this.eventIdToSignUpForm, eventId, null)
        })
        .catch(e => this.$root.handleNetworkError(e))
    },
    removeSignUp(eventId) {
      this.submittingId = eventId
      this.$http.delete('events/signups/' + eventId, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(() => {
          this.submittingId = null
          this.signingUpFor = null
          this.$delete(this.eventIdToSignUpForm, eventId)
        })
        .catch(e => this.$root.handleNetworkError(e))

    },
    refreshSignUp(eventId) {
      this.$http.get('events/signups/' + eventId, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => {
          this.$set(this.eventIdToSignUpForm, response.data.event, response.data.formAnswers)
        })
        .catch(e => this.$root.handleNetworkError(e))
    },
    defaultAnswers(form) {
      return Array.from(JSON.parse(form), question => question.type === 'open' ? '' : (question.type === 'checkbox' ? [] : null))
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
