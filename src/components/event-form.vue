<template>
  <v-form ref="form" v-model="valid">
    <v-container>

      <v-row>
        <v-col cols="12" lg="8" md="8" sm="8" xl="8">
          <v-text-field
              ref="title"
              v-model="event.title"
              :rules="[v => !!v || 'Title is required']"
              label="Event name"
              required
              @input="$emit('title', event.title)"/>
        </v-col>
        <v-col cols="12" lg="4" md="4" sm="4" xl="4">
          <v-text-field
              ref="location"
              v-model="event.location"
              :rules="[v => (!!v || !event.visible) || 'Location is required for public events']"
              label="Location"
              required/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea
              ref="description"
              v-model="event.description"
              :rules="[v => !!v || 'Description is required']"
              label="Description"
              outlined
              required/>
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
              required/>
        </v-col>
        <v-col>
          <v-text-field
              ref="publicPrice"
              v-model="event.publicPrice"
              :rules="priceRules.concat([v => (!!v || !event.visible) || 'Price is required for public events'])"
              label="Price for non-members"
              prepend-icon="mdi-currency-eur"
              required/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-checkbox
              v-model="event.endDateSame"
              label="Same start and end date"/>
        </v-col>
        <v-col>
          <v-checkbox
              v-model="event.membersOnly"
              label="Members only"/>
        </v-col>
        <v-col>
          <v-checkbox
              v-model="event.visible"
              :rules="[v => !!v || 'For now, non-public events are not supported, cry about it']"
              label="Make public"/>

        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
              v-model="event.startDate"
              :rules="[v => (!!v || !event.visible) || 'Start date is required for public events']"
              label="Start date"
              prepend-icon="mdi-calendar"
              type="date"/>
        </v-col>
        <v-col>
          <v-text-field
              v-model="event.startTime"
              :rules="[v => (!!v || !event.visible) || 'Start time is required for public events']"
              label="Start time"
              prepend-icon="mdi-clock"
              type="time"/>
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
              type="date"/>
        </v-col>
        <v-col>
          <v-text-field
              v-model="event.endTime"
              :rules="[v => (!!v || !event.visible) || 'End time is required for public events',
              v => (!!v && new Date(`${event.startDate} ${event.startTime}`) < new Date(`${endDateDisplay} ${v}`)) || 'Event must end after it starts']"
              label="End time"
              prepend-icon="mdi-clock"
              type="time"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
              v-model="event.committeeId"
              :disabled="!committees"
              :items="committees"
              :rules="[v => (!!v || !event.visible) || 'A representative committee is required for public events']"
              item-text="name"
              item-value="id"
              label="Representative committee"/>
        </v-col>
        <v-col>
          <v-file-input
              v-model="event.image"
              accept="image/*"
              label="Promo image"
              persistent-hint
              :hint="hasPromo?'This event already has a promo image, only select a file here if you want to overwrite the old one':null"
              show-size
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>

          <v-checkbox
              v-model="event.signUp"
              label="Enable sign-up"
              @click="event.enableSignUpForm = event.signUp&&event.enableSignUpForm"/>
        </v-col>
        <v-col>
          <v-checkbox
              v-model="event.enableSignUpForm"
              label="Enable sign-up form"
              @click="event.signUp = event.signUp||event.enableSignUpForm"/>
        </v-col>
      </v-row>
      <v-row v-if="event.enableSignUpForm">
        <v-col>
          <create-sign-up-form ref="signUpForm" :form="event.signUpForm"/>
        </v-col>
      </v-row>
    </v-container>


    <v-btn
        :disabled="!valid"
        block
        class="mt-4"
        color="primary"
        @click="submit()">
      Submit event
    </v-btn>
  </v-form>
</template>

<script>
import CreateSignUpForm from "@/components/create-sign-up-form";

export default {
  name: "event-form",
  components: {CreateSignUpForm},
  props: {
    event: {
      type: Object,
      default: () => ({
        title: '',
        location: '',
        description: '',

        memberPrice: '0',
        publicPrice: '0',

        membersOnly: false,
        visible: true,
        signUp: false,

        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',

        committeeId: '',
        image: null,

        signUpForm: [],

        enableSignUpForm: false,
        endDateSame: true,
      })
    },
    hasPromo: {
      type: Boolean,
      default: () => false
    }
  },
  data: () => ({
    valid: false,

    priceRules: [
      v => !isNaN(Number(v)) || 'Price must a number',
      v => !v.includes('e') || 'Come one dude, no exponents',
      v => Number(v) >= 0 || 'Negative prices? Criiinge',
    ],

    // enableSignUpForm: false,
    // endDateSame: true,

    committees: [],
  }),
  computed: {
    //TODO: do this differently
    endDateDisplay: {
      get() {
        return this.event.endDateSame ? this.event.startDate : this.event.endDate
      },
      set(value) {
        this.event.endDate = value
      }
    },
    imageUrl() {
      return this.event.image ? URL.createObjectURL(this.event.image) : ''
    }
  },
  methods: {
    submit() {
      //TODO: do this differently
      if (this.event.endDateSame) {
        this.event.endDate = this.event.startDate
      }

      if (this.$refs.form.validate()) {
        this.$emit('submit', this.event);
      }
    }
  },
  mounted() {
    // Get user's committees
    this.$http.get('committees', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => this.committees = response.data)

  }
}
</script>
