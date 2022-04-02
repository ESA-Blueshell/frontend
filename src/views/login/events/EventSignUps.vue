<template>
  <v-main>
    <v-list two-line>
      <v-list-item v-for="(question,i) in signUpForm" v-bind:key="question">
        {{ responses.map(response => response.options[i]) }}
      </v-list-item>
    </v-list>
  </v-main>
</template>

<script>
export default {
  name: "EventSignUps",
  data: () => ({
    signUpForm: [],
    responses: [],
  }),
  mounted() {
    this.$http.get('events/' + this.$route.params.id, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => {
          this.signUpForm = JSON.parse(response.data.signUpForm)
        })
    this.$http.get('events/signups/all/' + this.$route.params.id, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => {
          this.responses = response.data
          this.responses.forEach(response => response.options = JSON.parse(response.options))
        })
  },
}
</script>

<style scoped>

</style>
