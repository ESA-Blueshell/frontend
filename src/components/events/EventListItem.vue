<script setup lang="ts">
import $markdownToHtml from "@/plugins/markdownToHtml.ts";
import {type EventModel, type EventSignUpModel, type FormAnswer, defaultEventSignUp, defaultEvent} from "@/models";
import {computed, nextTick, onMounted, ref, useTemplateRef} from "vue";
import {createEvent} from "ics";
import SignUpForm from "@/components/events/EventSignUpForm.vue";
import store from "@/plugins/store.ts";
import EventSignUpService from "@/services/EventSignUpService.ts";
import {$goto} from "@/plugins/goto";
import {useRoute} from "vue-router";
import {DateTime} from "luxon";

const props = defineProps({
  event: {
    type: Object as () => EventModel,
    required: true,
  },
  signUp: {
    type: Object as () => EventSignUpModel,
    default: () => defaultEventSignUp,
    required: false,
  },
});

const event = ref<EventModel>(props.event);
const signUp = ref<EventSignUpModel>({
  ...defaultEventSignUp,
  eventId: event.value.id,
  ...props.signUp
});
const route = useRoute()
const expanded = ref(false)
const submitting = ref(false)
const eventElement = useTemplateRef('event')

const isMember = computed<boolean>(() => store.getters.isMember)
const isSmAndUp = computed<boolean>(() => store.getters.isSmAndUp)
const guestToken = computed<string | undefined>(() => store.getters.getGuestData?.token)
const isLoggedIn = computed<boolean>(() => store.getters.isLoggedIn)

const signUpService = new EventSignUpService()


async function submitSignUp() {
  submitting.value = true
  if (signUp.value?.id) {
    await signUpService.updateSignUp(event.value.id as number, signUp.value)
  } else {
    await signUpService.createSignUp(event.value.id as number, signUp.value)
  }
  submitting.value = false
  signUp.value.formAnswers = []
}

/**
 * Cancel an existing sign-up.
 */
async function removeSignUp() {
  if (isMember.value) {
    await signUpService.deleteSignUp(event.value.id as number)
  } else {
    await signUpService.deleteSignUp(event.value.id as number, guestToken.value)
  }
  delete signUp.value
}

onMounted(async () => {
  // Scroll if route.hash is present
  if (route.hash && event.value.id == Number(route.hash)) {
    await nextTick()
    if (eventElement.value) {
      eventElement.value?.scrollIntoView({behavior: 'smooth', block: 'start'})
    }
  }
})


/**
 * Submits a sign-up form with answers.
 * Covers both logged-in and guest sign-ups with form-based questions.
 */
async function submitSignUpForm(
  eventId: number,
  payload: { answers: FormAnswer[]; guestData: any }
) {
  if (eventElement.value) {
    eventElement.value?.scrollIntoView({behavior: 'smooth', block: 'start'})
  }

  if (isLoggedIn.value) {
    signUp.value = await signUpService.createSignUp(eventId, signUp.value)
  } else {
    store.commit('saveGuestData', payload.guestData.value)
  }
}

function toggleExpanded() {
  if (!expanded.value) {
    if (eventElement.value) {
      eventElement.value?.scrollIntoView({behavior: 'smooth', block: 'start'})
    }
  }
  expanded.value = !expanded.value
}

/**
 * Opens a link for the event location.
 */
function findLocation() {
  if (event.value.location && event.value.location.toLowerCase().includes('discord')) {
    $goto('https://discord.gg/23YMFQy')
  } else if (event.value.location) {
    $goto(encodeURI('https://www.google.com/maps/search/?api=1&query=' + event.value.location))
  }
}

/**
 * Generate an ICS file for the event and prompt download.
 */
function downloadIcs() {
  createEvent(
    {
      title: event.value.title,
      description: event.value.description,
      location: event.value.location,
      start: Date.parse(event.value.startTime) - new Date().getTimezoneOffset() * 60 * 1000,
      end: Date.parse(event.value.endTime) - new Date().getTimezoneOffset() * 60 * 1000
    },
    (error, value) => {
      if (error) {
        console.error(error)
        return
      }
      const element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(value || ''))
      element.setAttribute('download', `${event.value.title}.ics`)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
  )
}

/**
 * Copy a shareable link (with hash) to the clipboard.
 */
async function copyShareLink() {
  const url = `${window.location.origin}${window.location.pathname}#${event.value.id}`
  await navigator.clipboard.writeText(url)
  store.commit('setStatusSnackbarMessage', `Link for ${event.value.title} copied to clipboard`)
}

function formatEventTime() {
  let startTime = DateTime.fromISO(event.value.startTime)
  let endTime = DateTime.fromISO(event.value.endTime)

  let result = ''

  result += startTime.toLocaleString('en-gb', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  })
  result += ' - '

  if (startTime.getDate() !== endTime.getDate()) {
    result += endTime.toLocaleString('en-gb', {weekday: 'long', day: 'numeric', month: 'long'})
    result += ' at '
  }
  result += endTime.toLocaleString('en-gb', {
    hour: '2-digit',
    minute: '2-digit'
  });
  return result
}
</script>

