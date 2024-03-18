<script setup>
import {ref} from "vue";
import {useStore} from "vuex";
import axios from "axios";

const store = useStore()
const answersForm = ref(null)
const guestForm = ref(null)
const emit = defineEmits(['submit'])
const props = defineProps({
  event: Object,
  answersString: String,
  showGuestForm: {
    type: Boolean,
    required: true,
  },
  buttonLoading: {
    type: Boolean,
    default: false,
  },
})
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

const answers = ref(
  props.answersString
    ? JSON.parse(props.answersString)
    : props.event.signUpForm
      ? Array.from(JSON.parse(props.event.signUpForm),
        question => question.type === 'open'
          ? ''
          : question.type === 'checkbox'
            ? []
            : null)
      : null)

const guestData = ref(store.getters.getGuestData ?? {
  name: '',
  discord: '',
  email: '',
})

const form = ref(props.event.signUpForm ? JSON.parse(props.event.signUpForm) : null)


async function validate() {
  const formValid = answersForm.value ? (await answersForm.value.validate()).valid : true;
  const guestFormValid = guestForm.value ? (await guestForm.value.validate()).valid : true;

  if (formValid && guestFormValid) {
    emit('submit', {answers: answers, guestData: guestData})
  }
}
</script>

<template>
  <div>
    <v-form
      v-if="props.showGuestForm"
      ref="guestForm"
      class="mb-4"
    >
      <v-alert
        text="It seems you are not logged in. You can still sign up for this event, but we'll need some extra info from you."
        type="info"
        class="mb-4"
        variant="outlined"
      />
      <v-text-field
        v-model="guestData.name"
        label="Name"
        :rules="[v => !!v || 'Name is required']"
      />
      <v-text-field
        v-model="guestData.discord"
        label="Discord username"
        :rules="[v => !!v || 'Discord username is required']"
      />
      <v-text-field
        v-model="guestData.email"
        label="Email"
        :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
        hint="We'll use this to send you a link you can use to edit your sign-up form later"
      />
    </v-form>

    <v-form
      v-if="answers !== null"
      ref="answersForm"
    >
      <div
        v-for="(question,i) in form"
        :key="i"
        class="mb-4"
      >
        <p :class="question.type === 'description' ? 'text-body-1' : 'text-h6 mb-0'">
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
          v-model="answers[i]"
          :label="option"
          :value="j"
          hide-details
        />
      </div>
    </v-form>

    <v-btn
      :block="true"
      :loading="buttonLoading"
      @click="validate"
    >
      {{ answersString ? 'Update' : 'Save' }} sign-up form
    </v-btn>
  </div>
</template>

<style>
.v-checkbox .v-selection-control {
  min-height: 40px !important;
}
</style>
