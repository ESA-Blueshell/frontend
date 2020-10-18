<template>
  <v-main>
    <top-banner title="Events"></top-banner>
    <div class="mx-3">
      <div class="mx-auto" style="width: 1000px">
        <calendar></calendar>
      </div>
      <div class="mx-auto my-5" style="width: 800px">
        <p class="text-h4 font-weight-light">
          Add it to your own calendar!
        </p>
        <p class="body-1">
          You can add all our events to your personal Google Calendar agenda by clicking <a
            href="https://calendar.google.com/calendar/b/1?cid=Ymx1ZXNoZWxsZXNwb3J0c0BnbWFpbC5jb20"
            target="_blank" class="text-decoration-none">here</a>! If you want to add only a single event, you can click on at and click on the "add to calendar" button.
        </p>
      </div>
    </div>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";
import Calendar from "@/components/calendar"

export default {
  components: {TopBanner, Calendar}
}
</script>
