<template>
  <v-app>
    <top-banner title="Events"></top-banner>
    <div class="mx-auto" style="width: 1000px">
      <calendar></calendar>
    </div>
  </v-app>
</template>

<script>
import TopBanner from "@/components/top-banner";
import Calendar from "@/components/calendar"

export default {
  components: {TopBanner,Calendar}
}
</script>
