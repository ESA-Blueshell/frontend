<template>
  <v-main>
    <top-banner title="My account"/>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <div v-if="this.accountData">
          <v-row align="end" align-self="end"> <!-- ?????????? why does it not align right?????????????? -->
            <v-col cols="auto" v-if="!editing">
              <v-btn icon @click="edit">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="auto" v-if="editing">
              <v-btn icon @click="cancel">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="auto" v-if="editing">
              <v-btn icon @click="save">
                <v-icon>mdi-content-save</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-text-field :readonly="editing?null:true" label="Username" v-model="accountData.username"/>
          <v-row>
            <v-col cols="6">
              <v-text-field :readonly="editing?null:true" label="First name" v-model="accountData.firstName"/>
            </v-col>
            <v-col cols="2">
              <v-text-field :readonly="editing?null:true" label="Prefix" v-model="accountData.prefix"/>
            </v-col>
            <v-col cols="4">
              <v-text-field :readonly="editing?null:true" label="Last name" v-model="accountData.lastName"/>
            </v-col>
          </v-row>
          <v-text-field :readonly="editing?null:true" label="initials" v-model="accountData.initials"/>
          <v-text-field :readonly="editing?null:true" label="address" v-model="accountData.address"/>
          <v-text-field :readonly="editing?null:true" label="houseNumber" v-model="accountData.houseNumber"/>
          <v-text-field :readonly="editing?null:true" label="postalCode" v-model="accountData.postalCode"/>
          <v-text-field :readonly="editing?null:true" label="city" v-model="accountData.city"/>
          <v-text-field :readonly="editing?null:true" label="phoneNumber" v-model="accountData.phoneNumber"/>
          <v-text-field :readonly="editing?null:true" label="email" v-model="accountData.email"/>
          <v-text-field :readonly="editing?null:true" label="studentNumber" v-model="accountData.studentNumber"/>
          <v-text-field :readonly="editing?null:true" label="dateOfBirth" v-model="accountData.dateOfBirth"/>
          <v-text-field :readonly="editing?null:true" label="discord" v-model="accountData.discord"/>
          <v-text-field :readonly="editing?null:true" label="steamid" v-model="accountData.steamid"/>
          <v-row>
            <v-col>
              <v-checkbox :readonly="editing?null:true" label="Subscribe to newsletter"
                          v-model="accountData.newsletter"/>
            </v-col>
            <v-col>
              <v-checkbox :readonly="editing?null:true" label="Give consent for your photo to be taken at events"
                          v-model="accountData.photoConsent"/>
            </v-col>
          </v-row>

          <v-text-field :readonly="editing?null:true" label="gender" v-model="accountData.gender"/>
          <v-text-field :readonly="editing?null:true" label="street" v-model="accountData.street"/>
          <v-row>
            <v-col>
              <v-text-field :readonly="editing?null:true" label="country" v-model="accountData.country"/>
            </v-col>
            <v-col>
              <v-text-field :readonly="editing?null:true" label="nationality" v-model="accountData.nationality"/>
            </v-col>
          </v-row>
          <v-text-field :readonly="editing?null:true" label="study" v-model="accountData.study"/>
          <v-checkbox disabled label="Paid contribution?" v-model="accountData.contributionPaid"/>
          <!--          TODO: dit leuk maken-->
          <!--          <v-text-field :readonly="editing?null:true" label="Account created on" v-model="accountData.createdAt"/>-->
          <!--          <v-text-field :readonly="editing?null:true" label="memberSince" v-model="accountData.memberSince"/>-->
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
    editing: false
  }),
  methods: {
    edit() {
      this.oldAccountData = JSON.parse(JSON.stringify(this.accountData));
      this.editing = true;
    },
    cancel() {
      this.accountData = this.oldAccountData;
      this.editing = false;
    },
    save() {

      //Send new user object to backend
      const login = this.$store.getters.getLogin
      this.$http
          .put(`createAccount`, this.accountData, {headers: {'Authorization': `Bearer ${login.token}`}})
          .then(() => {
            this.editing = false;

          }).catch(

      );
    },
  },
  mounted() {
    const login = this.$store.getters.getLogin

    this.$http
        .get(`users/${login.userId}`, {headers: {'Authorization': `Bearer ${login.token}`}})
        .then(response => {
          console.log(response.data)
          return this.accountData = response.data
        })
  }
}
</script>

<style scoped>

</style>
