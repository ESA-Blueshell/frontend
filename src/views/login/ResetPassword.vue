<template>
  <v-main>
    <top-banner title="Reset password"/>

    <div class="mx-auto mt-10" style="max-width: 500px">
      <div v-if="!succeeded">
        <v-form v-model="valid" ref="form">
          <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              :type="showPass ? 'text' : 'password'"
              @keydown.enter="resetPassword"/>
          <v-text-field
              v-model="passwordAgain"
              :rules="[v => !!v || 'Password is required',v => v === this.password || 'The passwords should be the same',]"
              label="Password (repeated)"
              @click:append="showPass = !showPass"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPass ? 'text' : 'password'"
              @keydown.enter="resetPassword"/>

          <v-row>
            <v-spacer/>
            <v-col cols="auto">
              <v-btn :disabled="!valid" :loading="loading" @click="resetPassword">
                Reset Password
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </div>
      <div v-else>
        <p class="text-center subtitle-1 font-weight-light">
          Your password has successfully been reset! You'll shortly be redirected to our login page where you can log in
          with your new password :)
        </p>
      </div>
    </div>

  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";
import store from "@/store";

export default {
  components: {TopBanner},
  data: () => ({
    valid: false,
    loading: false,
    succeeded: false,
    password: "",
    passwordAgain: "",
    passwordRules: [
      v => !!v || 'Password is required',
    ],
    showPass: false,
  }),
  computed: {
    username: function () {
      return this.$route.query.username
    },
    token: function () {
      return this.$route.query.token
    },
  },
  methods: {
    resetPassword() {
      if (this.$refs.form.validate()) {
        this.loading = true

        // Send reset request
        this.$http.post(`users/password`, {
          username: this.username,
          newPassword: this.password,
          token: this.token,
        }).then(() => {
          this.succeeded = true
          setTimeout(() => this.$router.push({path: '/login'}), 5000);
        }).catch(error => {
          if (error.response.status === 400) {
            store.commit('setNetworkErrorMessage', error.response.data)
          } else if (error.response.status === 404) {
            store.commit('setNetworkErrorMessage', "The username you gave doesn't exist??")
          } else {
            throw error
          }
        }).finally(() => {
          this.loading = false
        })
      }
    },
  },
}
</script>
