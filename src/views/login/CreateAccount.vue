<template>
  <v-main>
    <top-banner title="Create Account" />

    <div
      v-if="!succeeded"
      class="mx-3 pb-10"
    >
      <v-form
        ref="form"
        class="mx-auto mt-10"
        style="max-width: 500px"
      >
        <v-row>
          <v-col
            cols="4"
            class="pl-0"
          >
            <v-text-field
              ref="initials"
              v-model="initials"
              :rules="initialsRules"
              label="Initials"
            />
          </v-col>
          <v-col
            cols="8"
            class="pr-0"
          >
            <v-text-field
              ref="firstName"
              v-model="firstName"
              :rules="firstNameRules"
              label="First name"
            />
          </v-col>
        </v-row>
        <v-row class="mt-n7">
          <v-col
            cols="4"
            class="pl-0"
          >
            <v-text-field
              ref="prefix"
              v-model="prefix"
              label="Prefix"
            />
          </v-col>
          <v-col
            cols="8"
            class="pr-0"
          >
            <v-text-field
              ref="lastName"
              v-model="lastName"
              :rules="lastNameRules"
              label="Last name"
            />
          </v-col>
        </v-row>
        <v-text-field
          ref="username"
          v-model="username"
          :rules="usernameRules"
          label="Username"
        />
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass ? 'text' : 'password'"
          @click:append="showPass = !showPass"
        />
        <v-text-field
          v-model="passwordAgain"
          :rules="[ v => !!v || 'Password is required', v => v===password || 'The passwords should be the same' ]"
          label="Password (repeated)"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass ? 'text' : 'password'"
          @click:append="showPass = !showPass"
        />
        <v-text-field
          ref="email"
          v-model="email"
          :rules="emailRules"
          label="Email"
          required
        />
        <v-row>
          <v-spacer />
          <v-col cols="auto">
            <v-btn
              :loading="clicked"
              color="primary"
              @click="createAccount"
            >
              Create account
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>


    <div
      v-else-if="succeeded"
      class="mx-auto my-10"
      style="max-width: 600px"
    >
      <p class="text-center text-subtitle-1 font-weight-light">
        Your account has successfully been created! Head over to your email to confirm your account.
        If you can't find the email, make sure to check your spam folder.
      </p>
    </div>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";
import store from "@/plugins/store";

export default {
  components: {TopBanner},
  data: () => ({
    clicked: false,
    succeeded: false,
    showPass: false,
    username: '',
    initials: '',
    firstName: '',
    prefix: '',
    lastName: '',
    password: '',
    passwordAgain: '',
    email: '',
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
    emailRules: [
      // Tier 3 email validation https://howtodoinjava.com/java/regex/java-regex-validate-email-address/
      v => !!v || 'Email is required',
      v => (!!v && /^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/.test(v)) || 'Enter a valid e-mail address',
    ],
  }),
  methods: {
    createAccount() {
      // Check if form is valid (meaning all fields are not empty)
      if (!this.$refs.form.validate()) {
        return
      }

      this.clicked = true

      // Send authenticate request
      this.$http.put('createAccount', {
        username: this.username,
        password: this.password,
        email: this.email,
        firstName: this.firstName,
        prefix: this.prefix,
        lastName: this.lastName,
        initials: this.initials,
      })
          .then(() => {
            this.succeeded = true
          })
          .catch(e => {
                if (e.response.status === 400) {
                  store.commit('setNetworkErrorMessage', e.response.data)
                } else {
                  this.$root.handleNetworkError(e)
                }
              }
          )
          .finally(() => {
            this.clicked = false
          })
    },
  }
}
</script>
