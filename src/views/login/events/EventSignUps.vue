<template>
  <v-main>
    <top-banner :title="eventName ? eventName+' sign-ups' : 'Sign-ups'"/>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <p class="text-h4">
          Summary
        </p>
        <div v-for="(question,i) in signUpForm" v-bind:key="question">
          <p class="text-h5">
            {{ question.prompt }}
          </p>
          <template v-if="question.type === 'open'">
            <p v-for="response in responses" v-bind:key="response">
              User {{ response.user }}: {{ response.formAnswers[i] }}
            </p>
          </template>
          <template v-else-if="question.type === 'radio'">
            <p v-for="response in responses" v-bind:key="response">
              User {{ response.user }}: {{ response.formAnswers[i] }}
            </p>
          </template>
          <template v-if="question.type === 'checkbox'">
            <p v-for="response in responses" v-bind:key="response">
              User {{ response.user }}: {{ response.formAnswers[i] }}
            </p>
          </template>
        </div>
      </div>
    </div>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";

export default {
  name: "EventSignUps",
  components: {TopBanner},
  data: () => ({
    signUpForm: [],
    responses: [],
    eventName: null
  }),
  mounted() {
    this.$http.get('events/' + this.$route.params.id, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => {
          this.eventName = response.data.title
          this.signUpForm = JSON.parse(response.data.signUpForm)
        })
    this.$http.get('events/signups/all/' + this.$route.params.id, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => {
          this.responses = response.data
          this.responses.forEach(response => response.formAnswers = JSON.parse(response.formAnswers))
        })
  },
}
</script>

<style scoped>

</style>
