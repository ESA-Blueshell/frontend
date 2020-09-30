<template>
  <v-app>
    <top-banner title="Events"></top-banner>
    <div style="max-width: 800px">
      <calendar></calendar>
    </div>
  </v-app>
</template>

<script>
import TopBanner from "@/components/top-banner";
import calendar from "@/components/calendar"

export default {
  components: {TopBanner,calendar}
}
</script>
