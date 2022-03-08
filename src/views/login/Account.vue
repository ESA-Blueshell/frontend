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

export default {
  name: "Account",
  data: () => ({
    accountData: null
  }),
  mounted() {
    this.$http
        .get('users/1', {headers: {'Authorization': `Bearer ${this.$store.getters.getToken}`}})
        .then(response => {
          if (response) {
            console.log(response)
            this.accountData = response.data
          }
        })
  }
}
</script>

<style scoped>

</style>
