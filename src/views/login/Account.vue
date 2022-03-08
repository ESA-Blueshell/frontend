<template>
  <v-main>
    <div class="mt-16"></div>
    <div v-if="this.accountData">
      <div v-for="key in Object.keys(this.accountData)" v-bind:key="key">
        <p>
          {{ key }}: {{ accountData[key] }}
        </p>
      </div>
    </div>
    <p v-else>
      No account data found :(
    </p>
  </v-main>
</template>

<script>
import router from "@/router";

export default {
  name: "Account",
  data: () => ({
    accountData: null
  }),
  mounted() {
    const toLogin = () => router.push('/login')


    if (!this.$store.getters.getToken) {
      toLogin()
      return;
    }


    this.$http
        .get('users/1', {headers: {'Authorization': `Bearer ${this.$store.getters.getToken}`}})
        .then(response => this.accountData = response.data)
        .catch(error => {
          console.log(error)
          //Check if the error is because the server is down or if token in invalid
          switch (error.response.status) {
            case 401:
              toLogin()
              break
            default:
              console.log(error)
              alert("oh no the request went all fucky")
              break
          }
        })
  }
}
</script>

<style scoped>

</style>
