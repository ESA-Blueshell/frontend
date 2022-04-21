<template>
  <v-main>
    <div class="mt-16"></div>
    <div v-if="this.accountData">
      <div v-for="key in Object.keys(this.accountData)" v-bind:key="key" >
        <p v-if="accountData[key] !== null">
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

export default {
  name: "Account",
  data: () => ({
    accountData: null
  }),
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
