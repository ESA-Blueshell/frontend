<template>
  <v-main>
    <top-banner title="Enable account"></top-banner>

    <div v-if="!succeeded" class="mx-3 pb-10">
      Trying to enable your account...
    </div>

    <div v-else-if="succeeded" class="mx-3">
      Your account has successfully been activated! You'll shortly be redirected to our login page.
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
  }),
  computed: {
    username: function() {
      return this.$route.query.username
    },
    token: function() {
      return this.$route.query.token
    },
  },
  methods: {
    enableAccount() {
      // Send enable request
      this.$http.post('enableAccount', {
        username: this.username,
        token: this.token,
      })
          .then(() => {
            this.succeeded = true
            setTimeout( () => this.$router.push({ path: '/login'}), 5000);
          })
          .catch(e => {
            // Show login taken snackbar
            this.snackbar = true
            this.snackbarText = e.response.data
          })
    },
  },
  mounted() {
    this.enableAccount()
  }
}
</script>
