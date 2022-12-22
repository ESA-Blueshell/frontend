<template>
  <v-main>
    <top-banner title="My account" />
    <div class="mx-3">
      <div
        class="mx-auto my-10"
        style="max-width: 800px"
      >
        <p class="text-h3">
          Hello {{ accountData != null ? accountData.firstName : '' }}!
        </p>

        <p>
          On this page you can view your account data and edit it below. Fields like your name and e-mail address
          cannot be changed. You should contact board or sitecie on discord if you would like to change any of these
          fields
        </p>
        <p>
          On the "Upcoming events" page you will find all of the events that have been planned. Here, you can sign up
          for events that have it enabled, either by clicking the sign-up checkbox or filling in the sign-up form. (no
          more google forms baybee)
        </p>
        <p v-if="$store.getters.isActive">
          With the event manager, you can create and edit an upcoming event for one of the committees you're in. Once an
          event is created it will have to be approved by board {{ $store.getters.isBoard ? '(yes, you)' : '' }} before
          it will go public.
        </p>
        <p v-if="$store.getters.isBoard">
          Using the committee manager you can manage the committees in the association (duh). You can crate a committee,
          give it a description and add any members to it.
        </p>

        <div v-if="accountData">
          <v-form
            ref="form"
            v-model="valid"
          >
            <v-row>
              <v-spacer />
              <v-col cols="auto">
                <v-tooltip location="top">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      icon
                      :disabled="!valid"
                      :loading="submitting"
                      v-bind="attrs"
                      @click="save"
                      v-on="on"
                    >
                      <v-icon>mdi-content-save</v-icon>
                    </v-btn>
                  </template>
                  <span>Save changes</span>
                </v-tooltip>
              </v-col>
            </v-row>

            <v-text-field
              v-model="accountData.username"
              disabled
              label="Username"
            />
            <v-row>
              <v-col cols="2">
                <v-text-field
                  v-model="accountData.initials"
                  disabled
                  label="initials"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="accountData.firstName"
                  disabled
                  label="First name"
                />
              </v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="accountData.prefix"
                  disabled
                  label="Prefix"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="accountData.lastName"
                  disabled
                  label="Last name"
                />
              </v-col>
            </v-row>

            <v-text-field
              v-model="accountData.email"
              disabled
              label="E-mail"
            />
            <v-text-field
              v-model="accountData.address"
              label="Address"
            />
            <v-row>
              <v-col cols="10">
                <v-text-field
                  v-model="accountData.city"
                  label="City"
                />
              </v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="accountData.postalCode"
                  label="Postal code"
                />
              </v-col>
            </v-row>
            <v-text-field
              v-model="accountData.phoneNumber"
              label="Phone number"
              :rules="[v => !v || !!v.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/) || 'Fill in a correct phone number']"
            />
            <v-text-field
              v-model="accountData.studentNumber"
              label="Student number"
            />
            <v-text-field
              v-model="accountData.dateOfBirth"
              label="Date of birth"
              type="date"
            />
            <v-text-field
              v-model="accountData.discord"
              label="Discord tag"
              :rules="[v => !v || !!v.match(/^.{3,32}#[0-9]{4}$/) || 'Fill in a correct discord tag (maybe you forgot the numbers?)']"
            />
            <v-text-field
              v-model="accountData.steamid"
              label="Steam ID"
            />
            <v-row>
              <v-col>
                <v-checkbox
                  v-model="accountData.newsletter"
                  label="Subscribe to newsletter"
                />
              </v-col>
              <v-col>
                <v-checkbox
                  v-model="accountData.photoConsent"
                  label="Give consent for your photo to be taken at events"
                />
              </v-col>
            </v-row>

            <v-text-field
              v-model="accountData.gender"
              label="Gender"
            />
            <v-row>
              <v-col>
                <v-text-field
                  v-model="accountData.country"
                  label="Country"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="accountData.nationality"
                  label="Nationality"
                />
              </v-col>
            </v-row>
            <v-text-field
              v-model="accountData.study"
              label="Study"
            />
            <!-- TODO: do something with this-->
            <!--          <v-checkbox disabled label="Paid contribution?" v-model="accountData.contributionPaid"/>-->


            <v-row>
              <v-spacer />
              <v-col cols="auto">
                <v-tooltip location="top">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      icon
                      :disabled="!valid"
                      :loading="submitting"
                      v-bind="attrs"
                      @click="save"
                      v-on="on"
                    >
                      <v-icon>mdi-content-save</v-icon>
                    </v-btn>
                  </template>
                  <span>Save changes</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-form>
        </div>


        <!--    TODO: make this beautiful. Maybe use skeleton loading elements?-->
        <v-progress-circular v-else />
      </div>
    </div>
  </v-main>
</template>

<script>

import TopBanner from "@/components/top-banner";

export default {
  name: "Account",
  components: {TopBanner},
  data: () => ({
    accountData: null,
    oldAccountData: null,
    valid: true,
    submitting: false
  }),
  mounted() {
    const login = this.$store.getters.getLogin

    this.$http.get(`users/${login.userId}`, {headers: {'Authorization': `Bearer ${login.token}`}})
        .then(response => {
          this.accountData = response.data
          this.oldAccountData = this.copyObject(this.accountData)
        })
        .catch(e => this.$root.handleNetworkError(e))
  },
  methods: {
    copyObject(obj) {
      return Object.assign({}, obj);
    },
    save() {
      if (this.$refs.form.validate()) {
        this.submitting = true
        //Send new user object to backend
        const login = this.$store.getters.getLogin
        this.$http.put(`users/${login.userId}`, this.accountData, {headers: {'Authorization': `Bearer ${login.token}`}})
            .then(() => this.submitting = false)
            .catch(e => this.$root.handleNetworkError(e))
      }
    },
  }
}
</script>

<style scoped>

</style>
