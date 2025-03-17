<script setup>
import {$handleNetworkError} from "@/plugins/handleNetworkError";
import {computed, ref} from "vue";
import axios from "axios";
import {useStore} from "vuex";
import SignUpFormEditor from "@/components/sign-up-form-editor.vue";

const props = defineProps({
  initialEvent: {
    type: Object,
  },
  hasPromo: {
    type: Boolean,
    default: () => false
  }
})
const emits = defineEmits(['submit', 'title'])
const store = useStore()

const eventForm = ref(null)
const signUpForm = ref(null)

const event = ref(props.initialEvent !== undefined
  ? JSON.parse(JSON.stringify(props.initialEvent))
  : {
    title: '',
    location: '',
    description: '',

    memberPrice: '0',
    publicPrice: '0',

    membersOnly: false,
    visible: false,
    signUp: false,

    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',

    committeeId: '',
    banner: null,

    signUpForm: null,

    enableSignUpForm: false,
    endDateSame: true,
  })


async function submit() {
  // If endDateSame is true, copy the startDate into endDate
  if (event.value.endDateSame) {
    event.value.endDate = event.value.startDate;
  }

  // Process the image: check if a file is provided and get its URL
  if (event.value.image && event.value.image.size > 0) {
    event.value.image = URL.createObjectURL(event.value.image);
  } else {
    event.value.image = null;
  }

  // Validate the form asynchronously, similar to the membership form
  const {valid} = await eventForm.value.validate();
  if (!valid) {
    return;
  }

  submitting.value = true;
  emits('submit', event.value);
}


// Save some data to know what changed to give the user a warning
const wasPublic = ref(event.value.visible)
const hadSignUp = ref(event.value.signUp)
const oldEnableSignUpForm = ref(event.value.enableSignUpForm)

const valid = ref(true)
const submitting = ref(false)

// Get user's committees
const committees = ref([])
axios.get('committees?isMember=true', {headers: {'Authorization': `Bearer ${store.getters.getLogin.token}`}})
  .then(response => committees.value = response.data)
  .catch(e => $handleNetworkError(e))


const priceRules = [
  v => !isNaN(Number(v)) || 'Price must a number',
  v => !v.includes('e') || 'Come on dude, no exponents',
  v => Number(v) >= 0 || 'Negative prices? Criiinge',
]

const imageUrl = computed(() => event.value.image ? URL.createObjectURL(event.value.image) : '')


//TODO: do this differently
const endDateDisplay = computed({
  get() {
    return event.value.endDateSame ? event.value.startDate : event.value.endDate
  },
  set(value) {
    event.value.endDate = value
  }
})

function toggleSignUp() {
  event.value.signUp = !event.value.signUp
  event.value.enableSignUpForm = event.value.enableSignUpForm && event.value.signUp
}

function toggleSignUpForm() {
  event.value.enableSignUpForm = !event.value.enableSignUpForm
  event.value.signUp = event.value.signUp || event.value.enableSignUpForm
}
</script>

