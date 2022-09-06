<template>
  <v-main>
    <top-banner title="Upcoming Events"/>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <v-list two-line>
          <template v-for="(event,i) in events">
            <v-list-item v-bind:key="event.title+event.startTime"
                         v-bind:style="{ 'background-image': !event.banner ? '' :  $vuetify.theme.dark ? `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${event.banner})` : `linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url(${event.banner})`}"
                         style="background-size: cover;background-position: center;backdrop-filter: blur(2px);">
              <v-list-item-content @click="expandEvent(event, i)"
                                   v-bind:style="{ 'cursor': event.description && event.description.length > 150 ? 'pointer' : 'auto'}">
                <v-list-item-title class="text-h6">
                  {{ ((!$store.getters.isMember && event.membersOnly) ? 'Members-only event: ' : '') + event.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ formatStartEndTime(event) }}
                </v-list-item-subtitle>

                <v-expand-transition>
                  <div v-if="expandedEvent !== i || !event.description">
                    {{
                      event.description ?
                          event.description.slice(0, 150) + (event.description.length > 150 ? '...' : '') :
                          'No description...'
                    }}
                  </div>
                </v-expand-transition>
                <v-expand-transition>
                  <div v-if="expandedEvent === i && event.description">
                    {{ event.description }}
                  </div>
                </v-expand-transition>
              </v-list-item-content>

              <v-list-item-action-text class="ml-2 text-right" style="width: 100px">
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
              </v-list-item-action-text>


              <v-list-item-action>

                <v-btn v-if="!event.signUp" disabled icon>
                  <v-icon>mdi-checkbox-blank</v-icon>
                </v-btn>

                <v-tooltip
                    v-else-if="eventIdToSignUpForm[event.id] !== undefined && !event.signUpForm"
                    left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn :loading="submittingId === event.id" icon
                           @click="removeSignUp(event.id)"
                           :disabled="event.membersOnly && !$store.getters.isMember"
                           v-bind="attrs" v-on="on">
                      <v-icon>mdi-checkbox-marked</v-icon>
                    </v-btn>
                  </template>
                  <span>Remove sign-up</span>
                </v-tooltip>

                <v-tooltip
                    v-else-if="!event.signUpForm && eventIdToSignUpForm[event.id] === undefined"
                    left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn :loading="submittingId === event.id" icon
                           :disabled="event.membersOnly && !$store.getters.isMember"
                           @click="signUp(event.id)"
                           v-bind="attrs" v-on="on">
                      <v-icon>mdi-checkbox-blank</v-icon>
                    </v-btn>
                  </template>
                  <span>Sign Up</span>
                </v-tooltip>

                <template v-else-if="event.signUpForm">
                  <v-tooltip v-if="eventIdToSignUpForm[event.id] !== undefined" left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn :loading="submittingId === event.id" icon
                             @click="removeSignUp(event.id)"
                             :disabled="event.membersOnly && !$store.getters.isMember"
                             v-bind="attrs" v-on="on">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </template>
                    <span>Remove sign-up</span>
                  </v-tooltip>
                  <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon
                             @click="signingUpFor= (signingUpFor ? null : event.id)"
                             :disabled="event.membersOnly && !$store.getters.isMember"
                             v-bind="attrs" v-on="on">
                        <v-icon>mdi-list-status</v-icon>
                      </v-btn>
                    </template>
                    <span
                        v-if="eventIdToSignUpForm[event.id] !== undefined">Edit sign-up form</span>
                    <span v-else-if="signingUpFor !== event.id">Fill in sign-up form</span>
                    <span v-else>Cancel filling in sign-up form</span>
                  </v-tooltip>
                </template>
              </v-list-item-action>
            </v-list-item>

            <v-expand-transition v-bind:key="event.id">
              <div v-if="signingUpFor === event.id" class="form-border mx-auto rounded-b-xl">
                <sign-up-form
                    :answers="eventIdToSignUpForm[event.id] ? JSON.parse(eventIdToSignUpForm[event.id]) : defaultAnswers(event.signUpForm)"
                    :event-id="event.id"
                    :form="JSON.parse(event.signUpForm)"
                    class="form mx-auto"
                    v-on:close="signingUpFor=null;submittingId=null;refreshSignUp(event.id)"
                    v-on:submitting="submittingId=event.id"
                />

              </div>
            </v-expand-transition>

            <v-divider v-if="i < events.length - 1 && signingUpFor !== event.id" v-bind:key="i"/>
          </template>
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
  methods: {
    signUp(eventId) {
      this.submittingId = eventId
      this.$http.post('events/signups/' + eventId, '', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
          .then(() => {
            this.submittingId = null
            this.signingUpFor = null
            this.$set(this.eventIdToSignUpForm, eventId, null)
          });
    },
    removeSignUp(eventId) {
      this.submittingId = eventId
      this.$http.delete('events/signups/' + eventId, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
          .then(() => {
            this.submittingId = null
            this.signingUpFor = null
            this.$delete(this.eventIdToSignUpForm, eventId)
          });

    },
    refreshSignUp(eventId) {
      this.$http.get('events/signups/' + eventId, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
          .then(response => {
            this.$set(this.eventIdToSignUpForm, response.data.event, response.data.formAnswers)
          })
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
  },
  mounted() {
    this.$http.get('events/upcoming', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => this.events = response.data);

    this.$http.get('events/signups', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => response.data.forEach(signUp => this.eventIdToSignUpForm[signUp.event] = signUp.formAnswers));
  }
}
</script>

<style scoped>
.form-border {
  border-width: 1px;
  border-color: var(--v-accent-base);
  border-style: solid;
}

.form {
  padding: 16px;
}

</style>
