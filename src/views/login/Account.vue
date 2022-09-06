<template>
  <v-main>
    <top-banner title="My account"/>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <p class="text-h3">Hello {{ this.accountData != null ? this.accountData.firstName : '' }}!</p>

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

        <div v-if="this.accountData">
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-spacer/>
              <v-col cols="auto">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon @click="save" :disabled="!valid"
                           :loading="submitting"
                           v-bind="attrs" v-on="on">
                      <v-icon>mdi-content-save</v-icon>
                    </v-btn>
                  </template>
                  <span>Save changes</span>
                </v-tooltip>
              </v-col>
            </v-row>

            <v-text-field disabled label="Username" v-model="accountData.username"/>
            <v-row>
              <v-col cols="2">
                <v-text-field disabled label="initials" v-model="accountData.initials"/>
              </v-col>
              <v-col cols="4">
                <v-text-field disabled label="First name" v-model="accountData.firstName"/>
              </v-col>
              <v-col cols="2">
                <v-text-field disabled label="Prefix" v-model="accountData.prefix"/>
              </v-col>
              <v-col cols="4">
                <v-text-field disabled label="Last name" v-model="accountData.lastName"/>
              </v-col>
            </v-row>

            <v-text-field disabled label="E-mail" v-model="accountData.email"/>
            <v-text-field label="Address" v-model="accountData.address"/>
            <v-row>
              <v-col cols="10">
                <v-text-field label="City" v-model="accountData.city"/>
              </v-col>
              <v-col cols="2">
                <v-text-field label="Postal code" v-model="accountData.postalCode"/>
              </v-col>
            </v-row>
            <v-text-field label="Phone number" v-model="accountData.phoneNumber"
                          :rules="[v => !v || v.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/) || 'Fill in a correct phone number']"/>
            <v-text-field label="Student number" v-model="accountData.studentNumber"/>
            <v-text-field label="Date of birth" v-model="accountData.dateOfBirth" type="date"/>
            <v-text-field label="Discord tag" v-model="accountData.discord"
                          :rules="[v => !v || v.match(/^.{3,32}#[0-9]{4}$/) || 'Fill in a correct discord tag (maybe you forgot the numbers?)']"/>
            <v-text-field label="Steam ID" v-model="accountData.steamid"/>
            <v-row>
              <v-col>
                <v-checkbox label="Subscribe to newsletter"
                            v-model="accountData.newsletter"/>
              </v-col>
              <v-col>
                <v-checkbox label="Give consent for your photo to be taken at events"
                            v-model="accountData.photoConsent"/>
              </v-col>
            </v-row>

            <v-text-field label="Gender" v-model="accountData.gender"/>
            <v-row>
              <v-col>
                <v-text-field label="Country" v-model="accountData.country"/>
              </v-col>
              <v-col>
                <v-text-field label="Nationality" v-model="accountData.nationality"/>
              </v-col>
            </v-row>
            <v-text-field label="Study" v-model="accountData.study"/>
            <!-- TODO: do something with this-->
            <!--          <v-checkbox disabled label="Paid contribution?" v-model="accountData.contributionPaid"/>-->


            <v-row>
              <v-spacer/>
              <v-col cols="auto">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon @click="save" :disabled="!valid"
                           :loading="submitting"
                           v-bind="attrs" v-on="on">
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
        <v-progress-circular v-else></v-progress-circular>
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
  methods: {
    copyObject(obj) {
      return Object.assign({}, obj);
    },
    save() {
      if (this.$refs.form.validate()) {
        this.submitting = true
        //Send new user object to backend
        const login = this.$store.getters.getLogin
        this.$http
            .put(`users/${login.userId}`, this.accountData, {headers: {'Authorization': `Bearer ${login.token}`}})
            .then(() => {
              this.submitting = false
            });
      }
    },
  },
  mounted() {
    const login = this.$store.getters.getLogin

    this.$http
        .get(`users/${login.userId}`, {headers: {'Authorization': `Bearer ${login.token}`}})
        .then(response => {
          console.log(response.data)
          this.accountData = response.data
          this.oldAccountData = this.copyObject(this.accountData)
        })
  }
}
</script>

<style scoped>

</style>
