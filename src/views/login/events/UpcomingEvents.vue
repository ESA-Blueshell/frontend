<template>
  <v-main>
    <top-banner title="Upcoming Events"/>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <v-list two-line>
          <template v-for="(event,i) in events">
            <v-list-item v-bind:key="event.title+event.startTime">
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  {{ event.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ formatStartEndTime(event) }}
                </v-list-item-subtitle>
                {{
                  event.description ?
                      event.description.slice(0, 150) + (event.description.length > 150 ? '...' : '') :
                      'No description...'
                }}
              </v-list-item-content>

              <v-list-item-action-text class="ml-2 text-right" style="width: 90px">
                <template v-if="submittingId === event.id">
                  Submitting sign-up
                </template>
                <template v-else-if="eventIdToSignUpForm[event.id] !== undefined">
                  Signed up!
                </template>
                <template v-else-if="event.signUp">
                  Not signed up
                </template>
              </v-list-item-action-text>


              <v-list-item-action>

                <v-btn disabled icon v-if="!event.signUp">
                  <v-icon>mdi-checkbox-blank</v-icon>
                </v-btn>

                <v-tooltip left
                           v-else-if="eventIdToSignUpForm[event.id] !== undefined && !event.signUpForm">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on"
                           icon
                           :loading="submittingId === event.id"
                           @click="removeSignUp(event.id)">
                      <v-icon>mdi-checkbox-marked</v-icon>
                    </v-btn>
                  </template>
                  <span>Remove sign-up</span>
                </v-tooltip>

                <v-tooltip left
                           v-else-if="!event.signUpForm && eventIdToSignUpForm[event.id] === undefined">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on"
                           icon
                           :loading="submittingId === event.id"
                           @click="signUp(event.id)">
                      <v-icon>mdi-checkbox-blank</v-icon>
                    </v-btn>
                  </template>
                  <span>Sign Up</span>
                </v-tooltip>

                <template v-else-if="event.signUpForm">
                  <v-tooltip left v-if="eventIdToSignUpForm[event.id] !== undefined">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on"
                             icon
                             :loading="submittingId === event.id"
                             @click="removeSignUp(event.id)">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </template>
                    <span>Remove sign-up</span>
                  </v-tooltip>
                  <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on"
                             icon
                             @click="signingUpFor= (signingUpFor ? null : event.id)">
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
              <sign-up-form
                  v-if="signingUpFor === event.id"
                  :event-id="event.id"
                  :form="JSON.parse(event.signUpForm)"
                  :answers-prop="eventIdToSignUpForm[event.id] ? JSON.parse(eventIdToSignUpForm[event.id]) : defaultAnswers(event.signUpForm)"
                  v-on:submitting="submittingId=event.id"
                  v-on:close="signingUpFor=null;submittingId=false;refreshSignUp(event.id)"
                  class="mx-auto mb-2 form"
                  style=""/>
            </v-expand-transition>

            <v-divider v-if="i < events.length - 1" v-bind:key="i"/>
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
  }),
  methods: {
    signUp(eventId) {
      this.submittingId = eventId
      this.$http.post('events/signups/' + eventId, '', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
          .then(() => {
            this.submittingId = null
            this.$set(this.eventIdToSignUpForm, eventId, null)
          });
    },
    removeSignUp(eventId) {
      this.submittingId = eventId
      this.$http.delete('events/signups/' + eventId, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
          .then(() => {
            this.submittingId = null
            this.$delete(this.eventIdToSignUpForm, eventId)
          });

    },
    refreshSignUp(eventId) {
      this.$http.get('events/signups/' + eventId, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
          .then(response => {
            this.$set(this.eventIdToSignUpForm, response.data.event, response.data.options)
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
  },
  mounted() {
    this.$http.get('events/upcoming', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => this.events = response.data);

    this.$http.get('events/signups', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => response.data.forEach(signUp => this.eventIdToSignUpForm[signUp.event] = signUp.options));
  }
}
</script>

<style scoped>
.form {
  max-width: 750px;
  padding: 16px;
  border-width: 1px;
  border-color: var(--v-accent-base);
  border-radius: 8px;
  border-style: solid;
}
</style>
