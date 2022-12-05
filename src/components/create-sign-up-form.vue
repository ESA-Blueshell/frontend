<template>
  <div>
    <!--
      Button adding a new question to the form
    -->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn block variant="outlined"
               v-bind="attrs"
               v-on="on">
          Add question to sign-up form
        </v-btn>
      </template>
      <v-list>
        <v-list-item link @click="createQuestion('open')">Open question</v-list-item>
        <v-list-item link @click="createQuestion('radio')">Multiple choice question</v-list-item>
        <v-list-item link @click="createQuestion('checkbox')">Question with checkboxes</v-list-item>
      </v-list>
    </v-menu>

    <!--
      The actual form
    -->
    <div v-for="(question,i) in form" v-bind:key="i" class="mt-4">
      <v-text-field v-model="question.prompt" :label="`Question ${i+1}`">
        <template v-slot:append-outer>
          <!-- Button to add option (v-if question has options) -->
          <v-tooltip v-if="question.type === 'radio' || question.type === 'checkbox'" top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs"
                     @click="question.options.push('')"
                     v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Add option</span>
          </v-tooltip>

          <!-- Buttons for moving the question up or down and remove button -->
          <v-btn :disabled="i === form.length-1" icon @click="moveDown(form, i)">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
          <v-btn :disabled="i === 0" icon @click="moveUp(form, i)">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
          <v-btn icon @click="form.splice(i,1)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-text-field>

      <!--
        If the question has options, add some text-fields for those options
      -->
      <div v-if="question.type === 'radio' || question.type === 'checkbox'">
        <v-text-field
            v-for="(option, i) in question.options" v-bind:key="i"
            v-model="question.options[i]"
            :label="`Option ${i+1}`"
            :prepend-icon="question.type==='radio' ? 'mdi-radiobox-marked' : 'mdi-checkbox-marked'"
            dense>
          <template v-slot:append-outer>
            <!-- Buttons for moving the option up or down and remove button -->
            <v-btn :disabled="i === question.options.length-1" icon
                   @click="moveDown(question.options, i)">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            <v-btn :disabled="i === 0" icon @click="moveUp(question.options, i)">
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
            <v-btn icon @click="question.options.splice(i,1)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </div>

      <v-divider v-if="i !== form.length-1" class="mt-4"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "create-sign-up-form",
  // Form can be filled with objects. Each object will be a question/part of the question form
  // Three types are possible: 'open', 'checkbox' and 'radio'
  // Each object should have a 'prompt' attribute
  // For 'checkbox' and 'radio' a 'options' array of options should be included
  props: ['form'],
  data: () => ({}),
  methods: {
    // Adds a new question to the form
    createQuestion(type) {
      if (type === 'open') {
        this.form.push({type: type, prompt: ''})
      } else {
        this.form.push({type: type, prompt: '', options: ['', '']})
      }
    },
    // Moves the ith element one index up in the given array. This probably throws an exception if i == 0
    moveUp(array, i) {
      const temp = array[i];
      // Have to use $set otherwise the page doesn't update with the data
      this.$set(array, i, array[i - 1])
      this.$set(array, i - 1, temp)
    },
    // Moves the ith element one index down in the given array. This probably throws an exception if i == array.length-1
    moveDown(array, i) {
      const temp = array[i];
      // Have to use $set otherwise the page doesn't update with the data
      this.$set(array, i, array[i + 1])
      this.$set(array, i + 1, temp)
    },
  }
}
</script>
