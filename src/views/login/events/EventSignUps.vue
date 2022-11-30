<template>
  <v-main>
    <top-banner :title="eventName ? eventName+' sign-ups' : 'Sign-ups'"/>
    <div class="mx-3">
      <div class="mx-auto my-10" style="max-width: 800px">
        <p class="text-h4">
          Summary
        </p>
        <div v-for="(question,i) in signUpForm" v-bind:key="i">
          <p class="text-h5">
            {{ question.prompt }}
          </p>
          <template v-if="question.type === 'open'">
            <p v-for="response in responses" v-bind:key="response.discord">
              <b>{{ response.fullName }}:</b> {{ response.formAnswers[i] }}
            </p>
          </template>
          <template v-else-if="question.type === 'radio'">
            <p v-for="response in responses" v-bind:key="response.discord">
              <b>{{ response.fullName }}:</b> {{ response.formAnswers[i] }}
            </p>
            <v-container>
              <v-row v-for="(option,j) in question.options" v-bind:key="j">
                <v-col>
                  {{ option }}
                </v-col>
                <v-col cols="1">
                  {{ responses.filter(response => response.formAnswers[i] === j).length }}
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template v-if="question.type === 'checkbox'">
            <p v-for="response in responses" v-bind:key="response.discord">
              <b>{{ response.fullName }}:</b> {{ response.formAnswers[i].map(answer => question.options[answer]).join(', ') }}
            </p>
            <v-container>
              <template v-for="(option,j) in question.options">
                <v-row v-bind:key="j" @click="toggle(i,j)">
                  <v-col>
                    {{ option }}
                  </v-col>
                  <v-col cols="1">
                    {{ responses.filter(response => response.formAnswers[i].includes(j)).length }}
                  </v-col>

                  <v-container class="py-0 pl-16">
                    <v-expand-transition>
                      <div v-if="expandTab.includes((i,j))">
                        <v-row
                            v-for="response in responses.filter(response => response.formAnswers[i].includes(j))"
                            v-bind:key="response.discord">
                          <v-col>
                            {{ response.fullName }}
                          </v-col>
                          <v-col>
                            {{ response.discord }}
                          </v-col>
                        </v-row>
                      </div>
                    </v-expand-transition>
                  </v-container>

                </v-row>
                <v-divider v-bind:key="'div'+j"></v-divider>
              </template>
            </v-container>
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
    eventName: null,
    expandTab: [],
  }),
  methods: {
    toggle(i, j) {
      if (this.expandTab.includes((i, j))) {
        this.expandTab = this.expandTab.filter(it => it !== (i, j));
      } else {
        this.expandTab.push((i, j))
      }
    },
  },
  mounted() {
    this.$http.get('events/' + this.$route.params.id, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => {
          this.eventName = response.data.title
          this.signUpForm = JSON.parse(response.data.signUpForm)
        })
        .catch(e => this.$root.handleNetworkError(e))
    this.$http.get('events/signups/all/' + this.$route.params.id, {headers: {'Authorization': `Bearer ${this.$store.getters.getLogin.token}`}})
        .then(response => {
          this.responses = response.data
          this.responses.forEach(response => response.formAnswers = JSON.parse(response.formAnswers))
        })
        .catch(e => this.$root.handleNetworkError(e))
  },
}
</script>

<style scoped>

</style>
