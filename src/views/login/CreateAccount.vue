<template>
  <v-main>
    <top-banner title="Create Account"></top-banner>

    <div v-if="!succeeded" class="mx-3 pb-10">
      <v-form class="mx-auto mt-10" style="max-width: 500px" ref="form">
        <v-text-field
            v-model="username"
            :rules="usernameRules"
            label="Username"
            required
            ref="username"/>
        <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
            @click:append="showPass = !showPass"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPass ? 'text' : 'password'"/>
        <v-text-field
            v-model="passwordAgain"
            :rules="passwordRules"
            label="Password (repeated)"
            required
            @click:append="showPass = !showPass"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPass ? 'text' : 'password'"/>
        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
            ref="email"/>
        <v-btn
            class="mt-4"
            :disabled="clicked"
            color="primary"
            @click="createAccount">
          Create account
        </v-btn>
      </v-form>
    </div>


    <div v-else-if="succeeded" class="mx-auto my-10" style="max-width: 600px">
      <p class="text-center subtitle-1 font-weight-light">
        Your account has successfully been created! Head over to your email to confirm your account.
        If you can't find the email, make sure to check your spam folder.</p>
    </div>

    <v-snackbar v-model="snackbar" timeout="10000">
      {{ this.snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";

export default {
  components: {TopBanner},
  data: () => ({
    snackbar: false,
    snackbarText: 'Something went wrong, we don\'t know either.',
    clicked: false,
    succeeded: false,
    showPass: false,
    username: '',
    password: '',
    passwordAgain: '',
    email: '',
    usernameRules: [
      v => (!!v && /[a-zA-Z0-9]+/.test(v)) || 'Username is required and must only contain alphanumeric characters',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
    ],
    emailRules: [
      // Tier 3 email validation https://howtodoinjava.com/java/regex/java-regex-validate-email-address/
      v => (!!v && /^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/.test(v)) || 'Email is required',
    ],
  }),
  methods: {
    createAccount() {
      // Check if form is valid (meaning all fields are not empty)
      if (!this.$refs.form.validate()) {
        return
      }

      if (!this.passwordsEqual()) {
        this.snackbar = true
        this.snackbarText = 'Passwords must match.'
        return
      }

      this.clicked = true

      // Send authenticate request
      this.$http.put('createAccount', {
        username: this.username,
        password: this.password,
        email: this.email,
      })
      .then(() => {
        this.succeeded = true
      })
      .catch(() => {
        // Show login taken snackbar
        this.snackbar = true
        this.snackbarText = 'This username cannot be used.'
      })
      .finally(() => {
        this.clicked = false
      })
    },
    passwordsEqual() {
      return this.password !== '' && this.password === this.passwordAgain
    }
  }
}
</script>
