<template>
  <v-form v-model="valid" ref="form">
    <div v-for="(question,i) in form" v-bind:key="i" class="mt-2">
      <p class="text-h6 mb-0">
        {{ question.prompt }}
      </p>

      <v-text-field
          v-if="question.type === 'open'"
          v-model="answersProp[i]"
          :rules="[v => !!v || 'An answer is required']"
          hide-details="auto"
          class="pt-0"/>

      <v-radio-group
          v-else-if="question.type === 'radio'"
          v-model="answersProp[i]"
          :rules="[v => v != null || 'An answer is required']"
          hide-details="auto"
          class="mt-0">
        <v-radio
            v-for="option in question.options" v-bind:key="option"
            :label="option"/>
      </v-radio-group>

      <div v-else-if="question.type === 'checkbox'">
        <v-checkbox
            v-for="(option,j) in question.options" v-bind:key="j"
            v-model="answers[i]"
            hide-details
            class="mt-0 mb-2"
            :label="option"
            :value="j"/>
      </div>
    </div>

    <v-btn block @click="submit">
      Save sign-up form
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "sign-up-form",
  props: ['eventId', 'form', 'answersProp'],
  data: () => ({
    valid: false,
    answers: [],
  }),
  mounted() {
    // this is the illest thing i've ever done. Vue be kinda cringe with their checkboxes
    this.answers = this.answersProp
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit('submitting')

        this.$http.post('events/signups/' + this.eventId,
            JSON.stringify(this.answers),
            {
              headers: {
                'Authorization': `Bearer ${this.$store.getters.getLogin.token}`,
                'Content-Type': 'text/plain'
              }
            })
            .then(response => {
              if (response !== undefined && (response.status === 201 || response.status === 200)) {
                this.$emit('close');
              }
            })
      }
    }
  }
}
</script>

<style scoped>

</style>
