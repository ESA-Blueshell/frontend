<template>
  <v-main>
    <top-banner title="Enable account" />

    <div
      v-if="!succeeded"
      class="mx-auto my-10"
      style="max-width: 600px"
    >
      <p class="text-center text-subtitle-1 font-weight-light">
        Trying to enable your account...
      </p>
    </div>

    <div
      v-else-if="succeeded"
      class="mx-auto my-10"
      style="max-width: 600px"
    >
      <p class="text-center text-subtitle-1 font-weight-light">
        Your account has successfully been activated! You'll shortly be redirected to our login page.
      </p>
    </div>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";

export default {
  components: {TopBanner},
  data: () => ({
    clicked: false,
    succeeded: false,
  }),
  computed: {
    username: function () {
      return this.$route.query.username
    },
    token: function () {
      return this.$route.query.token
    },
  },
  mounted() {
    this.enableAccount()
  },
  methods: {
    enableAccount() {
      // Send enable request
      this.$http.post('enableAccount', {
        username: this.username,
        token: this.token,
      }).then(() => {
        this.succeeded = true
        setTimeout(() => this.$router.push({path: '/login'}), 5000);
      }).catch(e => this.$root.handleNetworkError(e))
    },
  }
}
</script>
