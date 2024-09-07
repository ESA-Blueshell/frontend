<template>
  <v-main>
    <top-banner title="Membership Form"></top-banner>

    <div v-if="!succeeded" class="mx-3 pb-10">
      <v-form class="mx-auto mt-10" style="max-width: 600px" ref="form">
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="form.initials"
              :rules="initialsRules"
              label="Initials"
              ref="initials"/>
          </v-col>
          <v-col cols="8">
            <v-text-field
              v-model="form.firstName"
              :rules="firstNameRules"
              label="First name"
              ref="firstName"/>
          </v-col>
        </v-row>
        <v-row class="mt-n7 mb-n5">
          <v-col cols="4">
            <v-text-field
              v-model="form.prefix"
              label="Prefix"
              ref="prefix"/>
          </v-col>
          <v-col cols="8">
            <v-text-field
              v-model="form.lastName"
              :rules="lastNameRules"
              label="Last name"
              ref="lastName"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="form.username"
              :rules="usernameRules"
              label="Username"
              ref="username"/>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="form.email"
              :rules="emailRules"
              label="Email"
              required
              ref="email"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.discord"
              label="Discord Username"
              ref="discord"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="form.password"
              :rules="passwordRules"
              label="Password"
              @click:append="showPass = !showPass"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPass ? 'text' : 'password'"/>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="form.passwordAgain"
              :rules="[ v => !!v || 'Password is required', v => v===this.form.password || 'The passwords should be the same' ]"
              label="Password (repeated)"
              @click:append="showPass = !showPass"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPass ? 'text' : 'password'"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="form.postalCode"
              label="Postal Code"
              :rules="postalCodeRules"
              ref="postalCode"/>
          </v-col>
          <v-col cols="8">
            <v-text-field
              v-model="form.city"
              label="Place of Residence"
              :rules="cityRules"
              ref="city"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="form.dateOfBirth"
              label="Date of Birth"
              ref="dateOfBirth"
              :rules="dateOfBirthRules"
              type="date"/>
          </v-col>
          <v-col cols="8">
            <v-text-field
              v-model="form.phoneNumber"
              label="Phone Number"
              ref="phoneNumber"
              :rules="phoneNumberRules"
              :default-country="'nl'"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-checkbox
              v-model="form.ehbo"
              label="I have a EHBO Diploma"/>
          </v-col>
          <v-col cols="6">
            <v-checkbox
              v-model="form.bhv"
              label="I have a BHV Diploma"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-checkbox
              v-model="form.newsletter"
              label="I want subscribe to the newsletter of Blueshell E-sports"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <a href="https://esa-blueshell.nl/api/download/20171212-Statuten.pdf"
               class="text-decoration-none"
               target="_blank">
              Statutes (Dutch)
            </a>
          </v-col>
          <v-col cols="6">
            <a href="https://esa-blueshell.nl/api/download/20180109-Huishoudelijk-Reglement-Blueshell-E-Sports.pdf"
               class="text-decoration-none" target="_blank">
              Internal Regulations (Dutch)
            </a>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <a href="https://esa-blueshell.nl/api/download/Privacybeleid-Blueshell.pdf"
               class="text-decoration-none" target="_blank">
              Privacy Policy (Dutch)
            </a>
          </v-col>
          <v-col cols="6">
            <a href="https://esa-blueshell.nl/api/download/Privacybeleid-Blueshell.pdf"
               class="text-decoration-none" target="_blank">
              Privacy Policy (Dutch)
            </a>
          </v-col>
        </v-row>
        <v-spacer/>
        <v-sheet class="pa-4">
          <strong>Membership conditions</strong><br/>
          The undersigned hereby declares to be a member of Blueshell E-Sports Association Enschede until further
          notice. He/she hereby agrees to the Statutes, privacy policy and the Domestic Regulations (Huishoudelijk
          reglement) of this association. Cancellation must take place no later than four weeks before the beginning of
          the new academic year.
          <br/>
          <br/>
          <strong>Contribution</strong><br/>
          The undersigned understands that they will need to pay the 2024/2025 contribution fee of €20, for which they
          will receive payment details per email.
          <br/>
          <v-row class="mt-4" style="width: 100%;">
            <v-input
              ref="signature"
              :rules="signatureRules"
              v-model="form.signature"
              hide-details="auto">
              <template v-slot:default>
                <v-row class="d-flex justify-center">
                  <Vue3Signature
                    style="border-radius: 8px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); background-color: white"
                    :w="'500px'"
                    ref="signaturePad"
                    :h="'300px'"
                  />
                </v-row>
              </template>
            </v-input>
          </v-row>
          <v-row class="d-flex justify-end mt-4">
            <v-btn
              type="button"
              class="btn btn-danger"
              @click="clearSignature">
              Clear
            </v-btn>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="form.signatureCity"
                label="Place"
                :rules="signatureCityRules"
                ref="signatureCity"/>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="form.signatureDate"
                label="Date"
                ref="signatureDate"
                :rules="signatureDateRules"
                type="date"/>
            </v-col>
          </v-row>
        </v-sheet>
        <v-row>
          <v-spacer/>
          <v-col cols="auto">
            <v-btn
              :loading="clicked"
              color="primary"
              @click="submitForm">
              Submit
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>

    <div v-else-if="succeeded" class="mx-auto my-10" style="max-width: 600px">
      <p class="text-center text-subtitle-1 font-weight-light">
        Your membership form has successfully been submitted!
      </p>
    </div>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";