<template>
  <v-form
    ref="eventForm"
    v-model="valid"
  >
    <v-container style="padding: 0;">
      <v-row>
        <v-col
          cols="12"
          lg="8"
          md="8"
          sm="8"
          xl="8"
        >
          <v-text-field
            ref="title"
            v-model="event.title"
            :rules="[v => !!v || 'Title is required']"
            label="Event name"
            required
            @update:model-value="emits('title', event.title)"
          />
        </v-col>
        <v-col
          cols="12"
          lg="4"
          md="4"
          sm="4"
          xl="4"
        >
          <v-text-field
            ref="location"
            v-model="event.location"
            :rules="[v => (!!v || !event.visible) || 'Location is required for public events']"
            label="Location"
            required
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea
            ref="description"
            v-model="event.description"
            :rules="[v => !!v || 'Description is required']"
            label="Description"
            variant="outlined"
            required
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            ref="memberPrice"
            v-model="event.memberPrice"
            :rules="priceRules.concat([v => (!!v || !event.visible) || 'Price is required for public events'])"
            label="Price for members"
            prepend-icon="mdi-currency-eur"
            required
          />
        </v-col>
        <v-col>
          <v-text-field
            ref="publicPrice"
            v-model="event.publicPrice"
            :rules="priceRules.concat([v => (!!v || !event.visible) || 'Price is required for public events'])"
            label="Price for non-members"
            prepend-icon="mdi-currency-eur"
            required
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-checkbox
            v-model="event.endDateSame"
            label="Same start and end date"
          />
        </v-col>
        <v-col>
          <v-checkbox
            v-model="event.membersOnly"
            label="Members only"
          />
        </v-col>
        <v-col>
          <v-checkbox
            v-model="event.visible"
            :rules="[v => !v || wasPublic || $store.getters.isBoard || 'Sorry, only board members can create/update public events']"
            label="Make public"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="event.startDate"
            :rules="[v => (!!v || !event.visible) || 'Start date is required for public events']"
            label="Start date"
            prepend-icon="mdi-calendar"
            type="date"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="event.startTime"
            :rules="[v => (!!v || !event.visible) || 'Start time is required for public events']"
            label="Start time"
            prepend-icon="mdi-clock"
            type="time"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="endDateDisplay"
            :disabled="event.endDateSame"
            :rules="[v => (!!v || !event.visible) || 'End date is required for public events',
                     v => (!!v && new Date(event.startDate) <= new Date(endDateDisplay)) || 'End date cannot be earlier than start date']"
            label="End date"
            prepend-icon="mdi-calendar"
            type="date"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="event.endTime"
            :rules="[v => (!!v || !event.visible) || 'End time is required for public events',
                     v => (!!v && new Date(`${event.startDate} ${event.startTime}`) < new Date(`${endDateDisplay} ${v}`)) || 'Event must end after it starts']"
            label="End time"
            prepend-icon="mdi-clock"
            type="time"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="event.committeeId"
            :disabled="!committees"
            :items="committees"
            :rules="[v => !!v || 'A representative committee is required']"
            item-title="name"
            item-value="id"
            prepend-icon="mdi-account-group"
            label="Representative committee"
          />
        </v-col>
        <v-col>
          <v-file-input
            v-model="event.image"
            accept="image/jpeg"
            label="Promo image (Max 2MB)"
            persistent-hint
            :hint="hasPromo?'This event already has a promo image, only select a file here if you want to overwrite the old one':null"
            show-size
            clearable
          />
        </v-col>
      </v-row>


      <v-row>
        <v-col>
          <v-checkbox
            :model-value="event.signUp"
            label="Enable sign-up"
            hide-details
            @click="toggleSignUp"
          />
        </v-col>
        <v-col>
          <v-checkbox
            :model-value="event.enableSignUpForm"
            label="Enable sign-up form"
            hide-details
            @click="toggleSignUpForm"
          />
        </v-col>
      </v-row>
      <v-row v-if="event.enableSignUpForm">
        <v-col>
          <sign-up-form-editor
            ref="signUpForm"
            :initial-form="event.signUpForm"
            @change="(newForm) => event.signUpForm = newForm"
          />
        </v-col>
      </v-row>
      <v-expand-transition>
        <v-alert
          v-if="(hadSignUp && !event.signUp)
            || (oldEnableSignUpForm && !event.enableSignUpForm)"
          type="warning"
          prominent
          variant="outlined"
          class="mt-4 mx-3"
        >
          Woah there! Looks like you made some changes to signups for the event. Keep in mind that when you submit any
          changes, all existing sign-ups <b>will be removed</b>!
        </v-alert>
      </v-expand-transition>
    </v-container>


    <v-btn
      :loading="submitting"
      block
      class="mt-4 mx-3"
      color="primary"
      @click="submit()"
    >
      Submit event
    </v-btn>
  </v-form>
</template>
