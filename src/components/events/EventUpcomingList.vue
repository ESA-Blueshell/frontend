<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { createEvent } from 'ics'

import EventListItem from '@/components/events/EventListItem.vue'
import SignUpForm from '@/components/events/EventSignUpForm.vue'

// Your plugin that does a router-like navigation
import { $goto } from '@/plugins/goto'

// Services
import EventService from '@/services/EventService'
import EventSignUpService from '@/services/EventSignUpService'

// Types
import type Event from '@/models/Event'
import type EventSignUp from '@/models/EventSignup'
import type { FormAnswer } from '@/models/EventSignup'

// Track loaded events: null => not loaded yet, [] => loaded but empty
const events = ref<Event[] | null>(null)

// Map of eventId => formAnswers or `undefined` if not signed up
const eventSignups = ref<Record<number, FormAnswer[] | undefined>>({})

// Which event ID is currently opening the sign-up form?
const signingUpFor = ref<number | null>(null)

// For showing "Submitting..." on a particular event's sign-up action
const submittingId = ref<number | null>(null)

// Services
const eventService = new EventService()
const signUpService = new EventSignUpService()

// Access route and store
const route = useRoute()
const store = useStore()

// Computed helpers
const isLoggedIn = computed<boolean>(() => store.getters.isLoggedIn)
const isMember = computed<boolean>(() => store.getters.isMember)
const token = computed<string | undefined>(() => store.getters.getLogin?.token)
// If you track screen size via store or composables:
const isSmAndUp = computed<boolean>(() => store.getters.isSmAndUp)

/**
 * On mount:
 * 1) Fetch upcoming events
 * 2) If logged in, fetch the user's sign-ups and group them by eventId
 * 3) If a hash is present, scroll to that event
 */