<template v-if="event.id">
  <v-list-item
    ref="event"
    :style="{ 'background-image': !event.banner ? '' : $vuetify.theme.global.current.dark ? `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${event.banner})` : `linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${event.banner})`}"
    class="py-4"
    style="background-size: cover; background-position: center; min-height: 240px;"
  >
    <v-list-item-title class="text-h4">
      {{ event.title }}
    </v-list-item-title>
    <div
      class="text-subtitle-2 mb-2"
      style="opacity: var(--v-medium-emphasis-opacity);"
    >
      {{ event.location }} <br>
      {{ formatEventTime() }} <br>
      {{ event.membersOnly ? 'Members only' : '' }}
    </div>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="event.description ? $markdownToHtml(event.description) : 'No description...'" />

    <v-container class="fill-height pa-0">
      <v-row style="margin-right: -10px">
        <!-- Status label for signups -->
        <v-col
          v-if="event.signUp && isSmAndUp && isLoggedIn"
          align-self="center"
        >
          <v-row>
            <p
              class="ml-2 mb-0 text-right"
              style="width: 100px"
            >
              <span v-if="submitting">
                Submitting...
              </span>
              <span v-else-if="signUp !== undefined">
                Signed up!
              </span>
              <span v-else-if="event.signUp">
                Not signed up
              </span>
            </p>
          </v-row>
        </v-col>

        <!-- Buttons on the right -->
        <v-col class="pa-0">
          <template v-if="event.signUp">
            <!-- Simple signup: no form -->
            <v-row
              v-if="isLoggedIn && !event.signUpForm?.length && signUp?.id"
            >
              <v-tooltip
                location="left"
                text="Cancel sign-up"
              >
                <template #activator="{ props: tooltipProps }">
                  <v-btn
                    icon="mdi-checkbox-marked"
                    variant="plain"
                    :loading="submitting"
                    :disabled="event.membersOnly && !isMember"
                    v-bind="tooltipProps"
                    @click="removeSignUp()"
                  />
                </template>
              </v-tooltip>
            </v-row>

            <v-row
              v-else-if="isLoggedIn && !event.signUpForm?.length && !signUp?.id"
            >
              <v-tooltip
                location="left"
                text="Sign Up"
              >
                <template #activator="{ props: tooltipProps }">
                  <v-btn
                    icon="mdi-checkbox-blank"
                    variant="plain"
                    :loading="submitting"
                    :disabled="event.membersOnly && !isMember"
                    v-bind="tooltipProps"
                    @click="submitSignUp()"
                  />
                </template>
              </v-tooltip>
            </v-row>

            <!-- SignUp form-based -->
            <template v-else-if="event.signUpForm && (isLoggedIn || !event.membersOnly)">
              <!-- Cancel sign-up if already signed up -->
              <v-row>
                <v-tooltip
                  v-if="isLoggedIn && signUp !== undefined"
                  location="left"
                  text="Cancel sign-up"
                >
                  <template #activator="{ props: tooltipProps }">
                    <v-btn
                      icon="mdi-close"
                      variant="plain"
                      :loading="submitting"
                      :disabled="event.membersOnly && !isMember"
                      v-bind="tooltipProps"
                      @click="removeSignUp()"
                    />
                  </template>
                </v-tooltip>
              </v-row>

              <!-- Toggle sign-up form (either fill or edit) -->
              <v-row>
                <v-tooltip
                  location="left"
                  :text="signUp?.id
                    ? 'Edit sign-up form'
                    : expanded
                      ? 'Fill in sign-up form'
                      : 'Cancel filling in sign-up form'"
                >
                  <template #activator="{ props: tooltipProps }">
                    <v-btn
                      icon="mdi-list-status"
                      variant="plain"
                      :loading="submitting"
                      :disabled="event.membersOnly && !isMember"
                      v-bind="tooltipProps"
                      @click="toggleExpanded()"
                    />
                  </template>
                </v-tooltip>
              </v-row>
            </template>
          </template>

          <!-- Location and share links -->
          <v-row>
            <v-tooltip
              text="Find location"
              location="left"
            >
              <template #activator="{ props: tooltipProps }">
                <v-btn
                  icon="mdi-google-maps"
                  variant="plain"
                  v-bind="tooltipProps"
                  @click="findLocation()"
                />
              </template>
            </v-tooltip>
          </v-row>
          <v-row>
            <v-tooltip
              text="Add to your calendar"
              location="left"
            >
              <template #activator="{ props: tooltipProps }">
                <v-btn
                  icon="mdi-calendar"
                  variant="plain"
                  v-bind="tooltipProps"
                  @click="downloadIcs()"
                />
              </template>
            </v-tooltip>
          </v-row>
          <v-row>
            <v-tooltip
              text="Copy share link"
              location="left"
            >
              <template #activator="{ props: tooltipProps }">
                <v-btn
                  icon="mdi-share-variant"
                  variant="plain"
                  v-bind="tooltipProps"
                  @click="copyShareLink()"
                />
              </template>
            </v-tooltip>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-expand-transition :key="event.id">
      <div
        v-if="expanded"
        class="form-border mx-auto rounded-b"
      >
        <sign-up-form
          :initial-form-answers="signUp?.formAnswers"
          :event="event"
          class="form mx-auto"
          :show-guest-form="!isLoggedIn"
          @submit="({ answers, guestData }) => submitSignUpForm(event.id as number, { answers, guestData })"
        />
      </div>
    </v-expand-transition>
  </v-list-item>
</template>