import {ref} from "vue";

export default {
  components: {TopBanner},
  setup() {
    const signaturePad = ref(null);
    return { signaturePad };
  },
  data: () => ({
    clicked: false,
    succeeded: false,
    showPass: false,
    form: {
      username: null,
      password: null,
      email: null,
      firstName: null,
      lastName: null,
      initials: null,

      postalCode: null,
      // street: '',
      // houseNumber: '',
      // country: '',
      phoneNumber: null,
      city: null,
      dateOfBirth: null,
      discord: null,

      ehbo: false,
      bhv: false,
      newsletter: false,

      signatureCity: null,
      signatureDate: null,
      signature: null,
    },
    usernameRules: [
      v => !!v || 'Username is required',
      v => /^[a-zA-Z0-9]+$/.test(v) || 'Username must only contain alphanumeric characters',
    ],
    initialsRules: [
      v => !!v || 'Initials are required',
    ],
    firstNameRules: [
      v => !!v || 'First name is required',
    ],
    lastNameRules: [
      v => !!v || 'Last name is required',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
    ],
    dateOfBirthRules: [
      v => !!v || 'Date of birth is required',
    ],
    phoneNumberRules: [
      v => !!v || 'Phone number is required',
      v => !!v || !!v.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/) || 'Fill in a correct phone number'
    ],
    emailRules: [
      v => !!v || 'Email is required',
      v => (!!v && /^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/.test(v)) || 'Enter a valid e-mail address',
    ],
    postalCodeRules: [
      v => !!v || 'Postal code is required',
    ],
    cityRules: [
      v => !!v || 'Place of residence is required',
    ],
    signatureCityRules: [
      v => !!v || 'Place is required',
    ],
    signatureDateRules: [
      v => !!v || 'Date is required',
    ],
    signatureRules: [
      v => !!v || 'Signature is required',
    ]
  }),
  methods: {
    clearSignature() {
      this.signaturePad.clear()
    },
    async submitForm() {
      if (this.signaturePad.isEmpty()) {
        this.form.signature = null;
      } else {
        const data = this.signaturePad.save('image/png')
        console.log('data: ', data)
        this.form.signature = data.split(",")[1]; // Extract base64 part of signature png
      }

      const {valid} = await this.$refs.form.validate()

      if (!valid) {
        return;
      }

      this.clicked = true;

      this.$http.put('createMember', this.form)
        .then(() => {
          this.succeeded = true;
        })
        .catch(e => {
          if (e.response.status === 400) {
            this.$store.commit('setNetworkErrorMessage', e.response.data);
          } else {
            this.$root.handleNetworkError(e);
          }
        })
        .finally(() => {
          this.clicked = false;
        });
    },
  }
};
</script>
