<template>
  <!--
    This is the form an attendee fills in when an event has a sign-up form.

    Vuetify form documentation: https://vuetifyjs.com/en/components/forms/

    When the submit button is clicked, the component will emit the 'submitting' event,
    And when the request to the backend for adding the sign-up has succeeded, the 'close' event will be submitted, indicating that the form can be closed

    Both the form and answers are passed in as props. I tried to have answers have a default value,
    but after a lot of trial and error I couldn't get it to work smoothly so if there are no previous answers to this form,
    they should be made outside of this component (this is done now in UpcomingEvents.vue)
  -->
  <v-form
    ref="form"
    v-model="valid"
  >
    <div
      v-for="(question,i) in form"
      :key="i"
      class="mt-2"
    >
      <p :class="question.type === 'description' ? 'text-body-1 pt-4' : 'text-h6 mb-0'">
        {{ question.prompt }}
      </p>

      <v-text-field
        v-if="question.type === 'open'"
        v-model="answers[i]"
        :rules="[v => !!v || 'An answer is required']"
        class="pt-0"
        hide-details="auto"
      />

      <v-radio-group
        v-else-if="question.type === 'radio'"
        v-model="answers[i]"
        :rules="[v => v != null || 'An answer is required']"
        class="mt-0"
        hide-details="auto"
      >
        <v-radio
          v-for="(option,j) in question.options"
          :key="j"
          :label="option"
          :value="j"
        />
      </v-radio-group>

      <v-checkbox
        v-for="(option,j) in question.options"
        v-else-if="question.type === 'checkbox'"
        :key="j"
        v-model="answersData[i]"
        :label="option"
        :value="j"
        class="mt-0 mb-2"
        hide-details
      />
    </div>

    <v-btn
      block
      class="mt-4"
      @click="submit"
    >
      Save sign-up form
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "SignUpForm",
  props: ['eventId', 'form', 'answers'],
  /*
    eventId is the id of the event that form will be submitted for.

    form is the event's sign-up form as an Object and is structured as follows:
    [
      {
        prompt: 'question to be asked',
        type: 'type of question',
        options: [
          'the options the user can select',
          'this is only done for radio and checkbox questions',
        ],
      }, etc.
    ]
    The question's type will be either 'open' for open questions,
    'radio' for a multiple choice question (named after the radio buttons it uses),
    or 'checkbox' for a question with checkboxes.

    Answers should be an Array, in this prop the answers to the form are stored.
    Each question will have an entry in answers. The entry should be:
    - a string for 'open' questions
    - a Number from 0 to i-1 for i options (null if no value is selected)
    - an array with the selected checkboxes. The array can contain any Number from 0 to i-1 for i options for each of the selected option
   */
  data: () => ({
    valid: false,
    answersData: [],
  }),
  mounted() {
    // this is the illest thing i've ever done. Vue be kinda cringe with their checkboxes
    // So if the answers are not stored in data, the checkboxes break. I have no idea why, I'm guessing it's vuetify being cringe.
    // It's probably possible to not have this line by writing our own checkboxes, but i cba so I'm leaving it like this for now.
    this.answersData = this.answers;
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit('submitting')

        this.$http.post(`events/signups/${this.eventId}`,
            JSON.stringify(this.answersData),
            {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`, 'Content-Type': 'text/plain'}}
        )
            .then(() => this.$emit('close'))
            .catch(e => this.$root.handleNetworkError(e))
      }
    }
  }
}
</script>