onMounted(async () => {
  // 1) Load upcoming events
  // If no events come back, we’ll get an empty array ([])
  events.value = await eventService.getUpcomingEvents()

  // 2) If logged in, get current signups
  if (isLoggedIn.value) {
    const signups = await signUpService.getSignups()
    // "Group by" eventId => formAnswers
    const grouped = signups.reduce((acc, signup) => {
      if (signup.eventId != null) {
        acc[signup.eventId] = signup.formAnswers
      }
      return acc
    }, {} as Record<number, FormAnswer[] | undefined>)
    eventSignups.value = grouped
  }

  // 3) Scroll if route.hash is present
  if (route.hash) {
    await nextTick()
    const element = document.getElementById('event' + route.hash)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
})

/**
 * Handle the "Submitting..." state and reset sign-up form.
 */
async function handleSubmit(eventId: number, fn: () => Promise<void>) {
  submittingId.value = eventId
  try {
    await fn()
  } finally {
    submittingId.value = null
    signingUpFor.value = null
  }
}

/**
 * Simple sign-up (no form-based questions).
 */
async function signUp(eventId: number) {
  await handleSubmit(eventId, async () => {
    const signUp: EventSignUp = { eventId }
    await signUpService.createSignUp(eventId, signUp)
    eventSignups.value[eventId] = [] // or null, or an empty array
  })
}

/**
 * Cancel an existing sign-up.
 */
async function removeSignUp(eventId: number) {
  await handleSubmit(eventId, async () => {
    await signUpService.deleteSignUp(eventId, token.value)
    delete eventSignups.value[eventId]
  })
}

/**
 * Submits a sign-up form with answers.
 * Covers both logged-in and guest sign-ups with form-based questions.
 */
async function submitSignUpForm(
  eventId: number,
  payload: { answers: FormAnswer[]; guestData: any }
) {
  const selectedElement = document.getElementById('event#' + eventId)
  if (selectedElement) {
    selectedElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  await handleSubmit(eventId, async () => {
    if (isLoggedIn.value) {
      // Logged-in sign-up with form
      const signUp: EventSignUp = {
        eventId,
        formAnswers: payload.answers.value
      }
      const res = await signUpService.createSignUp(eventId, signUp)
      eventSignups.value[eventId] = res.formAnswers
    } else {
      // Guest sign-up
      store.commit('saveGuestData', payload.guestData.value)

      // If you have a "createGuestSignUp" in the service, call it here.
      // Otherwise do a direct call with axios or similar.
      // For now, assume sign-up is done:
      eventSignups.value[eventId] = []
    }
  })
}

/**
 * Show or hide the sign-up form for a given event.
 */
function toggleSignUpForm(eventId: number) {
  if (signingUpFor.value === eventId) {
    signingUpFor.value = null
  } else {
    const element = document.getElementById('event#' + eventId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    signingUpFor.value = eventId
  }
}

/**
 * Opens a link for the event location.
 */
function findLocation(event: Event) {
  if (event.location && event.location.toLowerCase().includes('discord')) {
    $goto('https://discord.gg/23YMFQy')
  } else if (event.location) {
    $goto(encodeURI('https://www.google.com/maps/search/?api=1&query=' + event.location))
  }
}

/**
 * Generate an ICS file for the event and prompt download.
 */
function downloadIcs(event: Event) {
  createEvent(
    {
      title: event.title,
      description: event.description,
      location: event.location,
      start: Date.parse(event.startTime) - new Date().getTimezoneOffset() * 60 * 1000,
      end: Date.parse(event.endTime) - new Date().getTimezoneOffset() * 60 * 1000
    },
    (error, value) => {
      if (error) {
        console.error(error)
        return
      }
      const element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(value || ''))
      element.setAttribute('download', `${event.title}.ics`)
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
async function copyShareLink(event: Event) {
  const url = `${window.location.origin}${window.location.pathname}#${event.id}`
  await navigator.clipboard.writeText(url)
  store.commit('setStatusSnackbarMessage', `Link for ${event.title} copied to clipboard`)
}
</script>
<template>
  <!-- 1) If events is null, we're still loading -->
  <v-progress-circular
    v-if="events === null"
    indeterminate
  />

  <v-expand-transition
    v-else
    :disabled="!!route.hash"
  >
    <!-- If empty -->
    <div v-if="events.length === 0">
      <p>No upcoming events found</p>
    </div>

    <!-- Otherwise, we have events -->
    <v-list v-else>
      <v-list v-if="events.length > 0">
        <div
          v-for="(event, i) in events"
          :id="'event#' + event.id"
          :key="event.id + 'key'"
          class="list-item-buffer"
          style="scroll-margin-top: 64px;"
        >
          <event-list-item :event="event">
            <!-- Actions slot -->
            <template #append>
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
                        <span v-if="submittingId === event.id">
                          Submitting...
                        </span>
                        <span v-else-if="eventSignups[event.id] !== undefined">
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
                        v-if="isLoggedIn && !event.signUpForm && eventSignups[event.id] !== undefined"
                      >
                        <v-tooltip
                          location="left"
                          text="Cancel sign-up"
                        >
                          <template #activator="{ props: tooltipProps }">
                            <v-btn
                              icon="mdi-checkbox-marked"
                              variant="plain"
                              :loading="submittingId === event.id"
                              :disabled="event.membersOnly && !isMember"
                              v-bind="tooltipProps"
                              @click="removeSignUp(event.id)"
                            />
                          </template>
                        </v-tooltip>
                      </v-row>

                      <v-row
                        v-else-if="isLoggedIn && !event.signUpForm && eventSignups[event.id] === undefined"
                      >
                        <v-tooltip
                          location="left"
                          text="Sign Up"
                        >
                          <template #activator="{ props: tooltipProps }">
                            <v-btn
                              icon="mdi-checkbox-blank"
                              variant="plain"
                              :loading="submittingId === event.id"
                              :disabled="event.membersOnly && !isMember"
                              v-bind="tooltipProps"
                              @click="signUp(event.id)"
                            />
                          </template>
                        </v-tooltip>
                      </v-row>

                      <!-- SignUp form-based -->
                      <template v-else-if="event.signUpForm && (isLoggedIn || !event.membersOnly)">
                        <!-- Cancel sign-up if already signed up -->
                        <v-row>
                          <v-tooltip
                            v-if="isLoggedIn && eventSignups[event.id] !== undefined"
                            location="left"
                            text="Cancel sign-up"
                          >
                            <template #activator="{ props: tooltipProps }">
                              <v-btn
                                icon="mdi-close"
                                variant="plain"
                                :loading="submittingId === event.id"
                                :disabled="event.membersOnly && !isMember"
                                v-bind="tooltipProps"
                                @click="removeSignUp(event.id)"
                              />
                            </template>
                          </v-tooltip>
                        </v-row>

                        <!-- Toggle sign-up form (either fill or edit) -->
                        <v-row>
                          <v-tooltip
                            location="left"
                            :text="eventSignups[event.id] !== undefined
                              ? 'Edit sign-up form'
                              : signingUpFor !== event.id
                                ? 'Fill in sign-up form'
                                : 'Cancel filling in sign-up form'"
                          >
                            <template #activator="{ props: tooltipProps }">
                              <v-btn
                                icon="mdi-list-status"
                                variant="plain"
                                :loading="submittingId === event.id"
                                :disabled="event.membersOnly && !isMember"
                                v-bind="tooltipProps"
                                @click="toggleSignUpForm(event.id)"
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
                            @click="findLocation(event)"
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
                            @click="downloadIcs(event)"
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
                            @click="copyShareLink(event)"
                          />
                        </template>
                      </v-tooltip>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </template>
          </event-list-item>

          <!-- Expand to show the sign-up form (if toggled) -->
          <v-expand-transition :key="event.id">
            <div
              v-if="signingUpFor === event.id"
              class="form-border mx-auto rounded-b"
            >
              <sign-up-form
                :initial-form-answers="eventSignups[event.id]"
                :event="event"
                class="form mx-auto"
                :show-guest-form="!isLoggedIn"
                @submit="({ answers, guestData }) => submitSignUpForm(event.id, { answers, guestData })"
              />
            </div>
          </v-expand-transition>

          <!-- Divider for each item except the last, if form not open -->
          <v-divider
            v-if="i < events.length - 1 && signingUpFor !== event.id"
            :key="i"
          />
        </div>
      </v-list>
    </v-list>
  </v-expand-transition>
</template>
<style scoped>
.list-item-buffer {
  /* Spacing around your list items */
  padding: 8px 0;
}

.form-border {
  border-width: 1px;
  border-color: rgb(var(--v-theme-accent));
  border-style: solid;
}

.form {
  padding: 16px;
}
</style>
