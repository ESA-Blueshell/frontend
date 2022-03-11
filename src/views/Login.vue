<template>
  <v-main>
    <top-banner title="Login"></top-banner>

    <div class="mx-3">
      <div class="mx-auto my-5" style="max-width: 800px">
        <p class="text-h4 font-weight-light">
          Token: {{ this.$store.getters.getToken }}
        </p>
      </div>

      <v-form v-model="valid" class="mx-auto mt-10" style="max-width: 500px" ref="form">
        <v-text-field
            v-model="username"
            ref="username"
            :rules="usernameRules"
            label="Username"
            required/>
        <v-text-field
            v-model="password"
            @keydown.enter="login"
            @click:append="showPass = !showPass"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPass ? 'text' : 'password'"
            :rules="passwordRules"
            label="Password"
            required/>
        <v-btn
            class="mt-4"
            :disabled="!valid"
            color="primary"
            @click="login">
          Login
        </v-btn>
      </v-form>

    </div>


    <v-snackbar v-model="snackbar" timeout="10000">
      Incorrect login
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
import router from "@/router";

export default {
  components: {TopBanner},
  data: () => ({
    snackbar: false,
    valid: false,
    showPass: false,
    username: '',
    password: '',
    usernameRules: [
      v => !!v || 'Username is required',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
    ],
  }),
  methods: {
    login() {
      // Check if form is valid (meaning username and password are not empty)
      if (this.$refs.form.validate()) {
        // Send authenticate request
        this.$http.post('authenticate', {username: this.username, password: this.password})
            .then(response => {
              // Store response
              this.$store.commit('setLogin', response.data)
              // Go to redirect page or home page
              router.push(this.$route.query.redirect || '/')
            })
            .catch(() => {
              // Show Incorrect login snackbar
              this.snackbar = true
            })
      }
    },
  }
}
</script>
