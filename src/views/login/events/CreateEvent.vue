<template>
  <v-main>
    <top-banner :title="title ? title : 'Create Event'" :image="imageUrl"></top-banner>

    <div class="mx-3">
      <v-form v-model="valid" class="mx-auto mt-10" style="max-width: 800px" ref="form">
        <v-col>

          <v-row>
            <v-col xl="8" lg="8" md="8" sm="8" cols="12">
              <v-text-field
                  v-model="title"
                  :rules="[v => !!v || 'Title is required']"
                  label="Event name"
                  required
                  ref="title"/>
            </v-col>
            <v-col xl="4" lg="4" md="4" sm="4" cols="12">
              <v-text-field
                  v-model="location"
                  :rules="[v => (!!v || !makePublic) || 'Location is required for public events']"
                  label="Location"
                  required
                  ref="location"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                  v-model="description"
                  :rules="[v => !!v || 'Description is required']"
                  label="Description"
                  required
                  ref="description"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                  v-model="memberPrice"
                  :rules="priceRules.concat([v => (!!v || !makePublic) || 'Price is required for public events'])"
                  label="Price for members"
                  prepend-icon="mdi-currency-eur"
                  required
                  ref="memberPrice"/>
            </v-col>
            <v-col>
              <v-text-field
                  v-model="guestPrice"
                  :rules="priceRules.concat([v => (!!v || !makePublic) || 'Price is required for public events'])"
                  label="Price for non-members"
                  prepend-icon="mdi-currency-eur"
                  required
                  ref="guestPrice"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-checkbox
                  v-model="endDateSame"
                  label="Same start and end date"/>
            </v-col>
            <v-col>
              <v-checkbox
                  v-model="membersOnly"
                  label="Members only"/>
            </v-col>
            <v-col>
              <v-checkbox
                  v-model="makePublic"
                  @click="$refs.form.validate()"
                  label="Make public"/>

            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                  type="date"
                  v-model="startDate"
                  :rules="[v => (!!v || !makePublic) || 'Start date is required for public events']"
                  prepend-icon="mdi-calendar"
                  label="Start date"/>
            </v-col>
            <v-col>
              <v-text-field
                  type="time"
                  v-model="startTime"
                  :rules="[v => (!!v || !makePublic) || 'Start time is required for public events']"
                  prepend-icon="mdi-clock"
                  label="Start time"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                  type="date"
                  v-model="endDateDisplay"
                  :rules="[v => (!!v || !makePublic) || 'End date is required for public events']"
                  :disabled="endDateSame"
                  prepend-icon="mdi-calendar"
                  label="End date"/>
            </v-col>
            <v-col>
              <v-text-field
                  type="time"
                  v-model="endTime"
                  :rules="[v => (!!v || !makePublic) || 'End time is required for public events']"
                  prepend-icon="mdi-clock"
                  label="End time"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                  :items="committees"
                  :disabled="!committees"
                  v-model="committee"
                  :rules="[v => (!!v || !makePublic) || 'A representative committee is required for public events']"
                  label="Committee"/>
            </v-col>
            <v-col>
              <v-file-input
                  v-model="image"
                  accept="image/*"
                  show-size
                  label="Promo image"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>

              <v-checkbox
                  v-model="enableSignUp"
                  @click="enableSignUpForm = enableSignUp&&enableSignUpForm"
                  label="Enable sign-up"/>
            </v-col>
            <v-col>
              <v-checkbox
                  v-model="enableSignUpForm"
                  @click="enableSignUp = enableSignUp||enableSignUpForm"
                  label="Enable sign-up form"/>
            </v-col>
          </v-row>
          <v-row v-if="enableSignUpForm">
            <v-col>
              <sign-up-form ref="signUpForm"></sign-up-form>
            </v-col>
          </v-row>
        </v-col>


        <v-btn
            class="mt-4"
            block
            :disabled="!valid"
            color="primary"
            @click="create">
          Create event
        </v-btn>
      </v-form>
    </div>
  </v-main>
</template>


<script>
import TopBanner from '@/components/top-banner';
import SignUpForm from "@/components/sign-up-form";

export default {
  name: 'CreateEvent',
  components: {SignUpForm, TopBanner},
  data: () => ({
    valid: false,

    title: '',
    location: '',
    description: '',

    memberPrice: '0.00',
    guestPrice: '0.00',
    priceRules: [v => /^\d+\.\d\d$/.test(v) || 'Price must have the format xx.xx'],

    membersOnly: false,
    makePublic: false,
    enableSignUp: false,
    enableSignUpForm: false,

    endDateSame: true,
    startDateMenu: false,
    endDateMenu: false,
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',

    committees: [],
    committee: '',
    image: null,


  }),
  computed: {
    endDateDisplay: {
      get() {
        return this.endDateSame ? this.startDate : this.endDate
      },
      set(value) {
        this.endDate = value
      }
    },
    imageUrl() {
      return this.image ? URL.createObjectURL(this.image) : ''
    }
  },
  methods: {
    create() {
      //TODO: implement
      if (this.$refs.form.validate()) {
        // let signUpForm = this.$refs.signUpForm.$data.form
        // console.log(JSON.stringify(signUpForm))
        // console.log('VALID!!')
      }
    },
  },
  mounted() {
    //TODO: GET USER'S COMMITTEES

    // URL.createObjectURL(this.image)

  }
}
</script>

<style scoped>

</style>
