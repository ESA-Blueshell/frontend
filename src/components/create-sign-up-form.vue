<template>
  <div>
    <!--
      Button adding a new question to the form
    -->
    <v-menu location="bottom">
      <template #activator="{ props }">
        <v-btn
          block
          variant="outlined"
          v-bind="props"
        >
          Add question to sign-up form
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          link
          @click="createQuestion('open')"
        >
          Open question
        </v-list-item>
        <v-list-item
          link
          @click="createQuestion('radio')"
        >
          Multiple choice question
        </v-list-item>
        <v-list-item
          link
          @click="createQuestion('checkbox')"
        >
          Question with checkboxes
        </v-list-item>
      </v-list>
    </v-menu>

    <!--
      The actual form
    -->
    <div
      v-for="(question,i) in form"
      :key="i"
      class="mt-4"
    >
      <v-text-field
        v-model="question.prompt"
        :label="`Question ${i+1}`"
      >
        <template #append>
          <!-- Button to add option (v-if question has options) -->
          <v-tooltip
            v-if="question.type === 'radio' || question.type === 'checkbox'"
            location="top"
          >
            <template #activator="{ props }">
              <v-btn
                icon
                variant="plain"
                v-bind="props"
                @click="question.options.push('')"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Add option</span>
          </v-tooltip>

          <!-- Buttons for moving the question up or down and remove button -->
          <v-btn
            :disabled="i === form.length-1"
            icon
            variant="plain"
            @click="moveDown(form, i)"
          >
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
          <v-btn
            :disabled="i === 0"
            icon
            variant="plain"
            @click="moveUp(form, i)"
          >
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
          <v-btn
            icon
            variant="plain"
            @click="form.splice(i,1)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-text-field>

      <!--
        If the question has options, add some text-fields for those options
      -->
      <div v-if="question.type === 'radio' || question.type === 'checkbox'">
        <v-text-field
          v-for="(option, j) in question.options"
          :key="j"
          v-model="question.options[j]"
          :label="`Option ${j+1}`"
          :prepend-icon="question.type==='radio' ? 'mdi-radiobox-marked' : 'mdi-checkbox-marked'"
          dense
        >
          <template #append>
            <!-- Buttons for moving the option up or down and remove button -->
            <v-btn
              :disabled="j === question.options.length-1"
              icon
              variant="plain"
              @click="moveDown(question.options, j)"
            >
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            <v-btn
              :disabled="j === 0"
              icon
              variant="plain"
              @click="moveUp(question.options, j)"
            >
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
            <v-btn
              icon
              variant="plain"
              @click="question.options.splice(j,1)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </div>

      <v-divider
        v-if="i !== form.length-1"
        class="mt-4"
      />
    </div>

    <v-expand-transition>
      <v-alert
        v-if="initialForm !== undefined && initialForm !== form"
        type="warning"
        prominent
        :variant="$vuetify.theme.global.current.dark ? 'outlined' : ''"
      >
        Woah there! Looks like you made some changes to the sign-up form. Keep in mind that when you submit any
        changes to the form, all existing sign-ups <b>will be removed</b>!
      </v-alert>
    </v-expand-transition>
  </div>
</template>

<script>
export default {
  name: "CreateSignUpForm",
  // Form can be filled with objects. Each object will be a question/part of the question form
  // Three types are possible: 'open', 'checkbox' and 'radio'
  // Each object should have a 'prompt' attribute
  // For 'checkbox' and 'radio' a 'options' array of options should be included
  props: {
    initialForm: {
      type: Object,
    },
  },
  data: () => ({
    form: []
  }),
  mounted() {
    if (this.initialForm !== undefined) {
      this.form = JSON.parse(JSON.stringify(this.initialForm))
    }
  },
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
      array[i] = array[i - 1]
      array[i - 1] = temp
    },
    // Moves the ith element one index down in the given array. This probably throws an exception if i == array.length-1
    moveDown(array, i) {
      const temp = array[i];
      array[i] = array[i + 1]
      array[i + 1] = temp
    },
  }
}
</script>
