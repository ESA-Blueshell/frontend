<template>
  <v-form v-model="valid" ref="form">
    <v-container>

      <v-row>
        <v-col xl="8" lg="8" md="8" sm="8" cols="12">
          <v-text-field
              v-model="event.title"
              :rules="[v => !!v || 'Title is required']"
              label="Event name"
              required
              ref="title"/>
        </v-col>
        <v-col xl="4" lg="4" md="4" sm="4" cols="12">
          <v-text-field
              v-model="event.location"
              :rules="[v => (!!v || !event.visible) || 'Location is required for public events']"
              label="Location"
              required
              ref="location"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea
              v-model="event.description"
              :rules="[v => !!v || 'Description is required']"
              label="Description"
              required
              outlined
              ref="description"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
              v-model="event.memberPrice"
              :rules="priceRules.concat([v => (!!v || !event.visible) || 'Price is required for public events'])"
              label="Price for members"
              prepend-icon="mdi-currency-eur"
              required
              ref="memberPrice"/>
        </v-col>
        <v-col>
          <v-text-field
              v-model="event.publicPrice"
              :rules="priceRules.concat([v => (!!v || !event.visible) || 'Price is required for public events'])"
              label="Price for non-members"
              prepend-icon="mdi-currency-eur"
              required
              ref="publicPrice"/>
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
              @click="$refs.form.validate()"
              :rules="[v => !!v || 'For now, non-public events are not supported, cry about it']"
              label="Make public"/>

        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
              type="date"
              v-model="event.startDate"
              :rules="[v => (!!v || !event.visible) || 'Start date is required for public events']"
              prepend-icon="mdi-calendar"
              label="Start date"/>
        </v-col>
        <v-col>
          <v-text-field
              type="time"
              v-model="event.startTime"
              :rules="[v => (!!v || !event.visible) || 'Start time is required for public events']"
              prepend-icon="mdi-clock"
              label="Start time"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
              type="date"
              v-model="endDateDisplay"
              :rules="[v => (!!v || !event.visible) || 'End date is required for public events']"
              :disabled="event.endDateSame"
              prepend-icon="mdi-calendar"
              label="End date"/>
        </v-col>
        <v-col>
          <v-text-field
              type="time"
              v-model="event.endTime"
              :rules="[v => (!!v || !event.visible) || 'End time is required for public events']"
              prepend-icon="mdi-clock"
              label="End time"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
              :items="committees"
              item-text="name"
              item-value="id"
              :disabled="!committees"
              v-model="event.committeeId"
              :rules="[v => (!!v || !event.visible) || 'A representative committee is required for public events']"
              label="Representative committee"/>
        </v-col>
        <v-col>
          <v-file-input
              v-model="event.image"
              accept="image/*"
              show-size
              label="Promo image"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>

          <v-checkbox
              v-model="event.signUp"
              @click="event.enableSignUpForm = event.signUp&&event.enableSignUpForm"
              label="Enable sign-up"/>
        </v-col>
        <v-col>
          <v-checkbox
              v-model="event.enableSignUpForm"
              @click="event.signUp = event.signUp||event.enableSignUpForm"
              label="Enable sign-up form"/>
        </v-col>
      </v-row>
      <v-row v-if="event.enableSignUpForm">
        <v-col>
          <create-sign-up-form :form="event.signUpForm" ref="signUpForm"/>
        </v-col>
      </v-row>
    </v-container>


    <v-btn
        class="mt-4"
        block
        :disabled="!valid"
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
  props: ['event'],
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

      this.$emit('submit');
    }
  },
  mounted() {
    // Get user's committees
    this.$http.get('committees', {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => this.committees = response.data)

  }
}
</script>
