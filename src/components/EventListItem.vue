<script setup>
import {$markdownToHtml} from "@/plugins/markdownToHtml";

const props = defineProps(['event'])


function formatEventTime(event) {
  let startTime = new Date(Date.parse(event.startTime))
  let endTime = new Date(Date.parse(event.endTime))

  let result = ''

  if (event.membersOnly) {
    result += 'Members-only event. '
  }

  result += startTime.toLocaleString('en-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  })
  result += '-'

  if (startTime.getDate() !== endTime.getDate()) {
    result += endTime.toLocaleString('en-NL', {day: 'numeric', month: 'long'})
  }
  result += endTime.toLocaleString('en-NL', {
    hour: '2-digit',
    minute: '2-digit'
  });
  return result
}
</script>

<template>
  <v-list-item
    :key="event.title+event.startTime"
    :style="{ 'background-image': !event.banner ? '' : $vuetify.theme.global.current.dark ? `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${event.banner})` : `linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${event.banner})`}"
    class="py-4"
    style="background-size: cover;background-position: center;min-height: 175px;"
  >
    <v-list-item-title class="text-h4">
      {{ event.title }}
    </v-list-item-title>
    <v-list-item-subtitle class="mb-2">
      {{ formatEventTime(event) }}
    </v-list-item-subtitle>

    <div v-html="event.description ? $markdownToHtml(event.description) : 'No description...'" />

    <template #append>
      <slot name="append" />
    </template>
  </v-list-item>
</template>
